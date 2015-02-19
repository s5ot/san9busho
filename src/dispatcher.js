import constants from "./constants";
import Dispatcher from "flux";
import assign from "object-assign";

var PayloadSources = constants.PayloadSources;

var dispatcher = assign(new Dispatcher.Dispatcher(), {
  handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = dispatcher;
