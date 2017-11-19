import { getPictographsByQuery } from "../services/Api";
import Store from "./Store";

const ACTIONS = {
  GET: "PICTOGRAPHS_GET",
  LOADING: "PICTOGRAPHS_LOADING"
};

const defaultState = {
  pictographs: [],
  isLoading: false
};

// Spanish language id.
const DEFAULT_LANGUAGE_ID = "58fa1b203852d50029a048a7";

const PictographsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.GET: {
      state = {
        ...state,
        pictographs: action.payload,
        isLoading: false
      };
      break;
    }
    case ACTIONS.LOADING: {
      state = {
        ...state,
        isLoading: true
      };
    }
  }

  return state;
};

export default PictographsReducer;

/**
 * Obtains pictographs by a given query.
 * @param {string} query Query to find pictographs.
 */
export function getPictographs(query) {
  Store.dispatch({
    type: ACTIONS.LOADING
  });

  return async dispatch => {
    const pictographs = await getPictographsByQuery(
      query.toLowerCase(),
      DEFAULT_LANGUAGE_ID
    );

    dispatch({
      type: ACTIONS.GET,
      payload: pictographs
    });
  };
}
