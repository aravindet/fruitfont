import Canvas from "./js/canvas.js";
import FontPane from "./js/fontpane.js";

const container = document.querySelector("#editor");

const fontPane = new FontPane();
container.appendChild(fontPane.element);

const canvas = new Canvas();
container.appendChild(canvas.element);

const packBtn = document.createElement("button");
packBtn.addEventListener("click", () => {
	const data = canvas.data;
});
