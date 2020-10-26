"use strict";

const store = {
  bookmarks: [
    {
      id: "7ddr",
      title: "El Moctar Ebnou",
      rating: 5,
      url: "https://www.elmoctarebnou.com",
      desc: "Portfolio",
      expanded: false,
    },
  ],
  error: null,
  adding: false,
  filter: 0,
};
const findById = (id) => {
  return store.bookmarks.find((currentItem) => currentItem.id === id);
};

const addBookmark = (item) => {
  store.bookmarks.push(item);
};

const toggleExpandBookmark = (id) => {
  const expandeBookmark = this.findById(id);
  expandeBookmark.expanded = !expandeBookmark.expanded;
};

const findAndDelete = (id) => {
  store.bookmarks = store.bookmarks.filter(
    (currentItem) => currentItem.id !== id
  );
};

const findAndUpdate = (id, newData) => {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const setError = (error) => {
  this.store.error = error;
};

export default {
  store,
  findById,
  addBookmark,
  toggleExpandBookmark,
  findAndDelete,
  findAndUpdate,
  setError,
};
