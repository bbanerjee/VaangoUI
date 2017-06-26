"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var DecimalFormat = java.text.DecimalFormat;
    var DocumentBuilderFactory = javax.xml.parsers.DocumentBuilderFactory;
    var Node = org.w3c.dom.Node;
    var ParticleList = (function () {
        function ParticleList(particleFile) {
            var _this = this;
            this.d_rveSize = 0.0;
            this.d_particleList = null;
            this.d_triangleList = null;
            this.d_voronoiList = null;
            if (((particleFile != null && particleFile instanceof java.io.File) || particleFile === null)) {
                (function () {
                    _this.d_particleList = new Vector();
                    _this.readFromFile(particleFile);
                    _this.d_triangleList = new Vector();
                    _this.d_voronoiList = new Vector();
                })();
            }
            else if (particleFile === undefined) {
                (function () {
                    _this.d_rveSize = 100.0;
                    _this.d_particleList = new Vector();
                    _this.d_triangleList = new Vector();
                    _this.d_voronoiList = new Vector();
                })();
            }
            else
                throw new Error('invalid overload');
        }
        ParticleList.prototype.saveToFile = function (particleFile, partType) {
            try {
                var fw = new FileWriter(particleFile);
                var pw = new PrintWriter(fw);
                var tab = new String("  ");
                var nofParts = this.size();
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
                for (var ii = 0; ii < nofParts; ii++) {
                    var part = this.getParticle(ii);
                    part.print(pw, tab);
                }
                pw.println("</union>");
                pw.println("</Uintah_Include>");
                pw.close();
                fw.close();
            }
            catch (e) {
                console.info("Could not write to " + particleFile.getName());
            }
            ;
        };
        ParticleList.prototype.readFromFile = function (particleFile) {
            this.d_particleList.clear();
            this.d_triangleList.clear();
            this.d_voronoiList.clear();
            try {
                var dbFactory = DocumentBuilderFactory.newInstance();
                var dBuilder = dbFactory.newDocumentBuilder();
                var doc = dBuilder.parse(particleFile);
                doc.getDocumentElement().normalize();
                console.info("Root element :" + doc.getDocumentElement().getNodeName());
                console.info("Reading RVE size ----------------------------");
                var rveNode = doc.getElementsByTagName("RVE_size");
                if (rveNode.getLength() > 0) {
                    var text = rveNode.item(0).getTextContent();
                    console.info("RVE size : " + text);
                    this.d_rveSize = javaemul.internal.DoubleHelper.parseDouble(text);
                }
                console.info("Reading cylinders ----------------------------");
                var cylinderNodeList = doc.getElementsByTagName("cylinder");
                for (var temp = 0; temp < cylinderNodeList.getLength(); temp++) {
                    var nNode = cylinderNodeList.item(temp);
                    console.info("\nCurrent Element :" + nNode.getNodeName());
                    if (nNode.getNodeType() === Node.ELEMENT_NODE) {
                        var eElement = nNode;
                        var top = new vaango_ui.Point();
                        var bottom = new vaango_ui.Point();
                        var radius = 0.0;
                        var thickness = 0.0;
                        var text = null;
                        var localNodeList = eElement.getElementsByTagName("bottom");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Bottom : " + text);
                        }
                        if (text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts = text.split(",");
                            var xx = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            top.setX(xx);
                            top.setY(yy);
                            top.setZ(zz);
                            console.info("Bottom : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("top");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Top : " + text);
                        }
                        if (text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts = text.split(",");
                            var xx = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            bottom.setX(xx);
                            bottom.setY(yy);
                            bottom.setZ(zz);
                            console.info("Top : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("radius");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Radius : " + text);
                            radius = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        localNodeList = eElement.getElementsByTagName("thickness");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Thickness : " + text);
                            thickness = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        var particle = new vaango_ui.Particle(vaango_ui.Particle.CIRCLE, radius, 0.0, thickness, bottom, 1);
                        this.addParticle(particle);
                    }
                }
                console.info("Reading spheres ----------------------------");
                var sphereNodeList = doc.getElementsByTagName("sphere");
                for (var temp = 0; temp < sphereNodeList.getLength(); temp++) {
                    var nNode = sphereNodeList.item(temp);
                    console.info("\nCurrent Element :" + nNode.getNodeName());
                    if (nNode.getNodeType() === Node.ELEMENT_NODE) {
                        var eElement = nNode;
                        var center = new vaango_ui.Point();
                        var radius = 0.0;
                        var thickness = 0.0;
                        var text = null;
                        var localNodeList = eElement.getElementsByTagName("center");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Center : " + text);
                        }
                        else {
                            localNodeList = eElement.getElementsByTagName("origin");
                            if (localNodeList.getLength() > 0) {
                                text = localNodeList.item(0).getTextContent();
                                console.info("Origin : " + text);
                            }
                        }
                        if (text != null) {
                            text = text.replace("[", " ");
                            text = text.replace("]", " ");
                            var parts = text.split(",");
                            var xx = javaemul.internal.DoubleHelper.parseDouble(parts[0]);
                            var yy = javaemul.internal.DoubleHelper.parseDouble(parts[1]);
                            var zz = javaemul.internal.DoubleHelper.parseDouble(parts[2]);
                            center.setX(xx);
                            center.setY(yy);
                            center.setZ(zz);
                            console.info("Center : " + xx + " " + yy + " " + zz);
                        }
                        localNodeList = eElement.getElementsByTagName("radius");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Radius : " + text);
                            radius = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        localNodeList = eElement.getElementsByTagName("thickness");
                        if (localNodeList.getLength() > 0) {
                            text = localNodeList.item(0).getTextContent();
                            console.info("Thickness : " + text);
                            thickness = javaemul.internal.DoubleHelper.parseDouble(text);
                        }
                        var particle = new vaango_ui.Particle(vaango_ui.Particle.SPHERE, radius, 0.0, thickness, center, 1);
                        this.addParticle(particle);
                    }
                }
            }
            catch (e) {
                console.info("Could not read from " + particleFile.getName());
                e.printStackTrace();
            }
            ;
        };
        ParticleList.prototype.saveToFileOldFormat = function (particleFile, partType) {
            try {
                var fw = new FileWriter(particleFile);
                var pw = new PrintWriter(fw);
                var nofParts = this.size();
                pw.println("# RVE Size");
                pw.println(this.d_rveSize);
                pw.println("Number of objects");
                pw.println(nofParts);
                pw.println("# Particle List");
                pw.println("# type  radius  thickness rotation  xCent  yCent  zCent  matCode");
                var df = new DecimalFormat("####0.0######");
                for (var ii = 0; ii < nofParts; ii++) {
                    var part = this.getParticle(ii);
                    var radius = part.getRadius();
                    var thickness = part.getThickness();
                    var rotation = part.getRotation();
                    var xCent = part.getCenter().getX();
                    var yCent = part.getCenter().getY();
                    var zCent = part.getCenter().getZ();
                    var matCode = part.getMatCode();
                    pw.println("# Particle " + ii);
                    pw.println(partType + " " + df.format(radius) + " " + df.format(thickness) + " " + df.format(rotation) + " " + df.format(xCent) + " " + df.format(yCent) + " " + df.format(zCent) + " " + matCode);
                }
                pw.close();
                fw.close();
            }
            catch (e) {
                console.info("Could not write to " + particleFile.getName());
            }
            ;
        };
        ParticleList.prototype.readFromFileOldFormat = function (particleFile) {
            this.d_particleList.clear();
            this.d_triangleList.clear();
            this.d_voronoiList.clear();
            try {
                var fr = new FileReader(particleFile);
                var st = new StreamTokenizer(fr);
                st.commentChar('#');
                st.parseNumbers();
                st.eolIsSignificant(true);
                var first = true;
                var count = 0;
                var type = vaango_ui.Particle.CIRCLE;
                var radius = 0.0;
                var rotation = 0.0;
                var thickness = 0.0;
                var xx = 0.0;
                var yy = 0.0;
                var zz = 0.0;
                var matCode = 0;
                var ttval = 0;
                while (((ttval = st.nextToken()) !== StreamTokenizer.TT_EOF)) {
                    if (first) {
                        if (ttval === StreamTokenizer.TT_NUMBER) {
                            this.d_rveSize = st.nval;
                            first = false;
                        }
                    }
                    else {
                        if (ttval === StreamTokenizer.TT_NUMBER) {
                            ++count;
                            var ii = st.nval;
                            switch ((count)) {
                                case 1:
                                    type = (ii | 0);
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
                                    matCode = (ii | 0);
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (ttval === StreamTokenizer.TT_EOL && count !== 0) {
                            console.info(type + " " + radius + " " + thickness + " " + rotation + " " + xx + " " + yy + " " + zz + " " + matCode);
                            var center = new vaango_ui.Point(xx, yy, zz);
                            var particle = new vaango_ui.Particle(type, radius, rotation, thickness, center, matCode);
                            this.addParticle(particle);
                            count = 0;
                        }
                    }
                }
                ;
            }
            catch (e) {
                console.info("Could not read from " + particleFile.getName());
            }
            ;
        };
        ParticleList.prototype.setRVESize = function (rveSize) {
            this.d_rveSize = rveSize;
        };
        ParticleList.prototype.getRVESize = function () {
            return this.d_rveSize;
        };
        ParticleList.prototype.size = function () {
            return this.d_particleList.size();
        };
        ParticleList.prototype.getParticle = function (index) {
            if (index > this.d_particleList.size() || index < 0)
                return null;
            return this.d_particleList.elementAt(index);
        };
        ParticleList.prototype.addParticle = function (particle) {
            if (particle != null) {
                this.d_particleList.addElement(particle);
            }
        };
        ParticleList.prototype.isEmpty = function () {
            if (!(this.d_particleList.size() > 0))
                return true;
            return false;
        };
        ParticleList.prototype.clear = function () {
            if (!this.isEmpty()) {
                this.d_particleList.clear();
                this.d_triangleList.clear();
                this.d_voronoiList.clear();
            }
        };
        /**
         * Triangulate the particle list
         */
        ParticleList.prototype.triangulate = function () {
            var vor = new vaango_ui.Voronoi(this);
            vor.process();
        };
        /**
         * Add a triangle to the triangle list
         */
        ParticleList.prototype.addTriangle = function (p) {
            this.d_triangleList.addElement(p);
        };
        /**
         * Get the triangle list
         */
        ParticleList.prototype.getTriangles = function () {
            return this.d_triangleList;
        };
        /**
         * Add a point to the voronoi vertex list
         */
        ParticleList.prototype.addVoronoiVertex = function (p) {
            this.d_voronoiList.addElement(p);
        };
        /**
         * Get the voronoi vertex list
         */
        ParticleList.prototype.getVoronoiVertices = function () {
            return this.d_voronoiList;
        };
        return ParticleList;
    }());
    vaango_ui.ParticleList = ParticleList;
})(vaango_ui || (vaango_ui = {}));
