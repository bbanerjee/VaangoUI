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
    var AbstractTableModel = javax.swing.table.AbstractTableModel;
    var DecimalFormat = java.text.DecimalFormat;
    var MPMICEExchangePanel = (function (_super) {
        __extends(MPMICEExchangePanel, _super);
        function MPMICEExchangePanel(mpmMat, iceMat, parent) {
            var _this = _super.call(this) || this;
            _this.d_numMat = 0;
            _this.d_parent = null;
            _this.momentumModel = null;
            _this.heatModel = null;
            _this.momentumTable = null;
            _this.heatTable = null;
            _this.updateButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_parent = parent;
            _this.d_numMat = mpmMat.size() + iceMat.size();
            if (_this.d_numMat > 6) {
                console.info("**ERROR**Too many materials in exchange.");
                return _this;
            }
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var momentumLabel = new JLabel("Momentum Exchange Coefficients");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(momentumLabel, gbc);
            _this.add(momentumLabel);
            _this.momentumModel = new MPMICEExchangePanel.ExchangeTableModel(_this, mpmMat, iceMat, 1.0E15);
            _this.momentumTable = new JTable(_this.momentumModel);
            _this.initializeTable(_this.momentumTable);
            _this.momentumTable.setPreferredScrollableViewportSize(new Dimension(600, 100));
            _this.momentumTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
            _this.momentumTable.setColumnSelectionAllowed(false);
            _this.momentumTable.setRowSelectionAllowed(false);
            _this.momentumTable.doLayout();
            var momentumSP = new JScrollPane(_this.momentumTable);
            UintahGui.setConstraints(gbc, 0, 1);
            gb.setConstraints(momentumSP, gbc);
            _this.add(momentumSP);
            var heatLabel = new JLabel("Heat Exchange Coefficients");
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(heatLabel, gbc);
            _this.add(heatLabel);
            _this.heatModel = new MPMICEExchangePanel.ExchangeTableModel(_this, mpmMat, iceMat, 1.0E10);
            _this.heatTable = new JTable(_this.heatModel);
            _this.initializeTable(_this.heatTable);
            _this.heatTable.setPreferredScrollableViewportSize(new Dimension(600, 100));
            _this.heatTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
            _this.heatTable.setColumnSelectionAllowed(false);
            _this.heatTable.setRowSelectionAllowed(false);
            _this.heatTable.doLayout();
            var heatSP = new JScrollPane(_this.heatTable);
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(heatSP, gbc);
            _this.add(heatSP);
            _this.updateButton = new JButton("Update");
            _this.updateButton.setActionCommand("update");
            UintahGui.setConstraints(gbc, 0, 4);
            gb.setConstraints(_this.updateButton, gbc);
            _this.add(_this.updateButton);
            _this.updateButton.addActionListener(_this);
            return _this;
        }
        MPMICEExchangePanel.prototype.initializeTable = function (table) {
            var col = null;
            var comp = null;
            var headerWidth = 0;
            var headerRenderer = table.getTableHeader().getDefaultRenderer();
            var maxHeaderWidth = 0;
            for (var ii = 1; ii < this.d_numMat + 1; ++ii) {
                col = table.getColumnModel().getColumn(ii);
                comp = headerRenderer.getTableCellRendererComponent(null, col.getHeaderValue(), false, false, 0, 0);
                headerWidth = comp.getPreferredSize().width;
                col.setPreferredWidth(headerWidth);
                if (headerWidth > maxHeaderWidth)
                    maxHeaderWidth = headerWidth;
            }
            col = table.getColumnModel().getColumn(0);
            col.setPreferredWidth(maxHeaderWidth);
        };
        MPMICEExchangePanel.prototype.updateMaterials = function (mpmMat, iceMat) {
            this.d_numMat = mpmMat.size() + iceMat.size();
            if (this.d_numMat > 6) {
                console.info("**ERROR**Too many materials in exchange.");
                return;
            }
            this.momentumModel.updateMaterials(mpmMat, iceMat);
            this.heatModel.updateMaterials(mpmMat, iceMat);
            this.validate();
        };
        MPMICEExchangePanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<exchange_coefficients>");
            pw.print(tab1 + "<momentum> [");
            this.momentumModel.writeUintah(pw, tab1);
            pw.println("] </momentum>");
            pw.print(tab1 + "<heat> [");
            this.heatModel.writeUintah(pw, tab1);
            pw.println("] </heat>");
            pw.println(tab + "</exchange_coefficients>");
        };
        MPMICEExchangePanel.prototype.actionPerformed = function (e) {
            if (e.getActionCommand() === "update") {
            }
        };
        return MPMICEExchangePanel;
    }(JPanel));
    /**
     *
     */
    MPMICEExchangePanel.serialVersionUID = -8578475780144298935;
    vaango_ui.MPMICEExchangePanel = MPMICEExchangePanel;
    (function (MPMICEExchangePanel) {
        var ExchangeTableModel = (function (_super) {
            __extends(ExchangeTableModel, _super);
            function ExchangeTableModel(__parent, mpmMat, iceMat, value) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.table.TableModel", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -2648766002379445816;
                _this.NUMCOL = 6;
                _this.d_numMat = 0;
                _this.d_colNames = null;
                _this.d_exchangeCoeff = null;
                _this.d_colNames = new Array(ExchangeTableModel.NUMCOL);
                _this.d_exchangeCoeff = new Array((ExchangeTableModel.NUMCOL * (ExchangeTableModel.NUMCOL + 1) / 2 | 0));
                _this.initialize(mpmMat, iceMat, value);
                var patternExp = "0.0##E0";
                _this.formatter = new DecimalFormat(patternExp);
                return _this;
            }
            ExchangeTableModel.prototype.getColumnCount = function () {
                return ExchangeTableModel.NUMCOL + 1;
            };
            ExchangeTableModel.prototype.getRowCount = function () {
                return ExchangeTableModel.NUMCOL;
            };
            ExchangeTableModel.prototype.getColumnName = function (col) {
                if (col === 0) {
                    return new String(" ");
                }
                else {
                    return this.d_colNames[col - 1];
                }
            };
            ExchangeTableModel.prototype.getValueAt = function (row, col) {
                if (col === 0) {
                    return this.d_colNames[row];
                }
                else if (row > this.d_numMat - 1 || col > this.d_numMat) {
                    return new String(" ");
                }
                else {
                    var actCol = col - 1;
                    var actRow = row;
                    if (actCol < actRow) {
                        var temp = actRow;
                        actRow = actCol;
                        actCol = temp;
                    }
                    actRow++;
                    actCol++;
                    var index = (actRow - 1) * ExchangeTableModel.NUMCOL - (actRow * (actRow - 1) / 2 | 0) + actCol - 1;
                    return new Number(this.d_exchangeCoeff[index]);
                }
            };
            ExchangeTableModel.prototype.setValueAt = function (value, row, col) {
                if (col > 0) {
                    var actCol = col - 1;
                    var actRow = row;
                    if (actCol < actRow) {
                        var temp = actRow;
                        actRow = actCol;
                        actCol = temp;
                    }
                    actRow++;
                    actCol++;
                    var index = (actRow - 1) * ExchangeTableModel.NUMCOL - (actRow * (actRow - 1) / 2 | 0) + actCol - 1;
                    try {
                        var input = value.toUpperCase();
                        var val = this.formatter.parse(input).doubleValue();
                        this.d_exchangeCoeff[index] = val;
                    }
                    catch (e) {
                        console.info("Could not update value");
                    }
                    ;
                    this.fireTableCellUpdated(row, col);
                    this.fireTableCellUpdated(col, row);
                }
            };
            ExchangeTableModel.prototype.isCellEditable = function (row, col) {
                col--;
                if (col < 0 || col > this.d_numMat - 1)
                    return false;
                if (row >= col || row > this.d_numMat - 1)
                    return false;
                return true;
            };
            ExchangeTableModel.prototype.initialize = function (mpmMat, iceMat, value) {
                this.d_numMat = mpmMat.size() + iceMat.size();
                for (var ii = 0; ii < ExchangeTableModel.NUMCOL; ++ii) {
                    this.d_colNames[ii] = new String(" ");
                }
                var count = 0;
                for (var ii = 0; ii < mpmMat.size(); ++ii) {
                    this.d_colNames[count++] = mpmMat.elementAt(ii);
                }
                for (var ii = 0; ii < iceMat.size(); ++ii) {
                    this.d_colNames[count++] = iceMat.elementAt(ii);
                }
                count = 0;
                for (var ii = 0; ii < ExchangeTableModel.NUMCOL; ++ii) {
                    for (var jj = ii; jj < ExchangeTableModel.NUMCOL; ++jj) {
                        if (ii === jj) {
                            this.d_exchangeCoeff[count++] = 0.0;
                        }
                        else {
                            this.d_exchangeCoeff[count++] = value;
                        }
                    }
                }
            };
            ExchangeTableModel.prototype.updateMaterials = function (mpmMat, iceMat) {
                this.d_numMat = mpmMat.size() + iceMat.size();
                var count = 0;
                for (var ii = 0; ii < mpmMat.size(); ++ii) {
                    this.d_colNames[count++] = mpmMat.elementAt(ii);
                }
                for (var ii = 0; ii < iceMat.size(); ++ii) {
                    this.d_colNames[count++] = iceMat.elementAt(ii);
                }
                var momTCR = this.__parent.momentumTable.getTableHeader().getDefaultRenderer();
                for (var col = 0; col < this.d_numMat; ++col) {
                    var column = this.__parent.momentumTable.getColumnModel().getColumn(col + 1);
                    column.setHeaderValue(this.d_colNames[col]);
                    var comp = momTCR.getTableCellRendererComponent(null, this.d_colNames[col], false, false, 0, 0);
                    column.setPreferredWidth(comp.getPreferredSize().width);
                    column = this.__parent.heatTable.getColumnModel().getColumn(col + 1);
                    column.setHeaderValue(this.d_colNames[col]);
                    column.setPreferredWidth(comp.getPreferredSize().width);
                }
            };
            ExchangeTableModel.prototype.writeUintah = function (pw, tab) {
                if (this.d_exchangeCoeff.length > 0) {
                    for (var ii = 0; ii < this.d_numMat - 1; ++ii) {
                        for (var jj = ii + 1; jj < this.d_numMat; ++jj) {
                            var index = ii * ExchangeTableModel.NUMCOL + (ii * (ii - 1) / 2 | 0) + jj;
                            pw.print(this.d_exchangeCoeff[index]);
                            if (!(ii === this.d_numMat - 2 && jj === this.d_numMat - 1)) {
                                pw.print(", ");
                            }
                        }
                    }
                }
            };
            return ExchangeTableModel;
        }(AbstractTableModel));
        MPMICEExchangePanel.ExchangeTableModel = ExchangeTableModel;
    })(MPMICEExchangePanel = vaango_ui.MPMICEExchangePanel || (vaango_ui.MPMICEExchangePanel = {}));
})(vaango_ui || (vaango_ui = {}));
