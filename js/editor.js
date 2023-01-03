import { init, wireInputs, pack } from "./data.js";
import Canvas from "./canvas.js";
import VariantPanel from "./variant.js";

// const font = {
// 	name: "Example",
// 	first: 32,
// 	last: 126,
// 	ystep: 12,
// 	glyphs: [],
// };

let canvas;
let selectedVariant = 0;
let selectedGlyph = 0;

const font = init();
wireInputs(document.querySelector("#font-panel"), font);

function setSelected(index) {
	const container = document.querySelector("#canvas");
	selectedGlyph = index;
	if (canvas) container.removeChild(canvas.element);
	canvas = new Canvas({
		glyph: font.variants[selectedVariant].glyphs[index],
	});
	container.appendChild(canvas.element);
}

const variant = new VariantPanel({
	variant: font.variants[selectedVariant],
	selected: selectedGlyph,
	onSelect: setSelected,
});
document.querySelector("#variant-panel").appendChild(variant.element);

const onCanvasChange = ({ image, data }) => {
	font.glyphs[selectedGlyph] = { image, data };
	variant.updatePreview(selectedGlyph);
};

document.querySelector("#reset").addEventListener("click", () => {
	localStorage.clear();
	location.reload();
});

document.querySelector("#export").addEventListener("click", () => {
	const url = pack(font);
	const link = document.createElement("a");
	link.download = `${font.data.name}.h`;
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
});

setSelected(0);
