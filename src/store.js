"use strict";

import constants from "./constants";
import dispatcher from "./dispatcher";
import EventEmitter from "events";
import assign from "object-assign";

var ActionTypes = constants.ActionTypes;
var CHANGE_EVENT = "change";
var bushos = [];

var BushoStore = assign({}, EventEmitter.EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListner(CHANGE_EVENT, callback);
  },

  getAll() {
    return bushos;
  }
});

BushoStore.dispatchToken = dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SEARCH_BY_NAME:
      bushos = action.bushos;
      BushoStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = BushoStore;
