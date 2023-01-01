import Preview from "./preview.js";

const fontpaneTemplate =
	document.querySelector("#fontpane").content.firstElementChild;

export default class FontPane {
	constructor(data) {
		this.element = fontpaneTemplate.cloneNode(true);
		this.element.addEventListener("input", this.handleConfigInput);
		this.data = data || {
			name: this.element.querySelector('[data-prop="name"]').value,
			first: this.element.querySelector('[data-prop="first"]').value,
			last: this.element.querySelector('[data-prop="last"]').value,
			ystep: this.element.querySelector('[data-prop="ystep"]').value,
			glyphs: [],
		};
		this.initGlyphs();
	}

	handleConfigInput = (event) => {
		const {
			value,
			dataset: { prop },
		} = event.target;
		this.data[prop] = prop === "name" ? value : parseInt(value);
		if (prop === "first" || prop === "last") this.initGlyphs();
	};

	initGlyphs() {
		const count = this.data.last - this.data.first + 1;
		const glyphs = this.data.glyphs;
		if (glyphs.length < count) {
			glyphs.push(...new Array(count - glyphs.length));
		}

		const previewEls = glyphs.map((glyph) => {
			const preview = new Preview(glyph);
			return preview.element;
		});
		this.element
			.querySelector(".fontpane-glyphs")
			.replaceChildren(...previewEls);
	}
}
