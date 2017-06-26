"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Vector3D = (function () {
        function Vector3D(x, y, z) {
            var _this = this;
            this.d_x = 0.0;
            this.d_y = 0.0;
            this.d_z = 0.0;
            if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                (function () {
                    _this.d_x = x;
                    _this.d_y = y;
                    _this.d_z = z;
                })();
            }
            else if (((x != null && x instanceof vaango_ui.Vector3D) || x === null) && y === undefined && z === undefined) {
                var vec = x;
                (function () {
                    _this.d_x = vec.d_x;
                    _this.d_y = vec.d_y;
                    _this.d_z = vec.d_z;
                })();
            }
            else if (x === undefined && y === undefined && z === undefined) {
                (function () {
                    _this.d_x = 0.0;
                    _this.d_y = 0.0;
                    _this.d_z = 0.0;
                })();
            }
            else
                throw new Error('invalid overload');
        }
        Vector3D.prototype.x$ = function () {
            return this.d_x;
        };
        Vector3D.prototype.y$ = function () {
            return this.d_y;
        };
        Vector3D.prototype.z$ = function () {
            return this.d_z;
        };
        Vector3D.prototype.x = function (val) {
            var _this = this;
            if (((typeof val === 'number') || val === null)) {
                return (function () {
                    _this.d_x = val;
                })();
            }
            else if (val === undefined) {
                return this.x$();
            }
            else
                throw new Error('invalid overload');
        };
        Vector3D.prototype.y = function (val) {
            var _this = this;
            if (((typeof val === 'number') || val === null)) {
                return (function () {
                    _this.d_y = val;
                })();
            }
            else if (val === undefined) {
                return this.y$();
            }
            else
                throw new Error('invalid overload');
        };
        Vector3D.prototype.z = function (val) {
            var _this = this;
            if (((typeof val === 'number') || val === null)) {
                return (function () {
                    _this.d_z = val;
                })();
            }
            else if (val === undefined) {
                return this.z$();
            }
            else
                throw new Error('invalid overload');
        };
        Vector3D.prototype.set$vaango_ui_Vector3D = function (vec) {
            this.d_x = vec.d_x;
            this.d_y = vec.d_y;
            this.d_z = vec.d_z;
        };
        Vector3D.prototype.set = function (x, y, z) {
            var _this = this;
            if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                return (function () {
                    _this.d_x = x;
                    _this.d_y = y;
                    _this.d_z = z;
                })();
            }
            else if (((x != null && x instanceof vaango_ui.Vector3D) || x === null) && y === undefined && z === undefined) {
                return this.set$vaango_ui_Vector3D(x);
            }
            else
                throw new Error('invalid overload');
        };
        Vector3D.prototype.add = function (vec) {
            this.d_x += vec.d_x;
            this.d_y += vec.d_y;
            this.d_z += vec.d_z;
        };
        Vector3D.prototype.norm = function () {
            return (Math.sqrt(this.d_x * this.d_x + this.d_y * this.d_y + this.d_z * this.d_z));
        };
        Vector3D.prototype.dot = function (vec) {
            return (this.d_x * vec.d_x + this.d_y * vec.d_y + this.d_z * vec.d_z);
        };
        Vector3D.prototype.print = function (pw) {
            var _this = this;
            if (((pw != null && pw instanceof java.io.PrintWriter) || pw === null)) {
                return (function () {
                    pw.print("[" + _this.d_x + ", " + _this.d_y + ", " + _this.d_z + "]");
                })();
            }
            else if (pw === undefined) {
                return this.print$();
            }
            else
                throw new Error('invalid overload');
        };
        Vector3D.prototype.print$ = function () {
            java.lang.System.out.print("[" + this.d_x + ", " + this.d_y + ", " + this.d_z + "]");
        };
        return Vector3D;
    }());
    vaango_ui.Vector3D = Vector3D;
})(vaango_ui || (vaango_ui = {}));
