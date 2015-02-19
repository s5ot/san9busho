import keyMirror from "keymirror";

module.exports = {
  ActionTypes: keyMirror({
    SEARCH_BY_NAME: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
