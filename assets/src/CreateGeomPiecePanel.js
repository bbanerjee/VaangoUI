"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var vaango_ui;
(function (vaango_ui) {
    var CreateGeomPiecePanel = (function (_super) {
        __extends(CreateGeomPiecePanel, _super);
        function CreateGeomPiecePanel(usePartList, partList, geomPiece, parent) {
            var _this = _super.call(this) || this;
            _this.d_parent = null;
            _this.d_geomPiece = null;
            _this.d_partList = null;
            _this.d_partGeomPieceExists = false;
            _this.addButton = null;
            _this.delButton = null;
            _this.geomPieceTabPane = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_geomPiece = geomPiece;
            _this.d_partList = partList;
            _this.d_partGeomPieceExists = false;
            _this.d_parent = parent;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var panel = new JPanel(new GridLayout(1, 0));
            _this.addButton = new JButton("Create Geom Piece");
            _this.addButton.setActionCommand("add");
            _this.addButton.addActionListener(_this);
            panel.add(_this.addButton);
            _this.delButton = new JButton("Delete Geom Piece");
            _this.delButton.setActionCommand("del");
            _this.delButton.addActionListener(_this);
            panel.add(_this.delButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            _this.add(panel);
            _this.geomPieceTabPane = new JTabbedPane();
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.geomPieceTabPane, gbc);
            _this.add(_this.geomPieceTabPane);
            return _this;
        }
        CreateGeomPiecePanel.prototype.actionPerformed = function (e) {
            if (e.getActionCommand() === "add") {
                var tabName = new String("Object ");
                var geomPiecePanel = new vaango_ui.GeomPiecePanel(this);
                this.geomPieceTabPane.addTab(tabName, geomPiecePanel);
                this.validate();
                this.updatePanels();
            }
            else if (e.getActionCommand() === "del") {
                var index = this.geomPieceTabPane.getSelectedIndex();
                this.geomPieceTabPane.removeTabAt(index);
                this.validate();
                this.updatePanels();
            }
        };
        CreateGeomPiecePanel.prototype.addGeomPiece = function (piece) {
            this.d_geomPiece.addElement(piece);
        };
        CreateGeomPiecePanel.prototype.deleteGeomPieceAt = function (index) {
            this.d_geomPiece.removeElementAt(index);
        };
        CreateGeomPiecePanel.prototype.updatePanels = function () {
            this.d_parent.updatePanels();
        };
        CreateGeomPiecePanel.prototype.createPartListGeomPiece = function (simComponent) {
            if (this.d_partList == null)
                return;
            var numPart = this.d_partList.size();
            if (!(numPart > 0))
                return;
            if (this.d_partGeomPieceExists)
                return;
            var partThick = this.d_partList.getParticle(0).getThickness();
            if (partThick > 0.0) {
                this.createHollowPartListGeomPiece(simComponent);
            }
            else {
                this.createSolidPartListGeomPiece(simComponent);
            }
            this.d_partGeomPieceExists = true;
        };
        CreateGeomPiecePanel.prototype.deletePartListGeomPiece = function () {
            if (this.d_partList == null)
                return;
            var numPart = this.d_partList.size();
            if (!(numPart > 0))
                return;
            if (this.d_partGeomPieceExists) {
                this.d_geomPiece.removeAllElements();
                this.d_partGeomPieceExists = false;
            }
        };
        CreateGeomPiecePanel.prototype.createSolidPartListGeomPiece = function (simComponent) {
            var partType = this.d_partList.getParticle(0).getType();
            if (partType === vaango_ui.Particle.CIRCLE) {
                this.createSolidCylinderGeomPiece();
            }
            else if (partType === vaango_ui.Particle.SPHERE) {
                this.createSolidSphereGeomPiece();
            }
            else {
                console.info("Unknown solid particle type in particle list. No geometry pieces created.");
            }
        };
        CreateGeomPiecePanel.prototype.createHollowPartListGeomPiece = function (simComponent) {
            var partType = this.d_partList.getParticle(0).getType();
            if (partType === vaango_ui.Particle.CIRCLE) {
                this.createHollowCylinderGeomPiece();
            }
            else if (partType === vaango_ui.Particle.SPHERE) {
                this.createHollowSphereGeomPiece();
            }
            else {
                console.info("Unknown hollow particle type in particle list. No geometry pieces created.");
            }
        };
        CreateGeomPiecePanel.prototype.createSolidCylinderGeomPiece = function () {
            var numPart = this.d_partList.size();
            var rveSize = this.d_partList.getRVESize();
            var minRad = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing = minRad / 10.0;
            var union = new vaango_ui.UnionGeomPiece("all_particles");
            for (var ii = 0; ii < numPart; ++ii) {
                var part = this.d_partList.getParticle(ii);
                var center = part.getCenter();
                var radius = part.getRadius();
                var length = part.getLength();
                if (length === 0.0) {
                    length = 0.05 * rveSize;
                }
                var thickness = radius;
                var numRadial = (Math.ceil(radius / pointSpacing) | 0);
                var numAxial = (Math.ceil(length / pointSpacing) | 0);
                var arcPoints = this.calcArcPoints(center, radius, rveSize);
                var arcStart = arcPoints[0];
                var arcAngle = arcPoints[1];
                var name = new String("solid_cylinder_" + new String(ii).toString());
                var piece = new vaango_ui.SmoothCylGeomPiece(name, center, radius, thickness, length, numRadial, numAxial, arcStart, arcAngle);
                this.d_geomPiece.addElement(piece);
                var solidName = new String("outer_cylinder_" + new String(ii).toString());
                var cylPiece = new vaango_ui.CylinderGeomPiece(solidName, center, radius, length);
                union.addGeomPiece(cylPiece);
            }
            var min = new vaango_ui.Point(0.0, 0.0, 0.0);
            var max = new vaango_ui.Point(rveSize, rveSize, rveSize);
            var box = new vaango_ui.BoxGeomPiece("domain", min, max);
            var diff = new vaango_ui.DifferenceGeomPiece("rest_of_domain", box, union);
            this.d_geomPiece.addElement(diff);
        };
        CreateGeomPiecePanel.prototype.createSolidSphereGeomPiece = function () {
            var numPart = this.d_partList.size();
            var rveSize = this.d_partList.getRVESize();
            var minRad = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing = minRad / 10.0;
            var union = new vaango_ui.UnionGeomPiece("all_particles");
            for (var ii = 0; ii < numPart; ++ii) {
                var part = this.d_partList.getParticle(ii);
                var center = part.getCenter();
                var outer_radius = part.getRadius();
                var inner_radius = 0.0;
                var numRadial = (Math.ceil(outer_radius / pointSpacing) | 0);
                var name = new String("solid_sphere_" + new String(ii).toString());
                var piece = new vaango_ui.SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, numRadial);
                this.d_geomPiece.addElement(piece);
                var solidName = new String("outer_sphere_" + new String(ii).toString());
                var sphPiece = new vaango_ui.SphereGeomPiece(solidName, center, outer_radius);
                union.addGeomPiece(sphPiece);
            }
            var min = new vaango_ui.Point(0.0, 0.0, 0.0);
            var max = new vaango_ui.Point(rveSize, rveSize, rveSize);
            var box = new vaango_ui.BoxGeomPiece("domain", min, max);
            var diff = new vaango_ui.DifferenceGeomPiece("rest_of_domain", box, union);
            this.d_geomPiece.addElement(diff);
        };
        CreateGeomPiecePanel.prototype.createHollowCylinderGeomPiece = function () {
            var numPart = this.d_partList.size();
            var rveSize = this.d_partList.getRVESize();
            var minRad = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing = minRad / 10.0;
            var unionOuter = new vaango_ui.UnionGeomPiece("all_particles");
            var unionInner = new vaango_ui.UnionGeomPiece("all_inside");
            for (var ii = 0; ii < numPart; ++ii) {
                var part = this.d_partList.getParticle(ii);
                var center = part.getCenter();
                var radius = part.getRadius();
                var length = part.getLength();
                if (length === 0.0) {
                    length = 0.05 * rveSize;
                }
                var thickness = part.getThickness();
                var numRadial = (Math.ceil(radius / pointSpacing) | 0);
                var numAxial = (Math.ceil(length / pointSpacing) | 0);
                var arcPoints = this.calcArcPoints(center, radius, rveSize);
                var arcStart = arcPoints[0];
                var arcAngle = arcPoints[1];
                var name = new String("hollow_cylinder_" + new String(ii).toString());
                var piece = new vaango_ui.SmoothCylGeomPiece(name, center, radius, thickness, length, numRadial, numAxial, arcStart, arcAngle);
                this.d_geomPiece.addElement(piece);
                var solidName = new String("outer_cylinder_" + new String(ii).toString());
                var cylPieceSolid = new vaango_ui.CylinderGeomPiece(solidName, center, radius, length);
                unionOuter.addGeomPiece(cylPieceSolid);
                var hollowName = new String("inner_cylinder_" + new String(ii).toString());
                var cylPieceHollow = new vaango_ui.CylinderGeomPiece(hollowName, center, radius - thickness, length);
                unionInner.addGeomPiece(cylPieceHollow);
            }
            var min = new vaango_ui.Point(0.0, 0.0, 0.0);
            var max = new vaango_ui.Point(rveSize, rveSize, rveSize);
            var box = new vaango_ui.BoxGeomPiece("domain", min, max);
            var diff = new vaango_ui.DifferenceGeomPiece("rest_of_domain", box, unionOuter);
            this.d_geomPiece.addElement(diff);
            this.d_geomPiece.addElement(unionInner);
        };
        CreateGeomPiecePanel.prototype.createHollowSphereGeomPiece = function () {
            var numPart = this.d_partList.size();
            var rveSize = this.d_partList.getRVESize();
            var minRad = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing = minRad / 7.0;
            var unionOuter = new vaango_ui.UnionGeomPiece("all_particles");
            var unionInner = new vaango_ui.UnionGeomPiece("all_inside");
            for (var ii = 0; ii < numPart; ++ii) {
                var part = this.d_partList.getParticle(ii);
                var center = part.getCenter();
                var outer_radius = part.getRadius();
                var thickness = part.getThickness();
                var inner_radius = outer_radius - thickness;
                var numRadial = Math.max(2, (Math.ceil(thickness / pointSpacing) | 0));
                var name = new String("hollow_sphere_" + new String(ii).toString());
                var piece = new vaango_ui.SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, numRadial);
                this.d_geomPiece.addElement(piece);
                var solidName = new String("outer_sphere_" + new String(ii).toString());
                var sphPieceSolid = new vaango_ui.SphereGeomPiece(solidName, center, outer_radius);
                unionOuter.addGeomPiece(sphPieceSolid);
                var hollowName = new String("inner_sphere_" + new String(ii).toString());
                var sphPieceHollow = new vaango_ui.SphereGeomPiece(hollowName, center, inner_radius);
                unionInner.addGeomPiece(sphPieceHollow);
            }
            var min = new vaango_ui.Point(0.0, 0.0, 0.0);
            var max = new vaango_ui.Point(rveSize, rveSize, rveSize);
            var box = new vaango_ui.BoxGeomPiece("domain", min, max);
            var diff = new vaango_ui.DifferenceGeomPiece("rest_of_domain", box, unionOuter);
            this.d_geomPiece.addElement(diff);
            this.d_geomPiece.addElement(unionInner);
        };
        CreateGeomPiecePanel.prototype.calcArcPoints = function (center, radius, rveSize) {
            var arcPoints = new Array(2);
            arcPoints[0] = 0.0;
            arcPoints[1] = 360.0;
            if (this.intersectsRVE(center, radius, rveSize)) {
                var xmin = center.getX();
                var ymin = center.getY();
                var xmax = rveSize - xmin;
                var ymax = rveSize - ymin;
                var facxmin = radius * radius - xmin * xmin;
                var facymin = radius * radius - ymin * ymin;
                var facxmax = radius * radius - xmax * xmax;
                var facymax = radius * radius - ymax * ymax;
                if (facxmin < 0.0 && facymin < 0.0 && facxmax < 0.0 && facymax < 0.0) {
                    return arcPoints;
                }
                var anglexmin = new Array(2);
                var anglexmax = new Array(2);
                var angleymin = new Array(2);
                var angleymax = new Array(2);
                for (var ii = 0; ii < 2; ++ii) {
                    anglexmin[ii] = -1.0;
                    anglexmax[ii] = -1.0;
                    angleymin[ii] = -1.0;
                    angleymax[ii] = -1.0;
                }
                var t = 0.0;
                var xint = 0.0;
                var yint = 0.0;
                var xmincount = 0;
                var xmaxcount = 0;
                var ymincount = 0;
                var ymaxcount = 0;
                if (facxmin >= 0.0) {
                    t = (ymin - Math.sqrt(facxmin)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = 0.0;
                        yint = t * rveSize;
                        anglexmin[xmincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (anglexmin[xmincount] < 0.0)
                            anglexmin[xmincount] += 360.0;
                        ++xmincount;
                    }
                    t = (ymin + Math.sqrt(facxmin)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = 0.0;
                        yint = t * rveSize;
                        anglexmin[xmincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (anglexmin[xmincount] < 0.0)
                            anglexmin[xmincount] += 360.0;
                        ++xmincount;
                    }
                }
                if (facxmax >= 0.0) {
                    t = (ymin - Math.sqrt(facxmax)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = rveSize;
                        yint = t * rveSize;
                        anglexmax[xmaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (anglexmax[xmaxcount] < 0.0)
                            anglexmax[xmaxcount] += 360.0;
                        ++xmaxcount;
                    }
                    t = (ymin + Math.sqrt(facxmax)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = rveSize;
                        yint = t * rveSize;
                        anglexmax[xmaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (anglexmax[xmaxcount] < 0.0)
                            anglexmax[xmaxcount] += 360.0;
                        ++xmaxcount;
                    }
                }
                if (facymin >= 0.0) {
                    t = (xmin - Math.sqrt(facymin)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = 0.0;
                        angleymin[ymincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (angleymin[ymincount] < 0.0)
                            angleymin[ymincount] += 360.0;
                        ++ymincount;
                    }
                    t = (xmin + Math.sqrt(facymin)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = 0.0;
                        angleymin[ymincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (angleymin[ymincount] < 0.0)
                            angleymin[ymincount] += 360.0;
                        ++ymincount;
                    }
                }
                if (facymax >= 0.0) {
                    t = (xmin - Math.sqrt(facymax)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = rveSize;
                        angleymax[ymaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (angleymax[ymaxcount] < 0.0)
                            angleymax[ymaxcount] += 360.0;
                        ++ymaxcount;
                    }
                    t = (xmin + Math.sqrt(facymax)) / rveSize;
                    if (t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = rveSize;
                        angleymax[ymaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if (angleymax[ymaxcount] < 0.0)
                            angleymax[ymaxcount] += 360.0;
                        ++ymaxcount;
                    }
                }
                if (xmincount === 1) {
                    if (ymincount === 1) {
                        arcPoints[0] = angleymin[0];
                        arcPoints[1] = anglexmin[0] - angleymin[0];
                    }
                    else if (ymaxcount === 1) {
                        arcPoints[0] = anglexmin[0];
                        arcPoints[1] = angleymax[0] - anglexmin[0];
                    }
                }
                else if (xmincount === 2) {
                    arcPoints[0] = anglexmin[0];
                    arcPoints[1] = anglexmin[1] + 360.0 - anglexmin[0];
                }
                else if (xmaxcount === 1) {
                    if (ymincount === 1) {
                        arcPoints[0] = anglexmax[0];
                        arcPoints[1] = angleymin[0] - anglexmax[0];
                    }
                    else if (ymaxcount === 1) {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = anglexmax[0] - angleymax[0];
                    }
                }
                else if (xmaxcount === 2) {
                    arcPoints[0] = anglexmax[1];
                    arcPoints[1] = anglexmax[0] - anglexmax[1];
                }
                else if (ymincount === 2) {
                    if (angleymin[0] < angleymin[1]) {
                        arcPoints[0] = angleymin[1];
                        arcPoints[1] = 360.0 + angleymin[0] - angleymin[1];
                    }
                    else {
                        arcPoints[0] = angleymin[1];
                        arcPoints[1] = angleymin[0] - angleymin[1];
                    }
                }
                else if (ymaxcount === 2) {
                    if (angleymax[0] < angleymax[1]) {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = angleymax[1] - angleymax[0];
                    }
                    else {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = 360.0 + angleymax[1] - angleymax[0];
                    }
                }
            }
            return arcPoints;
        };
        CreateGeomPiecePanel.prototype.intersectsRVE = function (center, radius, rveSize) {
            var xcen = center.getX();
            var ycen = center.getY();
            var xminCirc = xcen - radius;
            var xmaxCirc = xcen + radius;
            var yminCirc = ycen - radius;
            var ymaxCirc = ycen + radius;
            if ((xminCirc > 0.0) && (yminCirc > 0.0) && (xmaxCirc < rveSize) && (ymaxCirc < rveSize))
                return false;
            return true;
        };
        return CreateGeomPiecePanel;
    }(JPanel));
    CreateGeomPiecePanel.serialVersionUID = 1621455072995131701;
    vaango_ui.CreateGeomPiecePanel = CreateGeomPiecePanel;
})(vaango_ui || (vaango_ui = {}));
