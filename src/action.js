"use strict";

import dispatcher from "./dispatcher";
import constants from "./constants";
import Rx from "rx";
import jQuery from "jquery";

var ActionTypes = constants.ActionTypes;

module.exports = {
  searchByName(text) {
    var keywordStream = Rx.Observable.returnValue(text);
    var requestStream = Rx.Observable.returnValue("/san9busho.json");
    var responseStream = requestStream
      .flatMap(function(requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
      });

    var filteredStream = responseStream
        .combineLatest(keywordStream,
          function(data, k) {
            var matcher = new RegExp(".*" + k + ".*", "i");
            return data.filter(function(busho) {
              console.log(matcher);
              console.log(busho);
              return busho.name.match(matcher);
            });
          }
        );

        filteredStream.subscribe(
          function(x) {
            dispatcher.handleViewAction({
              type: ActionTypes.SEARCH_BY_NAME,
              bushos: x
            });
          },
          function(err) {
            console.log("error");
          },
          function() {
            console.log("completed");
          }
        );
  }
};
