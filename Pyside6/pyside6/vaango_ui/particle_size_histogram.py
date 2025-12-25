from enum import Enum
from typing import List
from PySide6.QtWidgets import QWidget
from PySide6.QtGui import QPainter, QColor, QPen, QFont
from PySide6.QtCore import QRectF, Qt

class ParticleSizeSource(Enum):
    INPUT = 0
    CALCULATED = 1


class ParticleSizeHistogramWidget(QWidget):
    def __init__(self, size_dist, flag: ParticleSizeSource = ParticleSizeSource.INPUT, parent=None):
        super().__init__(parent)
        self.size_dist = size_dist
        self.flag = flag
        self.setMinimumHeight(200)

    def compute_exponent_mantissa(self, val: float):
        import math
        if val == 0:
            return (0.0, 0.0)
        exp = abs(math.log(val) / math.log(10.0)) if val != 0 else 0.0
        if val < 1.0:
            exp = - (math.ceil(exp))
        else:
            exp = math.floor(exp)
        man = val * (10.0 ** (-exp))
        return (exp, man)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)

        w = self.width()
        h = self.height()

        # margins similar to C++ buf logic
        buf = max(int(w / 15), int(h / 15))
        xbuf = buf
        ybuf = buf
        xsmall = int(xbuf / 4)
        ysmall = int(ybuf / 4)

        xmin = xbuf
        xmax = w - xbuf
        ymin = ybuf
        ymax = h - ybuf

        # Fetch data depending on flag
        if self.flag == ParticleSizeSource.INPUT:
            sizes = getattr(self.size_dist, 'size', [])
            vol = getattr(self.size_dist, 'vol_frac', [])
        else:
            sizes = getattr(self.size_dist, 'size_calc', [])
            vol = getattr(self.size_dist, 'vol_frac_3d_calc', [])

        nof = len(sizes)
        if nof == 0:
            painter.drawText(rect := QRectF(xmin, ymin, xmax-xmin, ymax-ymin), Qt.AlignCenter, "No data")
            painter.end()
            return

        max_part_size = sizes[-1]
        exp, man = self.compute_exponent_mantissa(max_part_size)
        scale = 100.0
        maxSize = max(1, int(round(man * scale)))

        # background
        painter.fillRect(0, 0, w, h, QColor(255, 255, 255))

        # draw axes box
        pen = QPen(QColor(0, 0, 0))
        pen.setWidth(1)
        painter.setPen(pen)
        painter.drawRect(xmin, ymin, xmax - xmin, ymax - ymin)

        # compute mapping helpers
        def xcoord(val):
            return xmin + int(round(val / maxSize * (xmax - xmin)))

        def ycoord(percent):
            return ymax - int(round(percent / 100.0 * (ymax - ymin)))

        # colors
        input_color = QColor(184, 199, 27)
        calc_color = QColor(184, 60, 27)
        color = input_color if self.flag == ParticleSizeSource.INPUT else calc_color

        # draw bars and cumulative
        cum = 0.0
        for i in range(nof):
            size_start = sizes[i-1] if i > 0 else 0.0
            size_end = sizes[i]

            # normalize by max_part_size's mantissa scaling
            size_start_scaled = size_start * (man * scale / max_part_size) if max_part_size != 0 else 0.0
            size_end_scaled = size_end * (man * scale / max_part_size) if max_part_size != 0 else 0.0

            x1 = xcoord(size_start_scaled)
            x2 = xcoord(size_end_scaled)
            y1 = ycoord(vol[i])
            y2 = ycoord(0.0)

            rect_w = max(1, x2 - x1)
            rect_h = max(1, y2 - y1)

            painter.fillRect(x1, y1, rect_w, rect_h, color)
            painter.setPen(QPen(Qt.black))
            painter.drawRect(x1, y1, rect_w, rect_h)

            # cumulative line
            x_start_line = x1
            x_end_line = x2
            y_start_line = ycoord(cum)
            cum += vol[i]
            y_end_line = ycoord(cum)

            painter.setPen(QPen(color, 2))
            painter.drawLine(x_start_line, y_start_line, x_end_line, y_end_line)

        # ticks and labels
        painter.setPen(QPen(Qt.black))
        font = QFont()
        font.setPointSize(8)
        painter.setFont(font)

        # x ticks (10)
        for i in range(11):
            tx = xmin + i * (xmax - xmin) / 10
            painter.drawLine(tx, ymax, tx, ymax + ysmall)
            label = str(int(i * maxSize / 10))
            painter.drawText(tx - 10, ymax + ysmall + 12, label)

        # y ticks (0..100)
        for i in range(11):
            ty = ymin + i * (ymax - ymin) / 10
            # reverse y labels (top to bottom)
            val = (10 - i) * 10
            painter.drawLine(xmin - xsmall, ty, xmin, ty)
            painter.drawText(2, ty + 4, str(val))

        # title text
        painter.setPen(QPen(color))
        painter.drawText(xmin + 10, ymin + 15, "Input sizes" if self.flag == ParticleSizeSource.INPUT else "Calculated sizes")

        painter.end()

    def update_and_refresh(self):
        self.update()
