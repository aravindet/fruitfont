const variantTemplate =
	document.querySelector("#variant").content.firstElementChild;

export default class VariantPanel {
	constructor({ variant, selected, onSelect }) {
		this.element = variantTemplate.cloneNode(true);
		this.element.addEventListener("input", this.handleConfigInput);
		this.glyphList = this.element.querySelector(".variant-glyphs");
		this.glyphList.addEventListener("click", this.handleGlyphSelect);

		this.variant = variant;
		this.selected = selected;
		this.onSelect = onSelect;

		this.element.querySelector('[data-prop="style"]').value =
			variant.data.style;
		this.element.querySelector('[data-prop="ystep"]').value =
			variant.data.ystep;

		this.populateGlyphs();
	}

	handleConfigInput = (event) => {
		const change = {
			[event.target.dataset.prop]: parseInt(event.target.value),
		};
		this.variant.update(change);
	};

	handleGlyphSelect = (event) => {
		let index = parseInt(event.target.dataset.index);
		if (isNaN(index) || index === this.selected) return;
		this.glyphList.childNodes[this.selected].classList.remove("selected");
		this.glyphList.childNodes[index].classList.add("selected");
		this.selected = index;
		if (this.onSelect) this.onSelect(index);
	};

	populateGlyphs() {
		const previewEls = this.variant.glyphs.map(this.getPreviewEl);
		this.variant.glyphs.forEach((glyph, i) => {
			glyph.addEventListener("change", () => this.updatePreview(i));
		});
		this.glyphList.replaceChildren(...previewEls);
	}

	getChar(code) {
		if (code === 32) return "\u00a0"; // &nbsp;
		const str = String.fromCharCode(code);
		if (str.length === 1) return str;
		return code.toString(16);
	}

	getPreviewEl = (glyph, index) => {
		const { charCode } = glyph;
		const src = glyph.data.image;
		const previewEl = document.createElement("div");
		previewEl.classList.add("preview");
		if (index === this.selected) previewEl.classList.add("selected");
		previewEl.dataset.char = this.getChar(charCode);
		previewEl.dataset.index = index;
		if (src) {
			previewEl.style.backgroundImage = `url(${src})`;
		}
		return previewEl;
	};

	updatePreview = (index) => {
		const previewEl = this.getPreviewEl(this.variant.glyphs[index], index);
		this.glyphList.replaceChild(previewEl, this.glyphList.childNodes[index]);
	};
}
