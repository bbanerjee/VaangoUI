"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var LinkedList = java.util.LinkedList;
    var Voronoi = (function () {
        function Voronoi(pl) {
            var _this = this;
            if (((pl != null && pl instanceof vaango_ui.ParticleList) || pl === null)) {
                this.d_nofVert = 0;
                (function () {
                    _this.d_nofVert = pl.size();
                    _this.d_vertex = new LinkedList();
                    _this.d_edge = new LinkedList();
                    _this.d_face = new LinkedList();
                    _this.d_pl = pl;
                })();
            }
            else if (pl === undefined) {
                this.d_nofVert = 0;
                (function () {
                    _this.d_nofVert = 0;
                    _this.d_vertex = new LinkedList();
                    _this.d_edge = new LinkedList();
                    _this.d_face = new LinkedList();
                    _this.d_pl = null;
                })();
            }
            else
                throw new Error('invalid overload');
        }
        /**
         *
         * Create the convex hull
         */
        Voronoi.prototype.process = function () {
            this.readPoints();
            if (!this.makeTetrahedron())
                return;
            this.constructHull();
            this.outputDelaunayTriangles();
            this.outputVoronoiVertices();
        };
        /**
         *
         * Read the input set of points
         */
        Voronoi.prototype.readPoints = function () {
            for (var ii = 0; ii < this.d_nofVert; ii++) {
                var p = this.d_pl.getParticle(ii);
                var cent = p.getCenter();
                var vert = new Voronoi.Vertex(this, cent);
                this.d_vertex.add(vert);
            }
            this.printVertices();
        };
        /**
         *
         * Make the starting tetrahedron
         */
        Voronoi.prototype.makeTetrahedron = function () {
            var nofVerts = this.d_vertex.size();
            if (nofVerts < 4) {
                console.info("There should be at least 4 vertices");
                return false;
            }
            var index = 0;
            var v1 = this.d_vertex.get(index);
            ++index;
            var v2 = this.d_vertex.get(index);
            ++index;
            var v3 = this.d_vertex.get(index);
            while ((this.collinear(v1, v2, v3))) {
                if (index === nofVerts - 1) {
                    console.info("All points are collinear");
                    return false;
                }
                else {
                    ++index;
                    v1 = v2;
                    v2 = v3;
                    v3 = this.d_vertex.get(index);
                }
            }
            ;
            v1.mark(Voronoi.PROCESSED);
            v2.mark(Voronoi.PROCESSED);
            v3.mark(Voronoi.PROCESSED);
            var e1 = new Voronoi.Edge(this, v1, v2);
            this.d_edge.add(e1);
            var e2 = new Voronoi.Edge(this, v2, v3);
            this.d_edge.add(e2);
            var e3 = new Voronoi.Edge(this, v3, v1);
            this.d_edge.add(e3);
            var base = new Voronoi.Face(this, v1, v2, v3, e1, e2, e3);
            this.d_face.add(base);
            e1.adjFace(0, base);
            e2.adjFace(0, base);
            e3.adjFace(0, base);
            ++index;
            var v4 = this.d_vertex.get(index);
            var vol = this.volume6(base, v4);
            while ((vol === 0)) {
                if (index === nofVerts - 1) {
                    console.info("All points are coplanar");
                    return false;
                }
                else {
                    ++index;
                    v4 = this.d_vertex.get(index);
                    vol = this.volume6(base, v4);
                }
            }
            ;
            v4.mark(Voronoi.PROCESSED);
            var vTemp;
            var eTemp;
            if (vol < 0) {
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
        };
        /**
         *
         * Construct the incremental convex hull
         */
        Voronoi.prototype.constructHull = function () {
            var size = this.d_vertex.size();
            var index = 0;
            var v;
            while ((index < size)) {
                v = this.d_vertex.get(index);
                if (!v.isMarked()) {
                    v.mark(Voronoi.PROCESSED);
                    var changed = this.addOne(v);
                    if (changed)
                        this.cleanup();
                    size = this.d_vertex.size();
                    index = 0;
                }
                else {
                    index++;
                }
            }
            ;
            this.printFaceOrientation();
            this.checkFaceOrientation();
            this.checkConvexity();
        };
        /**
         *
         * Find if three points are collinear
         */
        Voronoi.prototype.collinear = function (v1, v2, v3) {
            return (this.areaTri(v1, v2, v3) === 0);
        };
        /**
         *
         * Calculate the area of a triangle
         */
        Voronoi.prototype.areaTri = function (v1, v2, v3) {
            return (v1.v(0) * v2.v(1) - v1.v(1) * v2.v(0) + v1.v(1) * v3.v(0) - v1.v(0) * v3.v(1) + v2.v(0) * v3.v(1) - v3.v(0) * v2.v(1));
        };
        /**
         *
         * Calculate the colume of a tetrahedron
         */
        Voronoi.prototype.volume6 = function (f, p) {
            var ax = f.vertex(0).v(0);
            var ay = f.vertex(0).v(1);
            var az = f.vertex(0).v(2);
            var bx = f.vertex(1).v(0);
            var by = f.vertex(1).v(1);
            var bz = f.vertex(1).v(2);
            var cx = f.vertex(2).v(0);
            var cy = f.vertex(2).v(1);
            var cz = f.vertex(2).v(2);
            var dx = p.v(0);
            var dy = p.v(1);
            var dz = p.v(2);
            var vol = -az * by * cx + ay * bz * cx + az * bx * cy - ax * bz * cy - ay * bx * cz + ax * by * cz + az * by * dx - ay * bz * dx - az * cy * dx + bz * cy * dx + ay * cz * dx - by * cz * dx - az * bx * dy + ax * bz * dy + az * cx * dy - bz * cx * dy - ax * cz * dy + bx * cz * dy + ay * bx * dz - ax * by * dz - ay * cx * dz + by * cx * dz + ax * cy * dz - bx * cy * dz;
            return vol;
        };
        /**
         *
         * Make a new face based on an edge and a vertex
         */
        Voronoi.prototype.makeFace = function (e, p) {
            var newEdge = new Array(2);
            for (var ii = 0; ii < 2; ++ii) {
                if ((newEdge[ii] = e.endPt(ii).duplicate()) == null) {
                    newEdge[ii] = new Voronoi.Edge(this, e.endPt(ii), p);
                    this.d_edge.add(newEdge[ii]);
                    e.endPt(ii).duplicate(newEdge[ii]);
                }
            }
            var newFace = new Voronoi.Face(this);
            newFace.edge(0, e);
            newFace.edge(1, newEdge[0]);
            newFace.edge(2, newEdge[1]);
            this.d_face.add(newFace);
            this.makeCCW(newFace, e, p);
            for (var ii = 0; ii < 2; ++ii) {
                for (var jj = 0; jj < 2; ++jj) {
                    if (newEdge[ii].adjFace(jj) == null) {
                        newEdge[ii].adjFace(jj, newFace);
                        break;
                    }
                }
            }
            return newFace;
        };
        /**
         *
         * Make all the vertices and edges of face counter-clockwise
         */
        Voronoi.prototype.makeCCW = function (f, e, p) {
            var fi;
            if (e.adjFace(1) == null)
                fi = e.adjFace(0);
            else {
                if (!e.adjFace(0).visible())
                    fi = e.adjFace(0);
                else
                    fi = e.adjFace(1);
            }
            var ii;
            for (ii = 0; fi.vertex(ii) !== e.endPt(1); ++ii)
                if (fi.vertex((ii + 1) % 3) !== e.endPt(0)) {
                    f.vertex(0, e.endPt(1));
                    f.vertex(1, e.endPt(0));
                }
                else {
                    f.vertex(0, e.endPt(0));
                    f.vertex(1, e.endPt(1));
                    var eTemp = f.edge(1);
                    f.edge(1, f.edge(2));
                    f.edge(2, eTemp);
                }
            f.vertex(2, p);
        };
        Voronoi.prototype.cleanup = function () {
            this.cleanEdges();
            this.cleanFaces();
            this.cleanVertices();
        };
        /**
         *
         * Clean up the edge list
         */
        Voronoi.prototype.cleanEdges = function () {
            var size = this.d_edge.size();
            var index = 0;
            var e;
            while ((index < size)) {
                e = this.d_edge.get(index);
                if (e.newFace() != null) {
                    if (e.adjFace(0).visible())
                        e.adjFace(0, e.newFace());
                    else
                        e.adjFace(1, e.newFace());
                    e.newFace(null);
                }
                ++index;
            }
            ;
            index = 0;
            while ((index < size)) {
                e = this.d_edge.get(index);
                if (e.delete()) {
                    this.d_edge.remove(e);
                    size = this.d_edge.size();
                }
                else
                    ++index;
            }
            ;
        };
        /**
         *
         * Clean up the face list
         */
        Voronoi.prototype.cleanFaces = function () {
            var size = this.d_face.size();
            var index = 0;
            var f;
            do {
                f = this.d_face.get(index);
                if (f.visible()) {
                    this.d_face.remove(f);
                    size = this.d_face.size();
                }
                else
                    index++;
            } while ((index < size));
        };
        /**
         *
         * Clean up the vertex list
         */
        Voronoi.prototype.cleanVertices = function () {
            var size = this.d_edge.size();
            var index = 0;
            var e;
            while ((index < size)) {
                e = this.d_edge.get(index);
                e.endPt(0).onHull(Voronoi.ONHULL);
                e.endPt(1).onHull(Voronoi.ONHULL);
                ++index;
            }
            ;
            index = 0;
            var v;
            size = this.d_vertex.size();
            while ((index < size)) {
                v = this.d_vertex.get(index);
                if (v.isMarked() && !v.onHull()) {
                    this.d_vertex.remove(v);
                    size = this.d_vertex.size();
                }
                else
                    ++index;
            }
            ;
            index = 0;
            while ((index < size)) {
                v = this.d_vertex.get(index);
                v.duplicate(null);
                v.onHull(!Voronoi.ONHULL);
                ++index;
            }
            ;
        };
        Voronoi.prototype.addOne = function (p) {
            var nofFaces = this.d_face.size();
            var currFace = 0;
            var vis = false;
            while ((currFace < nofFaces)) {
                var f = this.d_face.get(currFace);
                var vol = this.volume6(f, p);
                if (vol < 0) {
                    f.visible(Voronoi.VISIBLE);
                    vis = true;
                }
                ++currFace;
            }
            ;
            if (!vis) {
                p.onHull(!Voronoi.ONHULL);
                return false;
            }
            var nofEdges = this.d_edge.size();
            var currEdge = 0;
            while ((currEdge < nofEdges)) {
                var e = this.d_edge.get(currEdge);
                if (e.adjFace(0).visible() && e.adjFace(1).visible()) {
                    e.delete(Voronoi.REMOVED);
                }
                else if (e.adjFace(0).visible() || e.adjFace(1).visible()) {
                    e.newFace(this.makeFace(e, p));
                }
                ++currEdge;
            }
            ;
            return true;
        };
        /**
         *
         * Output the 2D Delaunay triangulation
         */
        Voronoi.prototype.outputDelaunayTriangles = function () {
            var size = this.d_face.size();
            for (var index = 0; index < size; index++) {
                var f = this.d_face.get(index);
                if (!f.topFace()) {
                    console.info(f.vertex(0).x() + " " + f.vertex(0).y() + " " + f.vertex(1).x() + " " + f.vertex(1).y() + " " + f.vertex(2).x() + " " + f.vertex(2).y());
                    var p = new vaango_ui.PolygonDouble();
                    p.add(f.vertex(0).x(), f.vertex(0).y());
                    p.add(f.vertex(1).x(), f.vertex(1).y());
                    p.add(f.vertex(2).x(), f.vertex(2).y());
                    this.d_pl.addTriangle(p);
                }
            }
        };
        /**
         *
         * Output the 2D Voronoi vertices
         */
        Voronoi.prototype.outputVoronoiVertices = function () {
            var size = this.d_face.size();
            for (var index = 0; index < size; index++) {
                var f = this.d_face.get(index);
                if (!f.topFace()) {
                    var voronoiVertex = f.getVoronoiVertex();
                    var p = new vaango_ui.Point(voronoiVertex.x(), voronoiVertex.y(), 0.0);
                    console.info(voronoiVertex.x() + " " + voronoiVertex.y());
                    this.d_pl.addVoronoiVertex(p);
                }
            }
        };
        /**
         *
         * Print the vertex list
         */
        Voronoi.prototype.printVertices = function () {
            console.info("Vertices : ");
            var size = this.d_vertex.size();
            for (var ii = 0; ii < size; ii++) {
                console.info("Vertex # " + ii + "  ");
                this.d_vertex.get(ii).printVertex();
            }
        };
        /**
         *
         * Print the edge list
         */
        Voronoi.prototype.printEdges = function () {
            console.info("Edges : ");
            var size = this.d_edge.size();
            for (var ii = 0; ii < size; ii++) {
                console.info("Edge # " + ii + "  ");
                this.d_edge.get(ii).printEdge();
            }
        };
        /**
         *
         * Print the face list
         */
        Voronoi.prototype.printFaces = function () {
            console.info("Faces : ");
            var size = this.d_face.size();
            for (var ii = 0; ii < size; ii++) {
                console.info("Face # " + ii + "  ");
                this.d_face.get(ii).printFace();
            }
        };
        /**
         *
         * Print the orientation of the faces in the edgelist
         */
        Voronoi.prototype.printFaceOrientation = function () {
            console.info("Edge Face Orientation : ");
            var size = this.d_edge.size();
            for (var ii = 0; ii < size; ii++) {
                var e = this.d_edge.get(ii);
                console.info("Edge # " + ii + "(" + e.endPt(0).x() + "," + e.endPt(0).y() + ");(" + e.endPt(1).x() + "," + e.endPt(1).y() + ")");
                e.printFaceOrientation();
            }
        };
        /**
         *
         * Check the orientation of the faces in the edgelist
         */
        Voronoi.prototype.checkFaceOrientation = function () {
            console.info("Edge Face Orientation Check: ");
            var size = this.d_edge.size();
            for (var ii = 0; ii < size; ii++) {
                var e = this.d_edge.get(ii);
                if (!e.checkFaceOrientation()) {
                    console.info("** ERROR ** Face orientation wrong for Edge " + ii);
                }
            }
        };
        /**
         *
         * Check the convexity (each face in the hull should form a non-negative
         * volume with each vertex of the hull
         */
        Voronoi.prototype.checkConvexity = function () {
            var nofFaces = this.d_face.size();
            var nofEdges = this.d_edge.size();
            var nofVertices = this.d_vertex.size();
            console.info("Convexity Check : (F,E,V) = " + nofFaces + "," + nofEdges + "," + nofVertices);
            if (nofFaces !== 2 * nofVertices - 4) {
                console.info("** ERROR ** F = 2V-4 not satisfied");
            }
            if (2 * nofEdges !== 3 * nofVertices) {
                console.info("** ERROR ** 2E = 3V not satisfied");
            }
            for (var ii = 0; ii < nofFaces; ii++) {
                var f = this.d_face.get(ii);
                for (var jj = 0; jj < nofVertices; jj++) {
                    var v = this.d_vertex.get(jj);
                    if (v.isMarked()) {
                        var vol = this.volume6(f, v);
                        if (vol < 0) {
                            console.info("** ERROR ** Volume between face " + ii + " and vertex " + jj + " is " + vol);
                        }
                    }
                }
            }
        };
        return Voronoi;
    }());
    Voronoi.ONHULL = true;
    Voronoi.REMOVED = true;
    Voronoi.VISIBLE = true;
    Voronoi.PROCESSED = true;
    vaango_ui.Voronoi = Voronoi;
    (function (Voronoi) {
        var Vertex = (function () {
            function Vertex(__parent, x, y, z) {
                var _this = this;
                if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (function () {
                        _this.d_v = new Array(3);
                        _this.d_v[0] = x;
                        _this.d_v[1] = y;
                        _this.d_v[2] = z;
                        _this.d_duplicate = null;
                        _this.d_onHull = !Voronoi.ONHULL;
                        _this.d_mark = !Voronoi.PROCESSED;
                    })();
                }
                else if (((x != null && x instanceof vaango_ui.Voronoi.Vertex) || x === null) && y === undefined && z === undefined) {
                    var v = x;
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (function () {
                        _this.d_v = new Array(3);
                        _this.d_v[0] = _this.v(0);
                        _this.d_v[1] = _this.v(1);
                        _this.d_v[2] = _this.v(2);
                        _this.d_duplicate = null;
                        _this.d_onHull = !Voronoi.ONHULL;
                        _this.d_mark = !Voronoi.PROCESSED;
                    })();
                }
                else if (((x != null && x instanceof vaango_ui.Point) || x === null) && y === undefined && z === undefined) {
                    var pt = x;
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (function () {
                        _this.d_v = new Array(3);
                        _this.d_v[0] = _this.mapToInt(pt.getX());
                        _this.d_v[1] = _this.mapToInt(pt.getY());
                        _this.d_v[2] = _this.mapToInt(pt.getX() * pt.getX() + pt.getY() * pt.getY());
                        _this.d_duplicate = null;
                        _this.d_onHull = !Voronoi.ONHULL;
                        _this.d_mark = !Voronoi.PROCESSED;
                    })();
                }
                else if (x === undefined && y === undefined && z === undefined) {
                    this.__parent = __parent;
                    this.d_onHull = false;
                    this.d_mark = false;
                    (function () {
                        _this.d_v = new Array(3);
                        _this.d_v[0] = 0;
                        _this.d_v[1] = 0;
                        _this.d_v[2] = 0;
                        _this.d_duplicate = null;
                        _this.d_onHull = !Voronoi.ONHULL;
                        _this.d_mark = !Voronoi.PROCESSED;
                    })();
                }
                else
                    throw new Error('invalid overload');
            }
            Vertex.prototype.v = function (index) {
                return this.d_v[index];
            };
            Vertex.prototype.x = function () {
                return this.mapToDouble(this.d_v[0]);
            };
            Vertex.prototype.y = function () {
                return this.mapToDouble(this.d_v[1]);
            };
            Vertex.prototype.z = function () {
                return this.mapToDouble(this.d_v[2]);
            };
            Vertex.prototype.set = function (pt) {
                var _this = this;
                if (((pt != null && pt instanceof vaango_ui.Point) || pt === null)) {
                    return (function () {
                        _this.d_v[0] = _this.mapToInt(pt.getX());
                        _this.d_v[1] = _this.mapToInt(pt.getY());
                        _this.d_v[2] = _this.mapToInt(pt.getX() * pt.getX() + pt.getY() * pt.getY());
                    })();
                }
                else if (((pt != null && pt instanceof vaango_ui.Voronoi.Vertex) || pt === null)) {
                    return this.set$vaango_ui_Voronoi_Vertex(pt);
                }
                else
                    throw new Error('invalid overload');
            };
            Vertex.prototype.set$vaango_ui_Voronoi_Vertex = function (v) {
                this.d_v[0] = this.v(0);
                this.d_v[1] = this.v(1);
                this.d_v[2] = this.v(2);
            };
            Vertex.prototype.onHull$ = function () {
                return this.d_onHull;
            };
            Vertex.prototype.onHull = function (flag) {
                var _this = this;
                if (((typeof flag === 'boolean') || flag === null)) {
                    return (function () {
                        _this.d_onHull = flag;
                    })();
                }
                else if (flag === undefined) {
                    return this.onHull$();
                }
                else
                    throw new Error('invalid overload');
            };
            Vertex.prototype.isMarked = function () {
                return this.d_mark;
            };
            Vertex.prototype.mark = function (flag) {
                this.d_mark = flag;
            };
            Vertex.prototype.duplicate$ = function () {
                return this.d_duplicate;
            };
            Vertex.prototype.duplicate = function (e) {
                var _this = this;
                if (((e != null && e instanceof vaango_ui.Voronoi.Edge) || e === null)) {
                    return (function () {
                        _this.d_duplicate = e;
                    })();
                }
                else if (e === undefined) {
                    return this.duplicate$();
                }
                else
                    throw new Error('invalid overload');
            };
            Vertex.prototype.mapToInt = function (val) {
                var max = 10000.0;
                return (Math.round((val * max)));
            };
            Vertex.prototype.mapToDouble = function (val) {
                var max = 10000.0;
                return (val / max);
            };
            Vertex.prototype.printVertex = function () {
                console.info("(" + this.x() + "," + this.y() + "," + this.z() + ") Onhull = " + this.d_onHull + " Marked = " + this.d_mark + " Duplic = " + this.d_duplicate);
            };
            return Vertex;
        }());
        Voronoi.Vertex = Vertex;
        var Edge = (function () {
            function Edge(__parent, start, end, left, right) {
                var _this = this;
                if (((start != null && start instanceof vaango_ui.Voronoi.Vertex) || start === null) && ((end != null && end instanceof vaango_ui.Voronoi.Vertex) || end === null) && ((left != null && left instanceof vaango_ui.Voronoi.Face) || left === null) && ((right != null && right instanceof vaango_ui.Voronoi.Face) || right === null)) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (function () {
                        _this.d_endPts = new Array(2);
                        _this.d_adjFace = new Array(2);
                        _this.d_endPts[0] = start;
                        _this.d_endPts[1] = end;
                        _this.d_adjFace[0] = left;
                        _this.d_adjFace[1] = right;
                        _this.d_newFace = null;
                        _this.d_delete = !Voronoi.REMOVED;
                    })();
                }
                else if (((start != null && start instanceof vaango_ui.Voronoi.Vertex) || start === null) && ((end != null && end instanceof vaango_ui.Voronoi.Vertex) || end === null) && left === undefined && right === undefined) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (function () {
                        _this.d_endPts = new Array(2);
                        _this.d_adjFace = new Array(2);
                        _this.d_endPts[0] = start;
                        _this.d_endPts[1] = end;
                        _this.d_adjFace[0] = null;
                        _this.d_adjFace[1] = null;
                        _this.d_newFace = null;
                        _this.d_delete = !Voronoi.REMOVED;
                    })();
                }
                else if (((start != null && start instanceof vaango_ui.Voronoi.Edge) || start === null) && end === undefined && left === undefined && right === undefined) {
                    var e = start;
                    this.__parent = __parent;
                    this.d_delete = false;
                    (function () {
                        _this.d_endPts = new Array(2);
                        _this.d_adjFace = new Array(2);
                        _this.d_endPts[0] = e.d_endPts[0];
                        _this.d_endPts[1] = e.d_endPts[1];
                        _this.d_adjFace[0] = e.d_adjFace[0];
                        _this.d_adjFace[1] = e.d_adjFace[1];
                        _this.d_newFace = e.d_newFace;
                        _this.d_delete = e.d_delete;
                    })();
                }
                else if (start === undefined && end === undefined && left === undefined && right === undefined) {
                    this.__parent = __parent;
                    this.d_delete = false;
                    (function () {
                        _this.d_endPts = new Array(2);
                        _this.d_adjFace = new Array(2);
                        _this.d_endPts[0] = null;
                        _this.d_endPts[1] = null;
                        _this.d_adjFace[0] = null;
                        _this.d_adjFace[1] = null;
                        _this.d_newFace = null;
                        _this.d_delete = !Voronoi.REMOVED;
                    })();
                }
                else
                    throw new Error('invalid overload');
            }
            Edge.prototype.endPt$int = function (index) {
                return this.d_endPts[index];
            };
            Edge.prototype.endPt = function (index, v) {
                var _this = this;
                if (((typeof index === 'number') || index === null) && ((v != null && v instanceof vaango_ui.Voronoi.Vertex) || v === null)) {
                    return (function () {
                        _this.d_endPts[index] = v;
                    })();
                }
                else if (((typeof index === 'number') || index === null) && v === undefined) {
                    return this.endPt$int(index);
                }
                else
                    throw new Error('invalid overload');
            };
            Edge.prototype.adjFace$int = function (index) {
                return this.d_adjFace[index];
            };
            Edge.prototype.adjFace = function (index, f) {
                var _this = this;
                if (((typeof index === 'number') || index === null) && ((f != null && f instanceof vaango_ui.Voronoi.Face) || f === null)) {
                    return (function () {
                        _this.d_adjFace[index] = f;
                    })();
                }
                else if (((typeof index === 'number') || index === null) && f === undefined) {
                    return this.adjFace$int(index);
                }
                else
                    throw new Error('invalid overload');
            };
            Edge.prototype.newFace$ = function () {
                return this.d_newFace;
            };
            Edge.prototype.newFace = function (f) {
                var _this = this;
                if (((f != null && f instanceof vaango_ui.Voronoi.Face) || f === null)) {
                    return (function () {
                        _this.d_newFace = f;
                    })();
                }
                else if (f === undefined) {
                    return this.newFace$();
                }
                else
                    throw new Error('invalid overload');
            };
            Edge.prototype.delete$ = function () {
                return this.d_delete;
            };
            Edge.prototype.delete = function (flag) {
                var _this = this;
                if (((typeof flag === 'boolean') || flag === null)) {
                    return (function () {
                        _this.d_delete = flag;
                    })();
                }
                else if (flag === undefined) {
                    return this.delete$();
                }
                else
                    throw new Error('invalid overload');
            };
            Edge.prototype.printEdge = function () {
                console.info("v1 = " + this.endPt(0) + " v2 = " + this.endPt(1) + " f1 = " + this.adjFace(0) + " f2 = " + this.adjFace(1) + " newFace = " + this.d_newFace + " delete = " + this.d_delete);
            };
            Edge.prototype.printFaceOrientation = function () {
                java.lang.System.out.print("Face 1 :");
                for (var ii = 0; ii < 3; ii++) {
                    if (this === this.adjFace(0).edge(ii)) {
                        java.lang.System.out.print(" Edge :" + ii);
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(0).x() + "," + this.adjFace(0).vertex(0).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(1).x() + "," + this.adjFace(0).vertex(1).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(0).vertex(2).x() + "," + this.adjFace(0).vertex(2).y() + ");");
                        console.info(" ");
                    }
                }
                java.lang.System.out.print("Face 2 :");
                for (var ii = 0; ii < 3; ii++) {
                    if (this === this.adjFace(1).edge(ii)) {
                        java.lang.System.out.print(" Edge :" + ii);
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(0).x() + "," + this.adjFace(1).vertex(0).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(1).x() + "," + this.adjFace(1).vertex(1).y() + ");");
                        java.lang.System.out.print(" (" + this.adjFace(1).vertex(2).x() + "," + this.adjFace(1).vertex(2).y() + ");");
                        console.info(" ");
                    }
                }
            };
            Edge.prototype.checkFaceOrientation = function () {
                var v1 = null;
                var v2 = null;
                var v3 = null;
                var v4 = null;
                for (var ii = 0; ii < 3; ii++) {
                    if (this.adjFace(0).edge(ii) === this) {
                        v1 = this.adjFace(0).vertex(ii);
                        v2 = this.adjFace(0).vertex((ii + 1) % 3);
                    }
                    if (this.adjFace(1).edge(ii) === this) {
                        v3 = this.adjFace(1).vertex(ii);
                        v4 = this.adjFace(1).vertex((ii + 1) % 3);
                    }
                }
                if (v1 === v4 && v2 === v3)
                    return true;
                return false;
            };
            return Edge;
        }());
        Voronoi.Edge = Edge;
        var Face = (function () {
            function Face(__parent, v1, v2, v3, e12, e23, e31) {
                var _this = this;
                if (((v1 != null && v1 instanceof vaango_ui.Voronoi.Vertex) || v1 === null) && ((v2 != null && v2 instanceof vaango_ui.Voronoi.Vertex) || v2 === null) && ((v3 != null && v3 instanceof vaango_ui.Voronoi.Vertex) || v3 === null) && ((e12 != null && e12 instanceof vaango_ui.Voronoi.Edge) || e12 === null) && ((e23 != null && e23 instanceof vaango_ui.Voronoi.Edge) || e23 === null) && ((e31 != null && e31 instanceof vaango_ui.Voronoi.Edge) || e31 === null)) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (function () {
                        _this.d_vertex = new Array(3);
                        _this.d_edge = new Array(3);
                        _this.d_vertex[0] = v1;
                        _this.d_vertex[1] = v2;
                        _this.d_vertex[2] = v3;
                        _this.d_edge[0] = e12;
                        _this.d_edge[1] = e23;
                        _this.d_edge[2] = e31;
                        _this.d_visible = false;
                    })();
                }
                else if (((v1 != null && v1 instanceof vaango_ui.Voronoi.Vertex) || v1 === null) && ((v2 != null && v2 instanceof vaango_ui.Voronoi.Vertex) || v2 === null) && ((v3 != null && v3 instanceof vaango_ui.Voronoi.Vertex) || v3 === null) && e12 === undefined && e23 === undefined && e31 === undefined) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (function () {
                        _this.d_vertex = new Array(3);
                        _this.d_edge = new Array(3);
                        _this.d_vertex[0] = v1;
                        _this.d_vertex[1] = v2;
                        _this.d_vertex[2] = v3;
                        _this.d_edge[0] = null;
                        _this.d_edge[1] = null;
                        _this.d_edge[2] = null;
                        _this.d_visible = false;
                    })();
                }
                else if (((v1 != null && v1 instanceof vaango_ui.Voronoi.Face) || v1 === null) && v2 === undefined && v3 === undefined && e12 === undefined && e23 === undefined && e31 === undefined) {
                    var f = v1;
                    this.__parent = __parent;
                    this.d_visible = false;
                    (function () {
                        _this.d_vertex = new Array(3);
                        _this.d_edge = new Array(3);
                        _this.d_vertex[0] = f.d_vertex[0];
                        _this.d_vertex[1] = f.d_vertex[1];
                        _this.d_vertex[2] = f.d_vertex[2];
                        _this.d_edge[0] = f.d_edge[0];
                        _this.d_edge[1] = f.d_edge[1];
                        _this.d_edge[2] = f.d_edge[2];
                        _this.d_visible = f.d_visible;
                    })();
                }
                else if (v1 === undefined && v2 === undefined && v3 === undefined && e12 === undefined && e23 === undefined && e31 === undefined) {
                    this.__parent = __parent;
                    this.d_visible = false;
                    (function () {
                        _this.d_vertex = new Array(3);
                        _this.d_edge = new Array(3);
                        _this.d_vertex[0] = null;
                        _this.d_vertex[1] = null;
                        _this.d_vertex[2] = null;
                        _this.d_edge[0] = null;
                        _this.d_edge[1] = null;
                        _this.d_edge[2] = null;
                        _this.d_visible = false;
                    })();
                }
                else
                    throw new Error('invalid overload');
            }
            Face.prototype.vertex$int = function (index) {
                return this.d_vertex[index];
            };
            Face.prototype.vertex = function (index, v) {
                var _this = this;
                if (((typeof index === 'number') || index === null) && ((v != null && v instanceof vaango_ui.Voronoi.Vertex) || v === null)) {
                    return (function () {
                        _this.d_vertex[index] = v;
                    })();
                }
                else if (((typeof index === 'number') || index === null) && v === undefined) {
                    return this.vertex$int(index);
                }
                else
                    throw new Error('invalid overload');
            };
            Face.prototype.edge$int = function (index) {
                return this.d_edge[index];
            };
            Face.prototype.edge = function (index, e) {
                var _this = this;
                if (((typeof index === 'number') || index === null) && ((e != null && e instanceof vaango_ui.Voronoi.Edge) || e === null)) {
                    return (function () {
                        _this.d_edge[index] = e;
                    })();
                }
                else if (((typeof index === 'number') || index === null) && e === undefined) {
                    return this.edge$int(index);
                }
                else
                    throw new Error('invalid overload');
            };
            Face.prototype.visible$ = function () {
                return this.d_visible;
            };
            Face.prototype.visible = function (flag) {
                var _this = this;
                if (((typeof flag === 'boolean') || flag === null)) {
                    return (function () {
                        _this.d_visible = flag;
                    })();
                }
                else if (flag === undefined) {
                    return this.visible$();
                }
                else
                    throw new Error('invalid overload');
            };
            /**
             * Find if the face is a "top" face, i.e., if the outward pointing normal
             * to the face points upward (has a +ve dot product with the z-axis vector)
             */
            Face.prototype.topFace = function () {
                var ax = this.d_vertex[0].v(0);
                var ay = this.d_vertex[0].v(1);
                var bx = this.d_vertex[1].v(0);
                var by = this.d_vertex[1].v(1);
                var cx = this.d_vertex[2].v(0);
                var cy = this.d_vertex[2].v(1);
                var A0 = bx - ax;
                var A1 = by - ay;
                var B0 = cx - ax;
                var B1 = cy - ay;
                var AxB_k = A0 * B1 - A1 * B0;
                var AxBdotZ = AxB_k;
                if (AxBdotZ > 0)
                    return true;
                return false;
            };
            /**
             * Calculate the location of the Voronoi vertex for this face
             * (the center of the circumcircle)
             */
            Face.prototype.getVoronoiVertex = function () {
                var a0 = this.d_vertex[0].v(0);
                var a1 = this.d_vertex[0].v(1);
                var b0 = this.d_vertex[1].v(0);
                var b1 = this.d_vertex[1].v(1);
                var c0 = this.d_vertex[2].v(0);
                var c1 = this.d_vertex[2].v(1);
                var D = 2 * (a1 * c0 + b1 * a0 - b1 * c0 - a1 * b0 - c1 * a0 + c1 * b0);
                var v = null;
                if (D !== 0) {
                    var p0 = Math.round((b1 * a0 * a0 - c1 * a0 * a0 - b1 * b1 * a1 + c1 * c1 * a1 + b0 * b0 * c1 + a1 * a1 * b1 + c0 * c0 * a1 - c1 * c1 * b1 - c0 * c0 * b1 - b0 * b0 * a1 + b1 * b1 * c1 - a1 * a1 * c1) / D);
                    var p1 = Math.round((a0 * a0 * c0 + a1 * a1 * c0 + b0 * b0 * a0 - b0 * b0 * c0 + b1 * b1 * a0 - b1 * b1 * c0 - a0 * a0 * b0 - a1 * a1 * b0 - c0 * c0 * a0 + c0 * c0 * b0 - c1 * c1 * a0 + c1 * c1 * b0) / D);
                    v = new Voronoi.Vertex(this.__parent, p0, p1, 0);
                }
                else {
                    v = new Voronoi.Vertex(this.__parent, 0, 0, 0);
                }
                return v;
            };
            Face.prototype.printFace = function () {
                console.info("v1 = " + this.vertex(0) + " v2 = " + this.vertex(1) + " v3 = " + this.vertex(2) + " e1 = " + this.edge(0) + " e2 = " + this.edge(1) + " e3 = " + this.edge(2) + " visible = " + this.d_visible);
            };
            return Face;
        }());
        Voronoi.Face = Face;
    })(Voronoi = vaango_ui.Voronoi || (vaango_ui.Voronoi = {}));
})(vaango_ui || (vaango_ui = {}));
