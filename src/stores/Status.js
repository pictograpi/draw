const ACTIONS = {
  SET_IS_EDITING: "STATUS_SET_IS_EDITING",
  SET_FILENAME: "STATUS_SET_FILENAME",
  SET_FILL_COLOR: "STATUS_SET_FILL_COLOR",
  SET_BORDER_COLOR: "STATUS_SET_BORDER_COLOR",
  SET_WIDTH: "STATUS_SET_WIDTH",
  SET_HEIGHT: "STATUS_SET_HEIGHT",
  SET_BORDER_SIZE: "STATUS_SET_BORDER_SIZE"
};

const StatusReducer = (
  state = {
    fillColorRGBAString: "rgba(56,149,155,1)",
    borderColorRGBAString: "rgba(0,0,0,1)",
    isEditing: false,
    borderSize: 2,
    width: 20,
    height: 20
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.SET_IS_EDITING: {
      state = {
        ...state,
        isEditing: action.payload
      };
      break;
    }
    case ACTIONS.SET_FILENAME: {
      state = {
        ...state,
        filename: action.payload
      };
      break;
    }
    case ACTIONS.SET_FILL_COLOR: {
      const rgb = action.payload.rgb;

      state = {
        ...state,
        fillColor: action.payload,
        fillColorRGBAString: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
      };
      break;
    }
    case ACTIONS.SET_BORDER_COLOR: {
      const rgb = action.payload.rgb;

      state = {
        ...state,
        borderColor: action.payload,
        borderColorRGBAString: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
      };
      break;
    }
    case ACTIONS.SET_WIDTH: {
      state = {
        ...state,
        width: action.payload
      };
      break;
    }
    case ACTIONS.SET_HEIGHT: {
      state = {
        ...state,
        height: action.payload
      };
      break;
    }
    case ACTIONS.SET_BORDER_SIZE: {
      state = {
        ...state,
        borderSize: action.payload
      };
      break;
    }
  }

  return state;
};

export default StatusReducer;

/**
 * Changes is editing value.
 *
 * @export
 * @param {boolean} isEditing.
 * @returns {Object} Action.
 */
export function setIsEditing(isEditing) {
  return {
    type: ACTIONS.SET_IS_EDITING,
    payload: isEditing
  };
}

/**
 * Stores the filename of current file.
 *
 * @export
 * @param {string} filename.
 * @returns {Object} Action.
 */
export function setFilename(filename) {
  return {
    type: ACTIONS.SET_FILENAME,
    payload: filename
  };
}

/**
 * Stores fill color.
 *
 * @export
 * @param {string} color Color to store.
 * @returns {Object} Action.
 */
export function setFillColor(color) {
  return {
    type: ACTIONS.SET_FILL_COLOR,
    payload: color
  };
}

/**
 * Stores border color.
 *
 * @export
 * @param {string} color Color to store.
 * @returns {Object} Action.
 */
export function setBorderColor(color) {
  return {
    type: ACTIONS.SET_BORDER_COLOR,
    payload: color
  };
}

/**
 * Stores width.
 *
 * @export
 * @param {number} width
 * @returns
 */
export function setWidth(width) {
  return {
    type: ACTIONS.SET_WIDTH,
    payload: width
  };
}

/**
 * Stores height.
 *
 * @export
 * @param {number} height
 * @returns
 */
export function setHeight(height) {
  return {
    type: ACTIONS.SET_HEIGHT,
    payload: height
  };
}

/**
 * Stores border size
 *
 * @export
 * @param {number} size
 * @returns
 */
export function setBorderSize(size) {
  return {
    type: ACTIONS.SET_BORDER_SIZE,
    payload: size
  };
}
