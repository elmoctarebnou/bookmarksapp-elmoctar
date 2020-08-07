import $ from "jquery";
import "./style.css";
import api from "./api";
import store from "./store";
import bookmarksList from "./bookmarks-list";

const main = () => {
  api.getBookmarksList().then((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarksList.render();
  });

  bookmarksList.bindEventListeners();
  bookmarksList.render();
};

$(main);
