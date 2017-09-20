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
function updateProperties(options) {
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
 * Obtains an array of active forms.
 *
 * @returns {Array.<Object>}
 */
function getActiveForms() {
  const activeObject = canvas.getActiveObject();

  return activeObject._objects || [activeObject];
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
    updateProperties(options);
    updateSelectedForm(options);
  });

  canvas.on("object:scaling", options => {
    updateProperties(options);
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
  var text = new fabric.IText("New text", {
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
    left: 100,
    top: 100
  });

  canvas.add(triangle);
}

/**
 * Sets new properties in all selected forms.
 *
 * @export
 */
export function updateForms() {
  const forms = getActiveForms();

  forms.forEach(form => {
    if (form.type === "ellipse") {
      form.set({
        rx: Math.round(width / 2),
        ry: Math.round(height / 2),
        strokeWidth: borderSize,
        scaleX: 1,
        scaleY: 1
      });
    } else if (form.type === "line") {
      form.set({
        strokeWidth: borderSize,
        scaleX: 1,
        scaleY: 1,
        width: Math.round(form.width * form.scaleX)
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

/**
 * Removes active objects from canvas.
 *
 * @export
 */
export function removeSelectedForms() {
  const forms = getActiveForms();

  forms.forEach(form => canvas.remove(form));
  Store.dispatch(setSelectedForm(undefined));
  canvas.discardActiveObject();
  canvas.renderAll();
}

/**
 * Clones selected forms.
 *
 * @export
 */
export function cloneSelectedForm() {
  var activeObject = canvas.getActiveObject();

  activeObject.clone(function(cloned) {
    canvas.discardActiveObject();
    cloned.set({
      top: cloned.top + 20,
      left: cloned.left + 20,
      evented: true
    });

    if (cloned.type === "activeSelection") {
      // active selection needs a reference to the canvas.
      cloned.canvas = canvas;
      cloned.forEachObject(function(obj) {
        canvas.add(obj);
      });
      cloned.setCoords();
    } else {
      canvas.add(cloned);
    }
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  });
}
