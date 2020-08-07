"use strict";
import bookmarksList from "./bookmarks-list";

const baseUrl = "https://thinkful-list-api.herokuapp.com/el";

/**
 * listApiFetch - Wrapper function for native `fetch` to standardize error handling.
 * @param {string} url
 * @param {object} options
 * @returns {Promise} - resolve on all 2xx responses with JSON body
 *                    - reject on non-2xx and non-JSON response with
 *                      Object { code: Number, message: String }
 */

const fetchBookmarks = (...endPointUrl) => {
  let error;
  return fetch(...endPointUrl)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const getBookmarksList = () => {
  const endPointUrl = `${baseUrl}/bookmarks`;
  return fetchBookmarks(endPointUrl);
};

const creatBookmark = (bookmark) => {
  console.log("creating new bookmark and posting it on api");
  const newBookmark = JSON.stringify(bookmark);
  console.log(newBookmark);
  return fetchBookmarks(`${baseUrl}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newBookmark,
  });
};
const updateBookmark = (id, updatedBookmark) => {
  const newData = JSON.stringify(updatedBookmark);
  return fetchBookmarks(`${baseUrl}/bookmarks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: newData,
  });
};

const deleteBookmark = (id) => {
  const endPointUrl = `${baseUrl}/bookmarks/${id}`;
  return fetchBookmarks(endPointUrl, {
    method: "DELETE",
  });
};

export default {
  getBookmarksList,
  creatBookmark,
  updateBookmark,
  deleteBookmark,
};
