const svgNs = "http://www.w3.org/2000/svg";

export default class Canvas {
	constructor({
		xmin = -3,
		ymin = -3,
		xmax = 12,
		ymax = 12,
		xstep = 9,
		ystep = 12,
		interactive = false,
		data,
	} = {}) {
		this.element = document.createElementNS(svgNs, "svg");

		const width = xmax - xmin + 1;
		const height = ymax - ymin + 1;
		this.element.setAttribute("viewBox", `${xmin} ${ymin} ${width} ${height}`);
		this.data = data || new Array(width * height).fill(false);

		if (interactive) {
			this.element.addEventListener("mousedown", this.handleMouseDown);
			this.element.addEventListener("mouseup", this.handleMouseUp);
			this.element.addEventListener("mousemove", this.handleMouseMove);
		}

		for (let x = xmin; x <= xmax; x++) {
			for (let y = xmin; y <= xmax; y++) {
				const cell = document.createElementNS(svgNs, "rect");
				cell.setAttribute("x", x);
				cell.setAttribute("y", y);
				cell.setAttribute("width", 1);
				cell.setAttribute("height", 1);
				if (x < 0 || y < 0 || x >= xstep || y >= ystep + ymin)
					cell.classList.add("canvas-cell-outer");
				const offset = (y - ymin) * width + (x - xmin);
				if (this.data[offset]) cell.classList.add("canvas-cell-on");
				cell.dataset.offset = offset;
				// cell.textContent = `${x},${y}`;
				this.element.appendChild(cell);
			}
		}
	}

	updateCell(cell) {
		if (this.data[cell.dataset.offset]) {
			cell.classList.add("canvas-cell-on");
		} else {
			cell.classList.remove("canvas-cell-on");
		}
	}

	handleMouseDown = (event) => {
		if (!(event.buttons & 1)) return;
		const offset = event.target.dataset.offset;
		this.paintState = !this.data[offset];
		this.data[offset] = this.paintState;
		this.updateCell(event.target);
	};

	handleMouseUp = (event) => {
		if (!(event.buttons & 1)) return;
		this.paintState = undefined;
	};

	handleMouseMove = (event) => {
		if (!(event.buttons & 1) || this.paintState === undefined) return;
		const offset = event.target.dataset.offset;
		this.data[offset] = this.paintState;
		this.updateCell(event.target);
	};
}
