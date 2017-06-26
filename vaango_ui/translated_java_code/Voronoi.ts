"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import LinkedList = java.util.LinkedList;

    export class Voronoi {
        static ONHULL : boolean = true;

        static REMOVED : boolean = true;

        static VISIBLE : boolean = true;

        static PROCESSED : boolean = true;

        d_nofVert : number;

        d_vertex : LinkedList<Voronoi.Vertex>;

        d_edge : LinkedList<Voronoi.Edge>;

        d_face : LinkedList<Voronoi.Face>;

        d_pl : ParticleList;

        public constructor(pl? : any) {
            if(((pl != null && pl instanceof vaango_ui.ParticleList) || pl === null)) {
                this.d_nofVert = 0;
                (() => {
                    this.d_nofVert = pl.size();
                    this.d_vertex = new LinkedList<Voronoi.Vertex>();
                    this.d_edge = new LinkedList<Voronoi.Edge>();
                    this.d_face = new LinkedList<Voronoi.Face>();
                    this.d_pl = pl;
                })();
            } else if(pl === undefined) {
                this.d_nofVert = 0;
                (() => {
                    this.d_nofVert = 0;
                    this.d_vertex = new LinkedList<Voronoi.Vertex>();
                    this.d_edge = new LinkedList<Voronoi.Edge>();
                    this.d_face = new LinkedList<Voronoi.Face>();
                    this.d_pl = null;
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * Create the convex hull
         */
        process() {
            this.readPoints();
            if(!this.makeTetrahedron()) return;
            this.constructHull();
            this.outputDelaunayTriangles();
            this.outputVoronoiVertices();
        }

        /**
         * 
         * Read the input set of points
         */
        readPoints() {
            for(var ii : number = 0; ii < this.d_nofVert; ii++) {
                var p : Particle = this.d_pl.getParticle(ii);
                var cent : Point = p.getCenter();
                var vert : Voronoi.Vertex = new Voronoi.Vertex(this, cent);
                this.d_vertex.add(vert);
            }
            this.printVertices();
        }

        /**
         * 
         * Make the starting tetrahedron
         */
        makeTetrahedron() : boolean {
            var nofVerts : number = this.d_vertex.size();
            if(nofVerts < 4) {
                console.info("There should be at least 4 vertices");
                return false;
            }
            var index : number = 0;
            var v1 : Voronoi.Vertex = <Voronoi.Vertex>this.d_vertex.get(index);
            ++index;
            var v2 : Voronoi.Vertex = <Voronoi.Vertex>this.d_vertex.get(index);
            ++index;
            var v3 : Voronoi.Vertex = <Voronoi.Vertex>this.d_vertex.get(index);
            while((this.collinear(v1, v2, v3))){
                if(index === nofVerts - 1) {
                    console.info("All points are collinear");
                    return false;
                } else {
                    ++index;
                    v1 = v2;
                    v2 = v3;
                    v3 = <Voronoi.Vertex>this.d_vertex.get(index);
                }
            };
            v1.mark(Voronoi.PROCESSED);
            v2.mark(Voronoi.PROCESSED);
            v3.mark(Voronoi.PROCESSED);
            var e1 : Voronoi.Edge = new Voronoi.Edge(this, v1, v2);
            this.d_edge.add(e1);
            var e2 : Voronoi.Edge = new Voronoi.Edge(this, v2, v3);
            this.d_edge.add(e2);
            var e3 : Voronoi.Edge = new Voronoi.Edge(this, v3, v1);
            this.d_edge.add(e3);
            var base : Voronoi.Face = new Voronoi.Face(this, v1, v2, v3, e1, e2, e3);
            this.d_face.add(base);
            e1.adjFace(0, base);
            e2.adjFace(0, base);
            e3.adjFace(0, base);
            ++index;
            var v4 : Voronoi.Vertex = <Voronoi.Vertex>this.d_vertex.get(index);
            var vol : number = this.volume6(base, v4);
            while((vol === 0)){
                if(index === nofVerts - 1) {
                    console.info("All points are coplanar");
                    return false;
                } else {
                    ++index;
                    v4 = <Voronoi.Vertex>this.d_vertex.get(index);
                    vol = this.volume6(base, v4);
                }
            };
            v4.mark(Voronoi.PROCESSED);
            var vTemp : Voronoi.Vertex;
            var eTemp : Voronoi.Edge;
            if(vol < 0) {
                vTemp = v1;
                v1 = v2;
                v2 = vTemp;
                eTemp = e1;
                e1 = e2;
                e2 = eTemp;
            }
            e1.adjFace(1, this.makeFace(e1, v4));
            e2.adjFace(1, this.makeFace(e2, v4));
            e3.adjFace(1, this.makeFace(e3, v4));
            this.cleanup();
            return true;
        }

        /**
         * 
         * Construct the incremental convex hull
         */
        constructHull() {
            var size : number = this.d_vertex.size();
            var index : number = 0;
            var v : Voronoi.Vertex;
            while((index < size)){
                v = <Voronoi.Vertex>this.d_vertex.get(index);
                if(!v.isMarked()) {
                    v.mark(Voronoi.PROCESSED);
                    var changed : boolean = this.addOne(v);
                    if(changed) this.cleanup();
                    size = this.d_vertex.size();
                    index = 0;
                } else {
                    index++;
                }
            };
            this.printFaceOrientation();
            this.checkFaceOrientation();
            this.checkConvexity();
        }

        /**
         * 
         * Find if three points are collinear
         */
        collinear(v1 : Voronoi.Vertex, v2 : Voronoi.Vertex, v3 : Voronoi.Vertex) : boolean {
            return (this.areaTri(v1, v2, v3) === 0);
        }

        /**
         * 
         * Calculate the area of a triangle
         */
        areaTri(v1 : Voronoi.Vertex, v2 : Voronoi.Vertex, v3 : Voronoi.Vertex) : number {
            return (v1.v(0) * v2.v(1) - v1.v(1) * v2.v(0) + v1.v(1) * v3.v(0) - v1.v(0) * v3.v(1) + v2.v(0) * v3.v(1) - v3.v(0) * v2.v(1));
        }

        /**
         * 
         * Calculate the colume of a tetrahedron
         */
        volume6(f : Voronoi.Face, p : Voronoi.Vertex) : number {
            var ax : number = f.vertex(0).v(0);
            var ay : number = f.vertex(0).v(1);
            var az : number = f.vertex(0).v(2);
            var bx : number = f.vertex(1).v(0);
            var by : number = f.vertex(1).v(1);
            var bz : number = f.vertex(1).v(2);
            var cx : number = f.vertex(2).v(0);
            var cy : number = f.vertex(2).v(1);
            var cz : number = f.vertex(2).v(2);
            var dx : number = p.v(0);
            var dy : number = p.v(1);
            var dz : number = p.v(2);
            var vol : number = -az * by * cx + ay * bz * cx + az * bx * cy - ax * bz * cy - ay * bx * cz + ax * by * cz + az * by * dx - ay * bz * dx - az * cy * dx + bz * cy * dx + ay * cz * dx - by * cz * dx - az * bx * dy + ax * bz * dy + az * cx * dy - bz * cx * dy - ax * cz * dy + bx * cz * dy + ay * bx * dz - ax * by * dz - ay * cx * dz + by * cx * dz + ax * cy * dz - bx * cy * dz;
            return vol;
        }

        /**
         * 
         * Make a new face based on an edge and a vertex
         */
        makeFace(e : Voronoi.Edge, p : Voronoi.Vertex) : Voronoi.Face {
            var newEdge : Voronoi.Edge[] = new Array(2);
            for(var ii : number = 0; ii < 2; ++ii) {
                if((newEdge[ii] = e.endPt(ii).duplicate()) == null) {
                    newEdge[ii] = new Voronoi.Edge(this, e.endPt(ii), p);
                    this.d_edge.add(newEdge[ii]);
                    e.endPt(ii).duplicate(newEdge[ii]);
                }
            }
            var newFace : Voronoi.Face = new Voronoi.Face(this);
            newFace.edge(0, e);
            newFace.edge(1, newEdge[0]);
            newFace.edge(2, newEdge[1]);
            this.d_face.add(newFace);
            this.makeCCW(newFace, e, p);
            for(var ii : number = 0; ii < 2; ++ii) {
                for(var jj : number = 0; jj < 2; ++jj) {
                    if(newEdge[ii].adjFace(jj) == null) {
                        newEdge[ii].adjFace(jj, newFace);
                        break;
                    }
                }
            }
            return newFace;
        }

        /**
         * 
         * Make all the vertices and edges of face counter-clockwise
         */
        makeCCW(f : Voronoi.Face, e : Voronoi.Edge, p : Voronoi.Vertex) {
            var fi : Voronoi.Face;
            if(e.adjFace(1) == null) fi = e.adjFace(0); else {
                if(!e.adjFace(0).visible()) fi = e.adjFace(0); else fi = e.adjFace(1);
            }
            var ii : number;
            for(ii = 0; fi.vertex(ii) !== e.endPt(1); ++ii) 
            if(fi.vertex((ii + 1) % 3) !== e.endPt(0)) {
                f.vertex(0, e.endPt(1));
                f.vertex(1, e.endPt(0));
            } else {
                f.vertex(0, e.endPt(0));
                f.vertex(1, e.endPt(1));
                var eTemp : Voronoi.Edge = f.edge(1);
                f.edge(1, f.edge(2));
                f.edge(2, eTemp);
            }
            f.vertex(2, p);
        }

        cleanup() {
            this.cleanEdges();
            this.cleanFaces();
            this.cleanVertices();
        }

        /**
         * 
         * Clean up the edge list
         */
        cleanEdges() {
            var size : number = this.d_edge.size();
            var index : number = 0;
            var e : Voronoi.Edge;
            while((index < size)){
                e = <Voronoi.Edge>this.d_edge.get(index);
                if(e.newFace() != null) {
                    if(e.adjFace(0).visible()) e.adjFace(0, e.newFace()); else e.adjFace(1, e.newFace());
                    e.newFace(null);
                }
                ++index;
            };
            index = 0;
            while((index < size)){
                e = <Voronoi.Edge>this.d_edge.get(index);
                if(e.delete()) {
                    this.d_edge.remove(e);
                    size = this.d_edge.size();
                } else ++index;
            };
        }

        /**
         * 
         * Clean up the face list
         */
        cleanFaces() {
            var size : number = this.d_face.size();
            var index : number = 0;
            var f : Voronoi.Face;
            do {
                f = <Voronoi.Face>this.d_face.get(index);
                if(f.visible()) {
                    this.d_face.remove(f);
                    size = this.d_face.size();
                } else index++;
            } while((index < size));
        }

        /**
         * 
         * Clean up the vertex list
         */
        cleanVertices() {
            var size : number = this.d_edge.size();
            var index : number = 0;
            var e : Voronoi.Edge;
            while((index < size)){
                e = <Voronoi.Edge>this.d_edge.get(index);
                e.endPt(0).onHull(Voronoi.ONHULL);
                e.endPt(1).onHull(Voronoi.ONHULL);
                ++index;
            };
            index = 0;
            var v : Voronoi.Vertex;
            size = this.d_vertex.size();
            while((index < size)){
                v = <Voronoi.Vertex>this.d_vertex.get(index);
                if(v.isMarked() && !v.onHull()) {
                    this.d_vertex.remove(v);
                    size = this.d_vertex.size();
                } else ++index;
            };
            index = 0;
            while((index < size)){
                v = <Voronoi.Vertex>this.d_vertex.get(index);
                v.duplicate(null);
                v.onHull(!Voronoi.ONHULL);
                ++index;
            };
        }

        addOne(p : Voronoi.Vertex) : boolean {
            var nofFaces : number = this.d_face.size();
            var currFace : number = 0;
            var vis : boolean = false;
            while((currFace < nofFaces)){
                var f : Voronoi.Face = <Voronoi.Face>this.d_face.get(currFace);
                var vol : number = this.volume6(f, p);
                if(vol < 0) {
                    f.visible(Voronoi.VISIBLE);
                    vis = true;
                }
                ++currFace;
            };
            if(!vis) {
                p.onHull(!Voronoi.ONHULL);
                return false;
            }
            var nofEdges : number = this.d_edge.size();
            var currEdge : number = 0;
            while((currEdge < nofEdges)){
                var e : Voronoi.Edge = <Voronoi.Edge>this.d_edge.get(currEdge);
                if(e.adjFace(0).visible() && e.adjFace(1).visible()) {
                    e.delete(Voronoi.REMOVED);
                } else if(e.adjFace(0).visible() || e.adjFace(1).visible()) {
                    e.newFace(this.makeFace(e, p));
                }
                ++currEdge;
            };
            return true;
        }

        /**
         * 
         * Output the 2D Delaunay triangulation
         */
        outputDelaunayTriangles() {
            var size : number = this.d_face.size();
            for(var index : number = 0; index < size; index++) {
                var f : Voronoi.Face = <Voronoi.Face>this.d_face.get(index);
                if(!f.topFace()) {
                    console.info(f.vertex(0).x() + " " + f.vertex(0).y() + " " + f.vertex(1).x() + " " + f.vertex(1).y() + " " + f.vertex(2).x() + " " + f.vertex(2).y());
                    var p : PolygonDouble = new PolygonDouble();
                    p.add(f.vertex(0).x(), f.vertex(0).y());
                    p.add(f.vertex(1).x(), f.vertex(1).y());
                    p.add(f.vertex(2).x(), f.vertex(2).y());
                    this.d_pl.addTriangle(p);
                }
            }
        }

        /**
         * 
         * Output the 2D Voronoi vertices
         */
        outputVoronoiVertices() {
            var size : number = this.d_face.size();
            for(var index : number = 0; index < size; index++) {
                var f : Voronoi.Face = <Voronoi.Face>this.d_face.get(index);
                if(!f.topFace()) {
                    var voronoiVertex : Voronoi.Vertex = f.getVoronoiVertex();
                    var p : Point = new Point(voronoiVertex.x(), voronoiVertex.y(), 0.0);
                    console.info(voronoiVertex.x() + " " + voronoiVertex.y());
                    this.d_pl.addVoronoiVertex(p);
                }
            }
        }

        /**
         * 
         * Print the vertex list
         */
        printVertices() {
            console.info("Vertices : ");
            var size : number = this.d_vertex.size();
            for(var ii : number = 0; ii < size; ii++) {
                console.info("Vertex # " + ii + "  ");
                (<Voronoi.Vertex>this.d_vertex.get(ii)).printVertex();
            }
        }

        /**
         * 
         * Print the edge list
         */
        printEdges() {
            console.info("Edges : ");
            var size : number = this.d_edge.size();
            for(var ii : number = 0; ii < size; ii++) {
                console.info("Edge # " + ii + "  ");
                (<Voronoi.Edge>this.d_edge.get(ii)).printEdge();
            }
        }

        /**
         * 
         * Print the face list
         */
        printFaces() {
            console.info("Faces : ");
            var size : number = this.d_face.size();
            for(var ii : number = 0; ii < size; ii++) {
                console.info("Face # " + ii + "  ");
                (<Voronoi.Face>this.d_face.get(ii)).printFace();
            }
        }

        /**
         * 
         * Print the orientation of the faces in the edgelist
         */
        printFaceOrientation() {
            console.info("Edge Face Orientation : ");
            var size : number = this.d_edge.size();
            for(var ii : number = 0; ii < size; ii++) {
                var e : Voronoi.Edge = <Voronoi.Edge>this.d_edge.get(ii);
                console.info("Edge # " + ii + "(" + e.endPt(0).x() + "," + e.endPt(0).y() + ");(" + e.endPt(1).x() + "," + e.endPt(1).y() + ")");
                e.printFaceOrientation();
            }
        }

        /**
         * 
         * Check the orientation of the faces in the edgelist
         */
        checkFaceOrientation() {
            console.info("Edge Face Orientation Check: ");
            var size : number = this.d_edge.size();
            for(var ii : number = 0; ii < size; ii++) {
                var e : Voronoi.Edge = <Voronoi.Edge>this.d_edge.get(ii);
                if(!e.checkFaceOrientation()) {
                    console.info("** ERROR ** Face orientation wrong for Edge " + ii);
                }
            }
        }

        /**
         * 
         * Check the convexity (each face in the hull should form a non-negative
         * volume with each vertex of the hull
         */
        checkConvexity() {
            var nofFaces : number = this.d_face.size();
            var nofEdges : number = this.d_edge.size();
            var nofVertices : number = this.d_vertex.size();
            console.info("Convexity Check : (F,E,V) = " + nofFaces + "," + nofEdges + "," + nofVertices);
            if(nofFaces !== 2 * nofVertices - 4) {
                console.info("** ERROR ** F = 2V-4 not satisfied");
            }
            if(2 * nofEdges !== 3 * nofVertices) {
                console.info("** ERROR ** 2E = 3V not satisfied");
            }
            for(var ii : number = 0; ii < nofFaces; ii++) {
                var f : Voronoi.Face = <Voronoi.Face>this.d_face.get(ii);
                for(var jj : number = 0; jj < nofVertices; jj++) {
                    var v : Voronoi.Vertex = <Voronoi.Vertex>this.d_vertex.get(jj);
                    if(v.isMarked()) {
                        var vol : number = this.volume6(f, v);
                        if(vol < 0) {
                            console.info("** ERROR ** Volume between face " + ii + " and vertex " + jj + " is " + vol);
                        }
                    }
                }
            }
        }
    }

    export namespace Voronoi {

        export class Vertex {
            public __parent: any;
            d_v : number[];

            d_duplicate : Voronoi.Edge;

            d_onHull : boolean;

            d_mark : boolean;

            public constructor(__parent: any, x? : any, y? : any, z? : any) {
                if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (() => {
                        this.d_v = new Array(3);
                        this.d_v[0] = x;
                        this.d_v[1] = y;
                        this.d_v[2] = z;
                        this.d_duplicate = null;
                        this.d_onHull = !Voronoi.ONHULL;
                        this.d_mark = !Voronoi.PROCESSED;
                    })();
                } else if(((x != null && x instanceof vaango_ui.Voronoi.Vertex) || x === null) && y === undefined && z === undefined) {
                    var v : any = x;
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (() => {
                        this.d_v = new Array(3);
                        this.d_v[0] = this.v(0);
                        this.d_v[1] = this.v(1);
                        this.d_v[2] = this.v(2);
                        this.d_duplicate = null;
                        this.d_onHull = !Voronoi.ONHULL;
                        this.d_mark = !Voronoi.PROCESSED;
                    })();
                } else if(((x != null && x instanceof vaango_ui.Point) || x === null) && y === undefined && z === undefined) {
                    var pt : any = x;
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (() => {
                        this.d_v = new Array(3);
                        this.d_v[0] = this.mapToInt(pt.getX());
                        this.d_v[1] = this.mapToInt(pt.getY());
                        this.d_v[2] = this.mapToInt(pt.getX() * pt.getX() + pt.getY() * pt.getY());
                        this.d_duplicate = null;
                        this.d_onHull = !Voronoi.ONHULL;
                        this.d_mark = !Voronoi.PROCESSED;
                    })();
                } else if(x === undefined && y === undefined && z === undefined) {
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (() => {
                        this.d_v = new Array(3);
                        this.d_v[0] = 0;
                        this.d_v[1] = 0;
                        this.d_v[2] = 0;
                        this.d_duplicate = null;
                        this.d_onHull = !Voronoi.ONHULL;
                        this.d_mark = !Voronoi.PROCESSED;
                    })();
                } else throw new Error('invalid overload');
            }

            v(index : number) : number {
                return this.d_v[index];
            }

            x() : number {
                return this.mapToDouble(this.d_v[0]);
            }

            y() : number {
                return this.mapToDouble(this.d_v[1]);
            }

            z() : number {
                return this.mapToDouble(this.d_v[2]);
            }

            public set(pt? : any) : any {
                if(((pt != null && pt instanceof vaango_ui.Point) || pt === null)) {
                    return <any>(() => {
                        this.d_v[0] = this.mapToInt(pt.getX());
                        this.d_v[1] = this.mapToInt(pt.getY());
                        this.d_v[2] = this.mapToInt(pt.getX() * pt.getX() + pt.getY() * pt.getY());
                    })();
                } else if(((pt != null && pt instanceof vaango_ui.Voronoi.Vertex) || pt === null)) {
                    return <any>this.set$vaango_ui_Voronoi_Vertex(pt);
                } else throw new Error('invalid overload');
            }

            set$vaango_ui_Voronoi_Vertex(v : Voronoi.Vertex) {
                this.d_v[0] = this.v(0);
                this.d_v[1] = this.v(1);
                this.d_v[2] = this.v(2);
            }

            onHull$() : boolean {
                return this.d_onHull;
            }

            public onHull(flag? : any) : any {
                if(((typeof flag === 'boolean') || flag === null)) {
                    return <any>(() => {
                        this.d_onHull = flag;
                    })();
                } else if(flag === undefined) {
                    return <any>this.onHull$();
                } else throw new Error('invalid overload');
            }

            isMarked() : boolean {
                return this.d_mark;
            }

            mark(flag : boolean) {
                this.d_mark = flag;
            }

            duplicate$() : Voronoi.Edge {
                return this.d_duplicate;
            }

            public duplicate(e? : any) : any {
                if(((e != null && e instanceof vaango_ui.Voronoi.Edge) || e === null)) {
                    return <any>(() => {
                        this.d_duplicate = e;
                    })();
                } else if(e === undefined) {
                    return <any>this.duplicate$();
                } else throw new Error('invalid overload');
            }

            mapToInt(val : number) : number {
                var max : number = 10000.0;
                return (Math.round(<number>(val * max)));
            }

            mapToDouble(val : number) : number {
                var max : number = 10000.0;
                return (<number>val / max);
            }

            printVertex() {
                console.info("(" + this.x() + "," + this.y() + "," + this.z() + ") Onhull = " + this.d_onHull + " Marked = " + this.d_mark + " Duplic = " + this.d_duplicate);
            }
        }

        export class Edge {
            public __parent: any;
            d_endPts : Voronoi.Vertex[];

            d_adjFace : Voronoi.Face[];

            d_newFace : Voronoi.Face;

            d_delete : boolean;

            public constructor(__parent: any, start? : any, end? : any, left? : any, right? : any) {
                if(((start != null && start instanceof vaango_ui.Voronoi.Vertex) || start === null) && ((end != null && end instanceof vaango_ui.Voronoi.Vertex) || end === null) && ((left != null && left instanceof vaango_ui.Voronoi.Face) || left === null) && ((right != null && right instanceof vaango_ui.Voronoi.Face) || right === null)) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (() => {
                        this.d_endPts = new Array(2);
                        this.d_adjFace = new Array(2);
                        this.d_endPts[0] = start;
                        this.d_endPts[1] = end;
                        this.d_adjFace[0] = left;
                        this.d_adjFace[1] = right;
                        this.d_newFace = null;
                        this.d_delete = !Voronoi.REMOVED;
                    })();
                } else if(((start != null && start instanceof vaango_ui.Voronoi.Vertex) || start === null) && ((end != null && end instanceof vaango_ui.Voronoi.Vertex) || end === null) && left === undefined && right === undefined) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (() => {
                        this.d_endPts = new Array(2);
                        this.d_adjFace = new Array(2);
                        this.d_endPts[0] = start;
                        this.d_endPts[1] = end;
                        this.d_adjFace[0] = null;
                        this.d_adjFace[1] = null;
                        this.d_newFace = null;
                        this.d_delete = !Voronoi.REMOVED;
                    })();
                } else if(((start != null && start instanceof vaango_ui.Voronoi.Edge) || start === null) && end === undefined && left === undefined && right === undefined) {
                    var e : any = start;
                    this.__parent = __parent;
                    this.d_delete = false;
                    (() => {
                        this.d_endPts = new Array(2);
                        this.d_adjFace = new Array(2);
                        this.d_endPts[0] = e.d_endPts[0];
                        this.d_endPts[1] = e.d_endPts[1];
                        this.d_adjFace[0] = e.d_adjFace[0];
                        this.d_adjFace[1] = e.d_adjFace[1];
                        this.d_newFace = e.d_newFace;
                        this.d_delete = e.d_delete;
                    })();
                } else if(start === undefined && end === undefined && left === undefined && right === undefined) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (() => {
                        this.d_endPts = new Array(2);
                        this.d_adjFace = new Array(2);
                        this.d_endPts[0] = null;
                        this.d_endPts[1] = null;
                        this.d_adjFace[0] = null;
                        this.d_adjFace[1] = null;
                        this.d_newFace = null;
                        this.d_delete = !Voronoi.REMOVED;
                    })();
                } else throw new Error('invalid overload');
            }

            endPt$int(index : number) : Voronoi.Vertex {
                return this.d_endPts[index];
            }

            public endPt(index? : any, v? : any) : any {
                if(((typeof index === 'number') || index === null) && ((v != null && v instanceof vaango_ui.Voronoi.Vertex) || v === null)) {
                    return <any>(() => {
                        this.d_endPts[index] = v;
                    })();
                } else if(((typeof index === 'number') || index === null) && v === undefined) {
                    return <any>this.endPt$int(index);
                } else throw new Error('invalid overload');
            }

            adjFace$int(index : number) : Voronoi.Face {
                return this.d_adjFace[index];
            }

            public adjFace(index? : any, f? : any) : any {
                if(((typeof index === 'number') || index === null) && ((f != null && f instanceof vaango_ui.Voronoi.Face) || f === null)) {
                    return <any>(() => {
                        this.d_adjFace[index] = f;
                    })();
                } else if(((typeof index === 'number') || index === null) && f === undefined) {
                    return <any>this.adjFace$int(index);
                } else throw new Error('invalid overload');
            }

            newFace$() : Voronoi.Face {
                return this.d_newFace;
            }

            public newFace(f? : any) : any {
                if(((f != null && f instanceof vaango_ui.Voronoi.Face) || f === null)) {
                    return <any>(() => {
                        this.d_newFace = f;
                    })();
                } else if(f === undefined) {
                    return <any>this.newFace$();
                } else throw new Error('invalid overload');
            }

            delete$() : boolean {
                return this.d_delete;
            }

            public delete(flag? : any) : any {
                if(((typeof flag === 'boolean') || flag === null)) {
                    return <any>(() => {
                        this.d_delete = flag;
                    })();
                } else if(flag === undefined) {
                    return <any>this.delete$();
                } else throw new Error('invalid overload');
            }

            printEdge() {
                console.info("v1 = " + this.endPt(0) + " v2 = " + this.endPt(1) + " f1 = " + this.adjFace(0) + " f2 = " + this.adjFace(1) + " newFace = " + this.d_newFace + " delete = " + this.d_delete);
            }

            printFaceOrientation() {
                java.lang.System.out.print("Face 1 :");
                for(var ii : number = 0; ii < 3; ii++) {
                    if(this === this.adjFace(0).edge(ii)) {
                        java.lang.System.out.print(" Edge :" + ii);
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(0).x() + "," + this.adjFace(0).vertex(0).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(1).x() + "," + this.adjFace(0).vertex(1).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(2).x() + "," + this.adjFace(0).vertex(2).y() + ");");
                        console.info(" ");
                    }
                }
                java.lang.System.out.print("Face 2 :");
                for(var ii : number = 0; ii < 3; ii++) {
                    if(this === this.adjFace(1).edge(ii)) {
                        java.lang.System.out.print(" Edge :" + ii);
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(0).x() + "," + this.adjFace(1).vertex(0).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(1).x() + "," + this.adjFace(1).vertex(1).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(2).x() + "," + this.adjFace(1).vertex(2).y() + ");");
                        console.info(" ");
                    }
                }
            }

            checkFaceOrientation() : boolean {
                var v1 : Voronoi.Vertex = null;
                var v2 : Voronoi.Vertex = null;
                var v3 : Voronoi.Vertex = null;
                var v4 : Voronoi.Vertex = null;
                for(var ii : number = 0; ii < 3; ii++) {
                    if(this.adjFace(0).edge(ii) === this) {
                        v1 = this.adjFace(0).vertex(ii);
                        v2 = this.adjFace(0).vertex((ii + 1) % 3);
                    }
                    if(this.adjFace(1).edge(ii) === this) {
                        v3 = this.adjFace(1).vertex(ii);
                        v4 = this.adjFace(1).vertex((ii + 1) % 3);
                    }
                }
                if(v1 === v4 && v2 === v3) return true;
                return false;
            }
        }

        export class Face {
            public __parent: any;
            d_vertex : Voronoi.Vertex[];

            d_edge : Voronoi.Edge[];

            d_visible : boolean;

            public constructor(__parent: any, v1? : any, v2? : any, v3? : any, e12? : any, e23? : any, e31? : any) {
                if(((v1 != null && v1 instanceof vaango_ui.Voronoi.Vertex) || v1 === null) && ((v2 != null && v2 instanceof vaango_ui.Voronoi.Vertex) || v2 === null) && ((v3 != null && v3 instanceof vaango_ui.Voronoi.Vertex) || v3 === null) && ((e12 != null && e12 instanceof vaango_ui.Voronoi.Edge) || e12 === null) && ((e23 != null && e23 instanceof vaango_ui.Voronoi.Edge) || e23 === null) && ((e31 != null && e31 instanceof vaango_ui.Voronoi.Edge) || e31 === null)) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (() => {
                        this.d_vertex = new Array(3);
                        this.d_edge = new Array(3);
                        this.d_vertex[0] = v1;
                        this.d_vertex[1] = v2;
                        this.d_vertex[2] = v3;
                        this.d_edge[0] = e12;
                        this.d_edge[1] = e23;
                        this.d_edge[2] = e31;
                        this.d_visible = false;
                    })();
                } else if(((v1 != null && v1 instanceof vaango_ui.Voronoi.Vertex) || v1 === null) && ((v2 != null && v2 instanceof vaango_ui.Voronoi.Vertex) || v2 === null) && ((v3 != null && v3 instanceof vaango_ui.Voronoi.Vertex) || v3 === null) && e12 === undefined && e23 === undefined && e31 === undefined) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (() => {
                        this.d_vertex = new Array(3);
                        this.d_edge = new Array(3);
                        this.d_vertex[0] = v1;
                        this.d_vertex[1] = v2;
                        this.d_vertex[2] = v3;
                        this.d_edge[0] = null;
                        this.d_edge[1] = null;
                        this.d_edge[2] = null;
                        this.d_visible = false;
                    })();
                } else if(((v1 != null && v1 instanceof vaango_ui.Voronoi.Face) || v1 === null) && v2 === undefined && v3 === undefined && e12 === undefined && e23 === undefined && e31 === undefined) {
                    var f : any = v1;
                    this.__parent = __parent;
                    this.d_visible = false;
                    (() => {
                        this.d_vertex = new Array(3);
                        this.d_edge = new Array(3);
                        this.d_vertex[0] = f.d_vertex[0];
                        this.d_vertex[1] = f.d_vertex[1];
                        this.d_vertex[2] = f.d_vertex[2];
                        this.d_edge[0] = f.d_edge[0];
                        this.d_edge[1] = f.d_edge[1];
                        this.d_edge[2] = f.d_edge[2];
                        this.d_visible = f.d_visible;
                    })();
                } else if(v1 === undefined && v2 === undefined && v3 === undefined && e12 === undefined && e23 === undefined && e31 === undefined) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (() => {
                        this.d_vertex = new Array(3);
                        this.d_edge = new Array(3);
                        this.d_vertex[0] = null;
                        this.d_vertex[1] = null;
                        this.d_vertex[2] = null;
                        this.d_edge[0] = null;
                        this.d_edge[1] = null;
                        this.d_edge[2] = null;
                        this.d_visible = false;
                    })();
                } else throw new Error('invalid overload');
            }

            vertex$int(index : number) : Voronoi.Vertex {
                return this.d_vertex[index];
            }

            public vertex(index? : any, v? : any) : any {
                if(((typeof index === 'number') || index === null) && ((v != null && v instanceof vaango_ui.Voronoi.Vertex) || v === null)) {
                    return <any>(() => {
                        this.d_vertex[index] = v;
                    })();
                } else if(((typeof index === 'number') || index === null) && v === undefined) {
                    return <any>this.vertex$int(index);
                } else throw new Error('invalid overload');
            }

            edge$int(index : number) : Voronoi.Edge {
                return this.d_edge[index];
            }

            public edge(index? : any, e? : any) : any {
                if(((typeof index === 'number') || index === null) && ((e != null && e instanceof vaango_ui.Voronoi.Edge) || e === null)) {
                    return <any>(() => {
                        this.d_edge[index] = e;
                    })();
                } else if(((typeof index === 'number') || index === null) && e === undefined) {
                    return <any>this.edge$int(index);
                } else throw new Error('invalid overload');
            }

            visible$() : boolean {
                return this.d_visible;
            }

            public visible(flag? : any) : any {
                if(((typeof flag === 'boolean') || flag === null)) {
                    return <any>(() => {
                        this.d_visible = flag;
                    })();
                } else if(flag === undefined) {
                    return <any>this.visible$();
                } else throw new Error('invalid overload');
            }

            /**
             * Find if the face is a "top" face, i.e., if the outward pointing normal
             * to the face points upward (has a +ve dot product with the z-axis vector)
             */
            topFace() : boolean {
                var ax : number = this.d_vertex[0].v(0);
                var ay : number = this.d_vertex[0].v(1);
                var bx : number = this.d_vertex[1].v(0);
                var by : number = this.d_vertex[1].v(1);
                var cx : number = this.d_vertex[2].v(0);
                var cy : number = this.d_vertex[2].v(1);
                var A0 : number = bx - ax;
                var A1 : number = by - ay;
                var B0 : number = cx - ax;
                var B1 : number = cy - ay;
                var AxB_k : number = A0 * B1 - A1 * B0;
                var AxBdotZ : number = AxB_k;
                if(AxBdotZ > 0) return true;
                return false;
            }

            /**
             * Calculate the location of the Voronoi vertex for this face
             * (the center of the circumcircle)
             */
            getVoronoiVertex() : Voronoi.Vertex {
                var a0 : number = this.d_vertex[0].v(0);
                var a1 : number = this.d_vertex[0].v(1);
                var b0 : number = this.d_vertex[1].v(0);
                var b1 : number = this.d_vertex[1].v(1);
                var c0 : number = this.d_vertex[2].v(0);
                var c1 : number = this.d_vertex[2].v(1);
                var D : number = 2 * (a1 * c0 + b1 * a0 - b1 * c0 - a1 * b0 - c1 * a0 + c1 * b0);
                var v : Voronoi.Vertex = null;
                if(D !== 0) {
                    var p0 : number = Math.round((b1 * a0 * a0 - c1 * a0 * a0 - b1 * b1 * a1 + c1 * c1 * a1 + b0 * b0 * c1 + a1 * a1 * b1 + c0 * c0 * a1 - c1 * c1 * b1 - c0 * c0 * b1 - b0 * b0 * a1 + b1 * b1 * c1 - a1 * a1 * c1) / D);
                    var p1 : number = Math.round((a0 * a0 * c0 + a1 * a1 * c0 + b0 * b0 * a0 - b0 * b0 * c0 + b1 * b1 * a0 - b1 * b1 * c0 - a0 * a0 * b0 - a1 * a1 * b0 - c0 * c0 * a0 + c0 * c0 * b0 - c1 * c1 * a0 + c1 * c1 * b0) / D);
                    v = new Voronoi.Vertex(this.__parent, p0, p1, 0);
                } else {
                    v = new Voronoi.Vertex(this.__parent, 0, 0, 0);
                }
                return v;
            }

            printFace() {
                console.info("v1 = " + this.vertex(0) + " v2 = " + this.vertex(1) + " v3 = " + this.vertex(2) + " e1 = " + this.edge(0) + " e2 = " + this.edge(1) + " e3 = " + this.edge(2) + " visible = " + this.d_visible);
            }
        }
    }

}

