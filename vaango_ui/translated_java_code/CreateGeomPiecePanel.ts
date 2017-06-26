"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class CreateGeomPiecePanel extends JPanel implements ActionListener {
        private static serialVersionUID : number = 1621455072995131701;

        private d_parent : InputGeometryPanel = null;

        private d_geomPiece : Vector<GeomPiece> = null;

        private d_partList : ParticleList = null;

        private d_partGeomPieceExists : boolean = false;

        private addButton : JButton = null;

        private delButton : JButton = null;

        private geomPieceTabPane : JTabbedPane = null;

        public constructor(usePartList : boolean, partList : ParticleList, geomPiece : Vector<GeomPiece>, parent : InputGeometryPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_geomPiece = geomPiece;
            this.d_partList = partList;
            this.d_partGeomPieceExists = false;
            this.d_parent = parent;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var panel : JPanel = new JPanel(new GridLayout(1, 0));
            this.addButton = new JButton("Create Geom Piece");
            this.addButton.setActionCommand("add");
            this.addButton.addActionListener(this);
            panel.add(this.addButton);
            this.delButton = new JButton("Delete Geom Piece");
            this.delButton.setActionCommand("del");
            this.delButton.addActionListener(this);
            panel.add(this.delButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            this.add(panel);
            this.geomPieceTabPane = new JTabbedPane();
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.geomPieceTabPane, gbc);
            this.add(this.geomPieceTabPane);
        }

        public actionPerformed(e : ActionEvent) {
            if(e.getActionCommand() === "add") {
                var tabName : string = <string>new String("Object ");
                var geomPiecePanel : GeomPiecePanel = new GeomPiecePanel(this);
                this.geomPieceTabPane.addTab(tabName, geomPiecePanel);
                this.validate();
                this.updatePanels();
            } else if(e.getActionCommand() === "del") {
                var index : number = this.geomPieceTabPane.getSelectedIndex();
                this.geomPieceTabPane.removeTabAt(index);
                this.validate();
                this.updatePanels();
            }
        }

        public addGeomPiece(piece : GeomPiece) {
            this.d_geomPiece.addElement(piece);
        }

        public deleteGeomPieceAt(index : number) {
            this.d_geomPiece.removeElementAt(index);
        }

        public updatePanels() {
            this.d_parent.updatePanels();
        }

        public createPartListGeomPiece(simComponent : string) {
            if(this.d_partList == null) return;
            var numPart : number = this.d_partList.size();
            if(!(numPart > 0)) return;
            if(this.d_partGeomPieceExists) return;
            var partThick : number = this.d_partList.getParticle(0).getThickness();
            if(partThick > 0.0) {
                this.createHollowPartListGeomPiece(simComponent);
            } else {
                this.createSolidPartListGeomPiece(simComponent);
            }
            this.d_partGeomPieceExists = true;
        }

        public deletePartListGeomPiece() {
            if(this.d_partList == null) return;
            var numPart : number = this.d_partList.size();
            if(!(numPart > 0)) return;
            if(this.d_partGeomPieceExists) {
                this.d_geomPiece.removeAllElements();
                this.d_partGeomPieceExists = false;
            }
        }

        public createSolidPartListGeomPiece(simComponent : string) {
            var partType : number = this.d_partList.getParticle(0).getType();
            if(partType === Particle.CIRCLE) {
                this.createSolidCylinderGeomPiece();
            } else if(partType === Particle.SPHERE) {
                this.createSolidSphereGeomPiece();
            } else {
                console.info("Unknown solid particle type in particle list. No geometry pieces created.");
            }
        }

        public createHollowPartListGeomPiece(simComponent : string) {
            var partType : number = this.d_partList.getParticle(0).getType();
            if(partType === Particle.CIRCLE) {
                this.createHollowCylinderGeomPiece();
            } else if(partType === Particle.SPHERE) {
                this.createHollowSphereGeomPiece();
            } else {
                console.info("Unknown hollow particle type in particle list. No geometry pieces created.");
            }
        }

        private createSolidCylinderGeomPiece() {
            var numPart : number = this.d_partList.size();
            var rveSize : number = this.d_partList.getRVESize();
            var minRad : number = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing : number = minRad / 10.0;
            var union : UnionGeomPiece = new UnionGeomPiece("all_particles");
            for(var ii : number = 0; ii < numPart; ++ii) {
                var part : Particle = this.d_partList.getParticle(ii);
                var center : Point = part.getCenter();
                var radius : number = part.getRadius();
                var length : number = part.getLength();
                if(length === 0.0) {
                    length = 0.05 * rveSize;
                }
                var thickness : number = radius;
                var numRadial : number = (<number>Math.ceil(radius / pointSpacing)|0);
                var numAxial : number = (<number>Math.ceil(length / pointSpacing)|0);
                var arcPoints : number[] = this.calcArcPoints(center, radius, rveSize);
                var arcStart : number = arcPoints[0];
                var arcAngle : number = arcPoints[1];
                var name : string = <string>new String("solid_cylinder_" + /* valueOf */new String(ii).toString());
                var piece : SmoothCylGeomPiece = new SmoothCylGeomPiece(name, center, radius, thickness, length, numRadial, numAxial, arcStart, arcAngle);
                this.d_geomPiece.addElement(piece);
                var solidName : string = <string>new String("outer_cylinder_" + /* valueOf */new String(ii).toString());
                var cylPiece : CylinderGeomPiece = new CylinderGeomPiece(solidName, center, radius, length);
                union.addGeomPiece(cylPiece);
            }
            var min : Point = new Point(0.0, 0.0, 0.0);
            var max : Point = new Point(rveSize, rveSize, rveSize);
            var box : BoxGeomPiece = new BoxGeomPiece("domain", min, max);
            var diff : DifferenceGeomPiece = new DifferenceGeomPiece("rest_of_domain", box, union);
            this.d_geomPiece.addElement(diff);
        }

        private createSolidSphereGeomPiece() {
            var numPart : number = this.d_partList.size();
            var rveSize : number = this.d_partList.getRVESize();
            var minRad : number = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing : number = minRad / 10.0;
            var union : UnionGeomPiece = new UnionGeomPiece("all_particles");
            for(var ii : number = 0; ii < numPart; ++ii) {
                var part : Particle = this.d_partList.getParticle(ii);
                var center : Point = part.getCenter();
                var outer_radius : number = part.getRadius();
                var inner_radius : number = 0.0;
                var numRadial : number = (<number>Math.ceil(outer_radius / pointSpacing)|0);
                var name : string = <string>new String("solid_sphere_" + /* valueOf */new String(ii).toString());
                var piece : SmoothSphereGeomPiece = new SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, numRadial);
                this.d_geomPiece.addElement(piece);
                var solidName : string = <string>new String("outer_sphere_" + /* valueOf */new String(ii).toString());
                var sphPiece : SphereGeomPiece = new SphereGeomPiece(solidName, center, outer_radius);
                union.addGeomPiece(sphPiece);
            }
            var min : Point = new Point(0.0, 0.0, 0.0);
            var max : Point = new Point(rveSize, rveSize, rveSize);
            var box : BoxGeomPiece = new BoxGeomPiece("domain", min, max);
            var diff : DifferenceGeomPiece = new DifferenceGeomPiece("rest_of_domain", box, union);
            this.d_geomPiece.addElement(diff);
        }

        private createHollowCylinderGeomPiece() {
            var numPart : number = this.d_partList.size();
            var rveSize : number = this.d_partList.getRVESize();
            var minRad : number = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing : number = minRad / 10.0;
            var unionOuter : UnionGeomPiece = new UnionGeomPiece("all_particles");
            var unionInner : UnionGeomPiece = new UnionGeomPiece("all_inside");
            for(var ii : number = 0; ii < numPart; ++ii) {
                var part : Particle = this.d_partList.getParticle(ii);
                var center : Point = part.getCenter();
                var radius : number = part.getRadius();
                var length : number = part.getLength();
                if(length === 0.0) {
                    length = 0.05 * rveSize;
                }
                var thickness : number = part.getThickness();
                var numRadial : number = (<number>Math.ceil(radius / pointSpacing)|0);
                var numAxial : number = (<number>Math.ceil(length / pointSpacing)|0);
                var arcPoints : number[] = this.calcArcPoints(center, radius, rveSize);
                var arcStart : number = arcPoints[0];
                var arcAngle : number = arcPoints[1];
                var name : string = <string>new String("hollow_cylinder_" + /* valueOf */new String(ii).toString());
                var piece : SmoothCylGeomPiece = new SmoothCylGeomPiece(name, center, radius, thickness, length, numRadial, numAxial, arcStart, arcAngle);
                this.d_geomPiece.addElement(piece);
                var solidName : string = <string>new String("outer_cylinder_" + /* valueOf */new String(ii).toString());
                var cylPieceSolid : CylinderGeomPiece = new CylinderGeomPiece(solidName, center, radius, length);
                unionOuter.addGeomPiece(cylPieceSolid);
                var hollowName : string = <string>new String("inner_cylinder_" + /* valueOf */new String(ii).toString());
                var cylPieceHollow : CylinderGeomPiece = new CylinderGeomPiece(hollowName, center, radius - thickness, length);
                unionInner.addGeomPiece(cylPieceHollow);
            }
            var min : Point = new Point(0.0, 0.0, 0.0);
            var max : Point = new Point(rveSize, rveSize, rveSize);
            var box : BoxGeomPiece = new BoxGeomPiece("domain", min, max);
            var diff : DifferenceGeomPiece = new DifferenceGeomPiece("rest_of_domain", box, unionOuter);
            this.d_geomPiece.addElement(diff);
            this.d_geomPiece.addElement(unionInner);
        }

        private createHollowSphereGeomPiece() {
            var numPart : number = this.d_partList.size();
            var rveSize : number = this.d_partList.getRVESize();
            var minRad : number = this.d_partList.getParticle(numPart - 1).getRadius();
            var pointSpacing : number = minRad / 7.0;
            var unionOuter : UnionGeomPiece = new UnionGeomPiece("all_particles");
            var unionInner : UnionGeomPiece = new UnionGeomPiece("all_inside");
            for(var ii : number = 0; ii < numPart; ++ii) {
                var part : Particle = this.d_partList.getParticle(ii);
                var center : Point = part.getCenter();
                var outer_radius : number = part.getRadius();
                var thickness : number = part.getThickness();
                var inner_radius : number = outer_radius - thickness;
                var numRadial : number = Math.max(2, (<number>Math.ceil(thickness / pointSpacing)|0));
                var name : string = <string>new String("hollow_sphere_" + /* valueOf */new String(ii).toString());
                var piece : SmoothSphereGeomPiece = new SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, numRadial);
                this.d_geomPiece.addElement(piece);
                var solidName : string = <string>new String("outer_sphere_" + /* valueOf */new String(ii).toString());
                var sphPieceSolid : SphereGeomPiece = new SphereGeomPiece(solidName, center, outer_radius);
                unionOuter.addGeomPiece(sphPieceSolid);
                var hollowName : string = <string>new String("inner_sphere_" + /* valueOf */new String(ii).toString());
                var sphPieceHollow : SphereGeomPiece = new SphereGeomPiece(hollowName, center, inner_radius);
                unionInner.addGeomPiece(sphPieceHollow);
            }
            var min : Point = new Point(0.0, 0.0, 0.0);
            var max : Point = new Point(rveSize, rveSize, rveSize);
            var box : BoxGeomPiece = new BoxGeomPiece("domain", min, max);
            var diff : DifferenceGeomPiece = new DifferenceGeomPiece("rest_of_domain", box, unionOuter);
            this.d_geomPiece.addElement(diff);
            this.d_geomPiece.addElement(unionInner);
        }

        private calcArcPoints(center : Point, radius : number, rveSize : number) : number[] {
            var arcPoints : number[] = new Array(2);
            arcPoints[0] = 0.0;
            arcPoints[1] = 360.0;
            if(this.intersectsRVE(center, radius, rveSize)) {
                var xmin : number = center.getX();
                var ymin : number = center.getY();
                var xmax : number = rveSize - xmin;
                var ymax : number = rveSize - ymin;
                var facxmin : number = radius * radius - xmin * xmin;
                var facymin : number = radius * radius - ymin * ymin;
                var facxmax : number = radius * radius - xmax * xmax;
                var facymax : number = radius * radius - ymax * ymax;
                if(facxmin < 0.0 && facymin < 0.0 && facxmax < 0.0 && facymax < 0.0) {
                    return arcPoints;
                }
                var anglexmin : number[] = new Array(2);
                var anglexmax : number[] = new Array(2);
                var angleymin : number[] = new Array(2);
                var angleymax : number[] = new Array(2);
                for(var ii : number = 0; ii < 2; ++ii) {
                    anglexmin[ii] = -1.0;
                    anglexmax[ii] = -1.0;
                    angleymin[ii] = -1.0;
                    angleymax[ii] = -1.0;
                }
                var t : number = 0.0;
                var xint : number = 0.0;
                var yint : number = 0.0;
                var xmincount : number = 0;
                var xmaxcount : number = 0;
                var ymincount : number = 0;
                var ymaxcount : number = 0;
                if(facxmin >= 0.0) {
                    t = (ymin - Math.sqrt(facxmin)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = 0.0;
                        yint = t * rveSize;
                        anglexmin[xmincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(anglexmin[xmincount] < 0.0) anglexmin[xmincount] += 360.0;
                        ++xmincount;
                    }
                    t = (ymin + Math.sqrt(facxmin)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = 0.0;
                        yint = t * rveSize;
                        anglexmin[xmincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(anglexmin[xmincount] < 0.0) anglexmin[xmincount] += 360.0;
                        ++xmincount;
                    }
                }
                if(facxmax >= 0.0) {
                    t = (ymin - Math.sqrt(facxmax)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = rveSize;
                        yint = t * rveSize;
                        anglexmax[xmaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(anglexmax[xmaxcount] < 0.0) anglexmax[xmaxcount] += 360.0;
                        ++xmaxcount;
                    }
                    t = (ymin + Math.sqrt(facxmax)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = rveSize;
                        yint = t * rveSize;
                        anglexmax[xmaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(anglexmax[xmaxcount] < 0.0) anglexmax[xmaxcount] += 360.0;
                        ++xmaxcount;
                    }
                }
                if(facymin >= 0.0) {
                    t = (xmin - Math.sqrt(facymin)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = 0.0;
                        angleymin[ymincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(angleymin[ymincount] < 0.0) angleymin[ymincount] += 360.0;
                        ++ymincount;
                    }
                    t = (xmin + Math.sqrt(facymin)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = 0.0;
                        angleymin[ymincount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(angleymin[ymincount] < 0.0) angleymin[ymincount] += 360.0;
                        ++ymincount;
                    }
                }
                if(facymax >= 0.0) {
                    t = (xmin - Math.sqrt(facymax)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = rveSize;
                        angleymax[ymaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(angleymax[ymaxcount] < 0.0) angleymax[ymaxcount] += 360.0;
                        ++ymaxcount;
                    }
                    t = (xmin + Math.sqrt(facymax)) / rveSize;
                    if(t >= 0.0 && t <= 1.0) {
                        xint = t * rveSize;
                        yint = rveSize;
                        angleymax[ymaxcount] = Math.atan2(yint - ymin, xint - xmin) * 180.0 / Math.PI;
                        if(angleymax[ymaxcount] < 0.0) angleymax[ymaxcount] += 360.0;
                        ++ymaxcount;
                    }
                }
                if(xmincount === 1) {
                    if(ymincount === 1) {
                        arcPoints[0] = angleymin[0];
                        arcPoints[1] = anglexmin[0] - angleymin[0];
                    } else if(ymaxcount === 1) {
                        arcPoints[0] = anglexmin[0];
                        arcPoints[1] = angleymax[0] - anglexmin[0];
                    }
                } else if(xmincount === 2) {
                    arcPoints[0] = anglexmin[0];
                    arcPoints[1] = anglexmin[1] + 360.0 - anglexmin[0];
                } else if(xmaxcount === 1) {
                    if(ymincount === 1) {
                        arcPoints[0] = anglexmax[0];
                        arcPoints[1] = angleymin[0] - anglexmax[0];
                    } else if(ymaxcount === 1) {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = anglexmax[0] - angleymax[0];
                    }
                } else if(xmaxcount === 2) {
                    arcPoints[0] = anglexmax[1];
                    arcPoints[1] = anglexmax[0] - anglexmax[1];
                } else if(ymincount === 2) {
                    if(angleymin[0] < angleymin[1]) {
                        arcPoints[0] = angleymin[1];
                        arcPoints[1] = 360.0 + angleymin[0] - angleymin[1];
                    } else {
                        arcPoints[0] = angleymin[1];
                        arcPoints[1] = angleymin[0] - angleymin[1];
                    }
                } else if(ymaxcount === 2) {
                    if(angleymax[0] < angleymax[1]) {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = angleymax[1] - angleymax[0];
                    } else {
                        arcPoints[0] = angleymax[0];
                        arcPoints[1] = 360.0 + angleymax[1] - angleymax[0];
                    }
                }
            }
            return arcPoints;
        }

        private intersectsRVE(center : Point, radius : number, rveSize : number) : boolean {
            var xcen : number = center.getX();
            var ycen : number = center.getY();
            var xminCirc : number = xcen - radius;
            var xmaxCirc : number = xcen + radius;
            var yminCirc : number = ycen - radius;
            var ymaxCirc : number = ycen + radius;
            if((xminCirc > 0.0) && (yminCirc > 0.0) && (xmaxCirc < rveSize) && (ymaxCirc < rveSize)) return false;
            return true;
        }
    }
}

