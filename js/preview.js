export default class Preview {
	constructor({
		minx = -3,
		miny = -3,
		maxx = 12,
		maxy = 12,
		xStep = 9,
		data,
	} = {}) {
		this.element = document.createElement("div");
		this.element.classList.add("preview");
		const width = maxx - minx + 1;
		const height = maxy - miny + 1;
		this.data = data || new Array(width * height).fill(false);
		this.element.style.aspectRatio = `${width}/${height}`;
		this.element.style.gridTemplateColumns = `repeat(${height},1fr)`;

		for (let x = minx; x <= maxx; x++) {
			for (let y = minx; y <= maxx; y++) {
				const cell = document.createElement("div");
				cell.classList.add("preview-cell");
				if (x < 0 || y < 0 || x > xStep)
					cell.classList.add("preview-cell-outer");
				const offset = (y - miny) * width + (x - minx);
				if (this.data[offset]) cell.classList.add("preview-cell-on");
				this.element.appendChild(cell);
			}
		}
	}
}
