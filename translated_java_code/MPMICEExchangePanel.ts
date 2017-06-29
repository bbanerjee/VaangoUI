"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    import AbstractTableModel = javax.swing.table.AbstractTableModel;

    import TableColumn = javax.swing.table.TableColumn;

    import TableCellRenderer = javax.swing.table.TableCellRenderer;

    import DecimalFormat = java.text.DecimalFormat;

    import ParseException = java.text.ParseException;

    export class MPMICEExchangePanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -8578475780144298935;

        private d_numMat : number = 0;

        private d_parent : UintahInputPanel = null;

        private momentumModel : MPMICEExchangePanel.ExchangeTableModel = null;

        private heatModel : MPMICEExchangePanel.ExchangeTableModel = null;

        private momentumTable : JTable = null;

        private heatTable : JTable = null;

        private updateButton : JButton = null;

        public constructor(mpmMat : Vector<string>, iceMat : Vector<string>, parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_parent = parent;
            this.d_numMat = mpmMat.size() + iceMat.size();
            if(this.d_numMat > 6) {
                console.info("**ERROR**Too many materials in exchange.");
                return;
            }
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var momentumLabel : JLabel = new JLabel("Momentum Exchange Coefficients");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(momentumLabel, gbc);
            this.add(momentumLabel);
            this.momentumModel = new MPMICEExchangePanel.ExchangeTableModel(this, mpmMat, iceMat, 1.0E15);
            this.momentumTable = new JTable(this.momentumModel);
            this.initializeTable(this.momentumTable);
            this.momentumTable.setPreferredScrollableViewportSize(new Dimension(600, 100));
            this.momentumTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
            this.momentumTable.setColumnSelectionAllowed(false);
            this.momentumTable.setRowSelectionAllowed(false);
            this.momentumTable.doLayout();
            var momentumSP : JScrollPane = new JScrollPane(this.momentumTable);
            UintahGui.setConstraints(gbc, 0, 1);
            gb.setConstraints(momentumSP, gbc);
            this.add(momentumSP);
            var heatLabel : JLabel = new JLabel("Heat Exchange Coefficients");
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(heatLabel, gbc);
            this.add(heatLabel);
            this.heatModel = new MPMICEExchangePanel.ExchangeTableModel(this, mpmMat, iceMat, 1.0E10);
            this.heatTable = new JTable(this.heatModel);
            this.initializeTable(this.heatTable);
            this.heatTable.setPreferredScrollableViewportSize(new Dimension(600, 100));
            this.heatTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
            this.heatTable.setColumnSelectionAllowed(false);
            this.heatTable.setRowSelectionAllowed(false);
            this.heatTable.doLayout();
            var heatSP : JScrollPane = new JScrollPane(this.heatTable);
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(heatSP, gbc);
            this.add(heatSP);
            this.updateButton = new JButton("Update");
            this.updateButton.setActionCommand("update");
            UintahGui.setConstraints(gbc, 0, 4);
            gb.setConstraints(this.updateButton, gbc);
            this.add(this.updateButton);
            this.updateButton.addActionListener(this);
        }

        initializeTable(table : JTable) {
            var col : TableColumn = null;
            var comp : Component = null;
            var headerWidth : number = 0;
            var headerRenderer : TableCellRenderer = table.getTableHeader().getDefaultRenderer();
            var maxHeaderWidth : number = 0;
            for(var ii : number = 1; ii < this.d_numMat + 1; ++ii) {
                col = table.getColumnModel().getColumn(ii);
                comp = headerRenderer.getTableCellRendererComponent(null, col.getHeaderValue(), false, false, 0, 0);
                headerWidth = comp.getPreferredSize().width;
                col.setPreferredWidth(headerWidth);
                if(headerWidth > maxHeaderWidth) maxHeaderWidth = headerWidth;
            }
            col = table.getColumnModel().getColumn(0);
            col.setPreferredWidth(maxHeaderWidth);
        }

        public updateMaterials(mpmMat : Vector<string>, iceMat : Vector<string>) {
            this.d_numMat = mpmMat.size() + iceMat.size();
            if(this.d_numMat > 6) {
                console.info("**ERROR**Too many materials in exchange.");
                return;
            }
            this.momentumModel.updateMaterials(mpmMat, iceMat);
            this.heatModel.updateMaterials(mpmMat, iceMat);
            this.validate();
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<exchange_coefficients>");
            pw.print(tab1 + "<momentum> [");
            this.momentumModel.writeUintah(pw, tab1);
            pw.println("] </momentum>");
            pw.print(tab1 + "<heat> [");
            this.heatModel.writeUintah(pw, tab1);
            pw.println("] </heat>");
            pw.println(tab + "</exchange_coefficients>");
        }

        public actionPerformed(e : ActionEvent) {
            if(e.getActionCommand() === "update") {
            }
        }
    }

    export namespace MPMICEExchangePanel {

        export class ExchangeTableModel extends AbstractTableModel {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            static NUMCOL : number;

            d_numMat : number;

            d_colNames : string[];

            d_exchangeCoeff : number[];

            formatter : DecimalFormat;

            public constructor(__parent: any, mpmMat : Vector<string>, iceMat : Vector<string>, value : number) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.table.TableModel","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -2648766002379445816;
                this.NUMCOL = 6;
                this.d_numMat = 0;
                this.d_colNames = null;
                this.d_exchangeCoeff = null;
                this.d_colNames = new Array(ExchangeTableModel.NUMCOL);
                this.d_exchangeCoeff = new Array((ExchangeTableModel.NUMCOL * (ExchangeTableModel.NUMCOL + 1) / 2|0));
                this.initialize(mpmMat, iceMat, value);
                var patternExp : string = "0.0##E0";
                this.formatter = new DecimalFormat(patternExp);
            }

            public getColumnCount() : number {
                return ExchangeTableModel.NUMCOL + 1;
            }

            public getRowCount() : number {
                return ExchangeTableModel.NUMCOL;
            }

            public getColumnName(col : number) : string {
                if(col === 0) {
                    return <string>new String(" ");
                } else {
                    return this.d_colNames[col - 1];
                }
            }

            public getValueAt(row : number, col : number) : any {
                if(col === 0) {
                    return this.d_colNames[row];
                } else if(row > this.d_numMat - 1 || col > this.d_numMat) {
                    return <string>new String(" ");
                } else {
                    var actCol : number = col - 1;
                    var actRow : number = row;
                    if(actCol < actRow) {
                        var temp : number = actRow;
                        actRow = actCol;
                        actCol = temp;
                    }
                    actRow++;
                    actCol++;
                    var index : number = (actRow - 1) * ExchangeTableModel.NUMCOL - (actRow * (actRow - 1) / 2|0) + actCol - 1;
                    return <number>new Number(this.d_exchangeCoeff[index]);
                }
            }

            public setValueAt(value : any, row : number, col : number) {
                if(col > 0) {
                    var actCol : number = col - 1;
                    var actRow : number = row;
                    if(actCol < actRow) {
                        var temp : number = actRow;
                        actRow = actCol;
                        actCol = temp;
                    }
                    actRow++;
                    actCol++;
                    var index : number = (actRow - 1) * ExchangeTableModel.NUMCOL - (actRow * (actRow - 1) / 2|0) + actCol - 1;
                    try {
                        var input : string = (<string>value).toUpperCase();
                        var val : number = this.formatter.parse(input).doubleValue();
                        this.d_exchangeCoeff[index] = val;
                    } catch(e) {
                        console.info("Could not update value");
                    };
                    this.fireTableCellUpdated(row, col);
                    this.fireTableCellUpdated(col, row);
                }
            }

            public isCellEditable(row : number, col : number) : boolean {
                col--;
                if(col < 0 || col > this.d_numMat - 1) return false;
                if(row >= col || row > this.d_numMat - 1) return false;
                return true;
            }

            public initialize(mpmMat : Vector<string>, iceMat : Vector<string>, value : number) {
                this.d_numMat = mpmMat.size() + iceMat.size();
                for(var ii : number = 0; ii < ExchangeTableModel.NUMCOL; ++ii) {
                    this.d_colNames[ii] = <string>new String(" ");
                }
                var count : number = 0;
                for(var ii : number = 0; ii < mpmMat.size(); ++ii) {
                    this.d_colNames[count++] = mpmMat.elementAt(ii);
                }
                for(var ii : number = 0; ii < iceMat.size(); ++ii) {
                    this.d_colNames[count++] = iceMat.elementAt(ii);
                }
                count = 0;
                for(var ii : number = 0; ii < ExchangeTableModel.NUMCOL; ++ii) {
                    for(var jj : number = ii; jj < ExchangeTableModel.NUMCOL; ++jj) {
                        if(ii === jj) {
                            this.d_exchangeCoeff[count++] = 0.0;
                        } else {
                            this.d_exchangeCoeff[count++] = value;
                        }
                    }
                }
            }

            public updateMaterials(mpmMat : Vector<string>, iceMat : Vector<string>) {
                this.d_numMat = mpmMat.size() + iceMat.size();
                var count : number = 0;
                for(var ii : number = 0; ii < mpmMat.size(); ++ii) {
                    this.d_colNames[count++] = mpmMat.elementAt(ii);
                }
                for(var ii : number = 0; ii < iceMat.size(); ++ii) {
                    this.d_colNames[count++] = iceMat.elementAt(ii);
                }
                var momTCR : TableCellRenderer = this.__parent.momentumTable.getTableHeader().getDefaultRenderer();
                for(var col : number = 0; col < this.d_numMat; ++col) {
                    var column : TableColumn = this.__parent.momentumTable.getColumnModel().getColumn(col + 1);
                    column.setHeaderValue(this.d_colNames[col]);
                    var comp : Component = momTCR.getTableCellRendererComponent(null, this.d_colNames[col], false, false, 0, 0);
                    column.setPreferredWidth(comp.getPreferredSize().width);
                    column = this.__parent.heatTable.getColumnModel().getColumn(col + 1);
                    column.setHeaderValue(this.d_colNames[col]);
                    column.setPreferredWidth(comp.getPreferredSize().width);
                }
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                if(this.d_exchangeCoeff.length > 0) {
                    for(var ii : number = 0; ii < this.d_numMat - 1; ++ii) {
                        for(var jj : number = ii + 1; jj < this.d_numMat; ++jj) {
                            var index : number = ii * ExchangeTableModel.NUMCOL + (ii * (ii - 1) / 2|0) + jj;
                            pw.print(this.d_exchangeCoeff[index]);
                            if(!(ii === this.d_numMat - 2 && jj === this.d_numMat - 1)) {
                                pw.print(", ");
                            }
                        }
                    }
                }
            }
        }
    }

}

