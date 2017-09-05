const ACTIONS = {
  SET_IS_EDITING: "STATUS_SET_IS_EDITING",
  SET_FILENAME: "STATUS_SET_FILENAME"
};

const StatusReducer = (state = {}, action) => {
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
