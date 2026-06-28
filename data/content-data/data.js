const BASE_PATH =
  window.location.pathname.includes("/activities/") ||
  window.location.pathname.includes("/blog/") ||
  window.location.pathname.includes("/volanteer/")
    ? "../"
    : "";

const CONTENT_PATH = `${BASE_PATH}data/content-data/`;
const SEARCH_PATH = `${BASE_PATH}data/search-data/`;
const SCAM_ALERTS = [];

function loadContentData(files) {
  files.forEach((file) => {
    document.write(`<script src="${CONTENT_PATH}${file}.js"><\/script>`);
  });
}
