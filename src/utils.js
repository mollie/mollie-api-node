const url = require("url");

// eslint-disable-next-line import/prefer-default-export
export const parseCursorUrl = cursorUrl => url.parse(cursorUrl, true);
