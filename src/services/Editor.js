import Store from "../stores/Store";
import {
  setFilename,
  setIsEditing,
  setBorderSize,
  setWidth,
  setHeight,
  setSelectedForm
} from "../stores/Status";

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
 * Updates form properties.
 *
 * @param {any} options
 */
function updateFormProperties(options) {
  const selectedForm = options.target;

  if (selectedForm) {
    selectedForm.width &&
      Store.dispatch(setWidth(selectedForm.width * selectedForm.scaleX));
    selectedForm.height &&
      Store.dispatch(setHeight(selectedForm.height * selectedForm.scaleY));
    selectedForm.strokeWidth &&
      Store.dispatch(
        setBorderSize(selectedForm.strokeWidth * selectedForm.scaleX)
      );
  }
}

/**
 * Updates into store selected form.
 *
 * @param {any} options
 */
function updateSelectedForm(options) {
  const selectedForm = options.target;

  selectedForm
    ? Store.dispatch(setSelectedForm(selectedForm))
    : Store.dispatch(setSelectedForm(undefined));
}

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

  canvas.on("mouse:down", options => {
    updateFormProperties(options);
    updateSelectedForm(options);
  });

  canvas.on("object:scaling", options => {
    updateFormProperties(options);
  });

  canvas.on("object:selected", options => {
    updateSelectedForm(options);
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
    rx: Math.round(width / 2),
    ry: Math.round(height / 2),
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

/**
 * Sets new properties in all selected forms.
 *
 * @export
 * @param {number} width
 * @param {number} height
 * @param {number} borderSize
 */
export function setFormProperties(width, height, borderSize) {
  const activeObject = canvas.getActiveObject(),
    forms = activeObject._objects || [activeObject];

  forms.forEach(form => {
    if (form.type === "ellipse") {
      form.set({
        rx: Math.round(width / 2),
        ry: Math.round(height / 2),
        strokeWidth: borderSize,
        scaleX: 1,
        scaleY: 1
      });
    } else {
      form.set({
        width: width,
        height: height,
        strokeWidth: borderSize,
        scaleX: 1,
        scaleY: 1
      });
    }
  });

  canvas.renderAll();
}
