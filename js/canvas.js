const defaultDims = {
	xmin: -3,
	ymin: -3,
	xmax: 12,
	ymax: 12,
	xstep: 9,
	ystep: 12,
};

const style = {
	offFill: "#fff",
	onFill: "#000",
};

const gridSize = 16;

export default class Canvas {
	constructor({ glyph } = {}) {
		this.element = document.createElement("canvas");
		this.context = this.element.getContext("2d");

		this.glyph = glyph;
		const { width, height } = this.getDimensions();

		this.element.width = width * gridSize;
		this.element.height = height * gridSize;

		this.element.addEventListener("mousedown", this.handleMouseDown);
		this.element.addEventListener("mouseup", this.handleMouseUp);
		this.element.addEventListener("mousemove", this.handleMouseMove);

		this.paintAll();
	}

	getDimensions() {
		const { xmin, ymin, xmax, ymax } = this.glyph.variant.font.data;
		const width = xmax - xmin + 1;
		const height = ymax - ymin + 1;
		return { height, width };
	}

	paintAll() {
		const { width, height } = this.getDimensions();

		this.context.fillStyle = style.offFill;
		this.context.fillRect(0, 0, width * gridSize, height * gridSize);
		this.context.fillStyle = style.onFill;
		for (let x = 0; x <= width; x++) {
			for (let y = 0; y <= height; y++) {
				const offset = y * width + x;
				if (this.glyph.data.buffer[offset]) {
					this.context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
				}
			}
		}
	}

	getEventCoords(event) {
		const { width, height } = this.getDimensions();
		const x = Math.floor((event.offsetX * width) / event.target.offsetWidth);
		const y = Math.floor((event.offsetY * height) / event.target.offsetHeight);
		const offset = y * width + x;
		return { x, y, offset };
	}

	updateCell(x, y, offset) {
		this.glyph.data.buffer[offset] = this.paintState;
		this.context.fillStyle = style[this.paintState ? "onFill" : "offFill"];
		this.context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
		this.glyph.update({ image: this.element.toDataURL() });
	}

	handleMouseDown = (event) => {
		if (!(event.buttons & 1)) return;
		const { x, y, offset } = this.getEventCoords(event);
		this.paintState = Number(!this.glyph.data.buffer[offset]);
		this.updateCell(x, y, offset);
	};

	handleMouseUp = (event) => {
		if (!(event.buttons & 1)) return;
		this.paintState = undefined;
	};

	handleMouseMove = (event) => {
		if (!(event.buttons & 1) || this.paintState === undefined) return;
		const { x, y, offset } = this.getEventCoords(event);
		this.updateCell(x, y, offset);
	};
}
