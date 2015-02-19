import dispatcher from "./dispatcher";
import constants from "./constants";

var ActionTypes = constants.ActionTypes;

module.exports = {
  searchByName(text) {
    dispatcher.handleViewAction({
      type: ActionTypes.SEARCH_BY_NAME,
      text: text
    });
  }
};
