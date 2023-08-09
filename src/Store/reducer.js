import StorageManager from "../Utility/StorageManager/StorageManager";
import { HAS_LOADED, SET_ITEM_LIST } from "./action";

const initalState = {
  has_loaded: false,
  item_list: [],
};

// Check the the videos that have been watched.

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case HAS_LOADED:

      return {
        ...state,
        has_loaded: true,
      };
    case SET_ITEM_LIST:
      let updatedState = {
        ...state,
        item_list: action.item_list,
      };
      StorageManager.save(updatedState);

      return updatedState;
    default:
      return state;
  }
};
