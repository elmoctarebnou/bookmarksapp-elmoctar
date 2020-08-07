import $ from 'jquery';
import './src/style.css';
import api from './src/api';
import store from './src/store';
import bookmarksList from './src/bookmarks-list';

const main = () => {
    api.getBookmarksList()
      .then((bookmarks) => {
          bookmarks.forEach(bookmark => store.addBookmark(bookmark));
          bookmarksList.render();
      })

    bookmarksList.bindEventListeners();
    bookmarksList.render();
};

$(main)