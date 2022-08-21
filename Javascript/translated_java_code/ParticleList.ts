"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import DecimalFormat = java.text.DecimalFormat;

    import DocumentBuilderFactory = javax.xml.parsers.DocumentBuilderFactory;

    import DocumentBuilder = javax.xml.parsers.DocumentBuilder;

    import Document = org.w3c.dom.Document;

    import NodeList = org.w3c.dom.NodeList;

    import Node = org.w3c.dom.Node;

    import Element = org.w3c.dom.Element;

    import File = java.io.File;

    export class ParticleList {
        private d_rveSize : number = 0.0;

        private d_particleList : Vector<Particle> = null;

        private d_triangleList : Vector<PolygonDouble> = null;

        private d_voronoiList : Vector<Point> = null;

        public constructor(particleFile? : any) {
            if(((particleFile != null && particleFile instanceof java.io.File) || particleFile === null)) {
                (() => {
                    this.d_particleList = new Vector<Particle>();
                    this.readFromFile(particleFile);
                    this.d_triangleList = new Vector<PolygonDouble>();
                    this.d_voronoiList = new Vector<Point>();
                })();
            } else if(particleFile === undefined) {
                (() => {
                    this.d_rveSize = 100.0;
                    this.d_particleList = new Vector<Particle>();
                    this.d_triangleList = new Vector<PolygonDouble>();
                    this.d_voronoiList = new Vector<Point>();
                })();
            } else throw new Error('invalid overload');
        }

        public saveToFile(particleFile : File, partType : number) {
            try {
                var fw : FileWriter = new FileWriter(particleFile);
                var pw : PrintWriter = new PrintWriter(fw);
                var tab : string = <string>new String("  ");
                var nofParts : number = this.size();
                pw.println("<?xml version=\'1.0\' encoding=\'ISO-8859-1\' ?>");
                pw.println("<Uintah_Include>");
                pw.println("<!--");
                pw.println("# RVE Size");
                pw.println(this.d_rveSize);
                pw.println("Number of objects");
                pw.println(nofParts);
                pw.println("Particle type");
                pw.println(partType);
                pw.println("-->");
                pw.println("<RVE_size>");
                pw.println(tab + this.d_rveSize);
                pw.println("</RVE_size>");
                pw.println("<union>");
                for(var ii : number = 0; ii < nofParts; ii++) {
                    var part : Particle = this.getParticle(ii);
                    part.print(pw, tab);
                }
                pw.println("</union>");
                pw.println("</Uintah_Include>");
                pw.close();
                fw.close();
            } catch(e) {
                console.info("Could not write to " + particleFile.getName());
            };
        }

        public readFromFile(particleFile : File) {
            this.d_particleList.clear();
            this.d_triangleList.clear();
            this.d_voronoiList.clear();
            try {
                var dbFactory : DocumentBuilderFactory = DocumentBuilderFactory.newInstance();
                var dBuilder : DocumentBuilder = dbFactory.newDocumentBuilder();
                var doc : Document = dBuilder.parse(particleFile);
                doc.getDocumentElement().normalize();
                console.info("Root element :" + doc.getDocumentElement().getNodeName());
                console.info("Reading RVE size ----------------------------");
                var rveNode : NodeList = doc.getElementsByTagName("RVE_size");
                if(rveNode.getLength() > 0) {
                    var text : string = rveNode.item(0).getTextContent();
                    console.info("RVE size : " + text);
                    this.d_rveSize = javaemul.internal.DoubleHelper.parseDouble(text);
                }
                console.info("Reading cylinders ----------------------------");
                var cylinderNodeList : NodeList = doc.getElementsByTagName("cylinder");
                for(var temp : number = 0; temp < cylinderNodeList.getLength(); temp++) {
                    var nNode : Node = cylinderNodeList.item(temp);
                    console.info("\nCurrent Element :" + nNode.getNodeName());
                    if(nNode.getNodeType() === Node.ELEMENT_NODE) {
                        var eElement : Element = <Element>nNode;
                        var top : Point = new Point();
                        var bottom : Point = new Point();
                        var radius : number = 0.0;
                        var thickness : number = 0.0;
                        var text : string = null;
                        var localNodeList : NodeList = eElement.getElementsByTagName("bottom");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Bottom : " + text);
                        }
                        if(text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts : string[] = text.split(",");
                            var xx : number = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy : number = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz : number = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            top.setX(xx);
                            top.setY(yy);
                            top.setZ(zz);
                            console.info("Bottom : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("top");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Top : " + text);
                        }
                        if(text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts : string[] = text.split(",");
                            var xx : number = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy : number = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz : number = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            bottom.setX(xx);
                            bottom.setY(yy);
                            bottom.setZ(zz);
                            console.info("Top : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("radius");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Radius : " + text);
                            radius = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        localNodeList = eElement.getElementsByTagName("thickness");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Thickness : " + text);
                            thickness = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        var particle : Particle = new Particle(Particle.CIRCLE, radius, 0.0, thickness, bottom, 1);
                        this.addParticle(particle);
                    }
                }
                console.info("Reading spheres ----------------------------");
                var sphereNodeList : NodeList = doc.getElementsByTagName("sphere");
                for(var temp : number = 0; temp < sphereNodeList.getLength(); temp++) {
                    var nNode : Node = sphereNodeList.item(temp);
                    console.info("\nCurrent Element :" + nNode.getNodeName());
                    if(nNode.getNodeType() === Node.ELEMENT_NODE) {
                        var eElement : Element = <Element>nNode;
                        var center : Point = new Point();
                        var radius : number = 0.0;
                        var thickness : number = 0.0;
                        var text : string = null;
                        var localNodeList : NodeList = eElement.getElementsByTagName("center");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Center : " + text);
                        } else {
                            localNodeList = eElement.getElementsByTagName("origin");
                            if(localNodeList.getLength() > 0) {
                                text = localNodeList.item(0).getTextContent();
                                console.info("Origin : " + text);
                            }
                        }
                        if(text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts : string[] = text.split(",");
                            var xx : number = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy : number = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz : number = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            center.setX(xx);
                            center.setY(yy);
                            center.setZ(zz);
                            console.info("Center : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("radius");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Radius : " + text);
                            radius = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        localNodeList = eElement.getElementsByTagName("thickness");
                        if(localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Thickness : " + text);
                            thickness = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        var particle : Particle = new Particle(Particle.SPHERE, radius, 0.0, thickness, center, 1);
                        this.addParticle(particle);
                    }
                }
            } catch(e) {
                console.info("Could not read from " + particleFile.getName());
                e.printStackTrace();
            };
        }

        public saveToFileOldFormat(particleFile : File, partType : number) {
            try {
                var fw : FileWriter = new FileWriter(particleFile);
                var pw : PrintWriter = new PrintWriter(fw);
                var nofParts : number = this.size();
                pw.println("# RVE Size");
                pw.println(this.d_rveSize);
                pw.println("Number of objects");
                pw.println(nofParts);
                pw.println("# Particle List");
                pw.println("# type  radius  thickness rotation  xCent  yCent  zCent  matCode");
                var df : DecimalFormat = new DecimalFormat("####0.0######");
                for(var ii : number = 0; ii < nofParts; ii++) {
                    var part : Particle = this.getParticle(ii);
                    var radius : number = part.getRadius();
                    var thickness : number = part.getThickness();
                    var rotation : number = part.getRotation();
                    var xCent : number = part.getCenter().getX();
                    var yCent : number = part.getCenter().getY();
                    var zCent : number = part.getCenter().getZ();
                    var matCode : number = part.getMatCode();
                    pw.println("# Particle " + ii);
                    pw.println(partType + " " + df.format(radius) + " " + df.format(thickness) + " " + df.format(rotation) + " " + df.format(xCent) + " " + df.format(yCent) + " " + df.format(zCent) + " " + matCode);
                }
                pw.close();
                fw.close();
            } catch(e) {
                console.info("Could not write to " + particleFile.getName());
            };
        }

        public readFromFileOldFormat(particleFile : File) {
            this.d_particleList.clear();
            this.d_triangleList.clear();
            this.d_voronoiList.clear();
            try {
                var fr : FileReader = new FileReader(particleFile);
                var st : StreamTokenizer = new StreamTokenizer(fr);
                st.commentChar('#');
                st.parseNumbers();
                st.eolIsSignificant(true);
                var first : boolean = true;
                var count : number = 0;
                var type : number = Particle.CIRCLE;
                var radius : number = 0.0;
                var rotation : number = 0.0;
                var thickness : number = 0.0;
                var xx : number = 0.0;
                var yy : number = 0.0;
                var zz : number = 0.0;
                var matCode : number = 0;
                var ttval : number = 0;
                while(((ttval = st.nextToken()) !== StreamTokenizer.TT_EOF)){
                    if(first) {
                        if(ttval === StreamTokenizer.TT_NUMBER) {
                            this.d_rveSize = st.nval;
                            first = false;
                        }
                    } else {
                        if(ttval === StreamTokenizer.TT_NUMBER) {
                            ++count;
                            var ii : number = st.nval;
                            switch((count)) {
                            case 1:
                                type = (<number>ii|0);
                                break;
                            case 2:
                                radius = ii;
                                break;
                            case 3:
                                thickness = ii;
                                break;
                            case 4:
                                rotation = ii;
                                break;
                            case 5:
                                xx = ii;
                                break;
                            case 6:
                                yy = ii;
                                break;
                            case 7:
                                zz = ii;
                                break;
                            case 8:
                                matCode = (<number>ii|0);
                                break;
                            default:
                                break;
                            }
                        }
                        if(ttval === StreamTokenizer.TT_EOL && count !== 0) {
                            console.info(type + " " + radius + " " + thickness + " " + rotation + " " + xx + " " + yy + " " + zz + " " + matCode);
                            var center : Point = new Point(xx, yy, zz);
                            var particle : Particle = new Particle(type, radius, rotation, thickness, center, matCode);
                            this.addParticle(particle);
                            count = 0;
                        }
                    }
                };
            } catch(e) {
                console.info("Could not read from " + particleFile.getName());
            };
        }

        public setRVESize(rveSize : number) {
            this.d_rveSize = rveSize;
        }

        public getRVESize() : number {
            return this.d_rveSize;
        }

        public size() : number {
            return this.d_particleList.size();
        }

        public getParticle(index : number) : Particle {
            if(index > this.d_particleList.size() || index < 0) return null;
            return <Particle>this.d_particleList.elementAt(index);
        }

        public addParticle(particle : Particle) {
            if(particle != null) {
                this.d_particleList.addElement(particle);
            }
        }

        public isEmpty() : boolean {
            if(!(this.d_particleList.size() > 0)) return true;
            return false;
        }

        public clear() {
            if(!this.isEmpty()) {
                this.d_particleList.clear();
                this.d_triangleList.clear();
                this.d_voronoiList.clear();
            }
        }

        /**
         * Triangulate the particle list
         */
        public triangulate() {
            var vor : Voronoi = new Voronoi(this);
            vor.process();
        }

        /**
         * Add a triangle to the triangle list
         */
        public addTriangle(p : PolygonDouble) {
            this.d_triangleList.addElement(p);
        }

        /**
         * Get the triangle list
         */
        public getTriangles() : Vector<PolygonDouble> {
            return this.d_triangleList;
        }

        /**
         * Add a point to the voronoi vertex list
         */
        public addVoronoiVertex(p : Point) {
            this.d_voronoiList.addElement(p);
        }

        /**
         * Get the voronoi vertex list
         */
        public getVoronoiVertices() : Vector<Point> {
            return this.d_voronoiList;
        }
    }
}

