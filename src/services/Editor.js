import Store from "../stores/Store";
import { setFilename, setIsEditing } from "../stores/Status";

const canvasId = "editor";
let canvas,
  fillColorRGBAString,
  borderColorRGBAString,
  width,
  height,
  borderSize;

Store.subscribe(() => {
  const statusStore = Store.getState().status;

  fillColorRGBAString = statusStore.fillColorRGBAString;
  borderColorRGBAString = statusStore.borderColorRGBAString;
  width = statusStore.width;
  height = statusStore.height;
  borderSize = statusStore.borderSize;
});

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

  canvas.on("mouse:down", function(options) {
    console.log(options.e.clientX, options.e.clientY, options.target);
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
    strokeWidth: borderSize,
    stroke: borderColorRGBAString,
    fill: fillColorRGBAString,
    width: width,
    height: height
  });

  canvas.add(rect);
}

/**
 * Adds a circle to the canvas.
 *
 * @export
 */
export function addEllipse() {
  const circle = new fabric.Ellipse({
    rx: width,
    ry: height,
    fill: fillColorRGBAString,
    strokeWidth: borderSize,
    stroke: borderColorRGBAString,
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
  const line = new fabric.Line([50, 100, 200, 100], {
    left: 170,
    top: 150,
    stroke: fillColorRGBAString,
    strokeWidth: borderSize
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
  canvas.freeDrawingBrush.color = fillColorRGBAString;
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
    fill: fillColorRGBAString
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
    width: width,
    height: height,
    fill: fillColorRGBAString,
    strokeWidth: borderSize,
    stroke: borderColorRGBAString,
    left: 50,
    top: 50
  });

  canvas.add(triangle);
}
