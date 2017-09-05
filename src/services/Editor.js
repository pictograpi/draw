import Store from "../stores/Store";
import { setFilename, setIsEditing } from "../stores/Status";

const canvasId = "editor";
let canvas;

/**
 * Creates a new editor.
 *
 * @export
 */
export function create() {
  const filename = `${Date.now()}.png`;

  canvas = new fabric.Canvas(canvasId, {
    width: 1024,
    height: 768
  });

  Store.dispatch(setFilename(filename));
  Store.dispatch(setIsEditing(true));
}

/**
 * Adds a rectangle to the canvas.
 *
 * @export
 */
export function addRect() {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 20,
    height: 20
  });

  canvas.add(rect);
}

/**
 * Adds a circle to the canvas.
 *
 * @export
 */
export function addCircle() {
  const circle = new fabric.Circle({
    radius: 20,
    fill: "red",
    left: 100,
    top: 100
  });

  canvas.add(circle);
}

/**
 * Adds a line to the canvas.
 *
 * @export
 */
export function addLine() {
  const line = new fabric.Line([50, 100, 200, 200], {
    left: 170,
    top: 150,
    stroke: "red"
  });

  canvas.add(line);
}

/**
 * Sets drawing mode in the canvas.
 *
 * @export
 * @param {boolean} drawingMode True if drawing mode is enabled.
 */
export function setDrawingMode(drawingMode) {
  canvas.isDrawingMode = drawingMode;
  canvas.freeDrawingBrush.color = "red";
}

/**
 * Adds a text to the canvas.
 *
 * @export
 */
export function addText() {
  var text = new fabric.Text("New text", {
    left: 100,
    top: 100,
    fill: "red"
  });
  canvas.add(text);
}

/**
 * Adds a triangle to the canvas.
 *
 * @export
 */
export function addTriangle() {
  const triangle = new fabric.Triangle({
    width: 30,
    height: 30,
    fill: "red",
    left: 50,
    top: 50
  });

  canvas.add(triangle);
}
