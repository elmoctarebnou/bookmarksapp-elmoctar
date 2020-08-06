'use strict';

import $ from 'jquery';
import store from './store';
import api from './api';
import cuid from 'cuid';


const generateBookmarkForm = () => {
    return(`
        <h1>Moctar Bookmark App</h1>
        <form id="new-bookmarks-form" class="">
            <label>Add Bookmark Title:</label>
            <input type="text" id="js-bookmark-title" placeholder="Title" required>
            <label>Add URL:</label>
            <input type="text" id="js-bookmark-url" placeholder="https://elmoctarebnou.github.io/ebnoumoctar/" required>
            <textarea id="js-bookmark-description" placeholder="Add a description (optional)"></textarea>
            <div class="rating">
                <label ><input class= 'radio' name="stars" type="radio" value="1"> 1 Star</label>
                <label ><input class= 'radio' name="stars" type="radio" value="2"> 2 Stars</label>
                <label ><input class= 'radio' name="stars" type="radio" value="3"> 3 Stars</label>
                <label ><input class= 'radio' name="stars" type="radio" value="4"> 4 Stars</label>
                <label ><input class= 'radio' name="stars" type="radio" value="5"> 5 Stars</label>
            </div>
            <div>
                <button id="creat">Creat</button>
                <button id="cancel">Cancel</button>
            </div>
        </form>
    `)
}
const generateMain = () => {
    return(`
        <h1>Moctar Bookmarks App</h1>
        <div class="nav">
            <button type="submit" id="add-new-bookmark" class="add-new-bookmark">Add New</button>
            <select class="filter">
                <option value="0">-- Filter by stars --</option>
                <option value="1">1 Star & up</option>
                <option value="2">2 Stars & up</option>
                <option value="3">3 Stars & up</option>
                <option value="4">4 Stars & up</option>
                <option value="5">5 Stars & up</option>
            </select>
        </div>
        <div class="container">
            <ul class="bookmarks-list js-bookmarks-list">     
            </ul>
        </div>
    `)
}
const generateBookmarksElement = (item) => {
    let count = item.rating;
    const star = '<i class="fas fa-star"></i>';
    let numberOfStars = star.repeat(count);
    return (`
        <li id=${item.id} class="js-bookmark-element">
            <div class="li-top">
                <h3 id='title'>${item.title}</h3>
                <span class="stars">
                ${numberOfStars}
                </span>
                </div>
            <div class="li-bottom hide">
                <div>
                    <p>${item.desc}</p>
                    <a href=${item.url} target='_blank'>Website link</a>
                </div>
                <button id="delete" type="submit">Delete</button>
            </div>
        </li>
    `)
};

const generateError = (message) => {
    return (`
        <section class="error-container">
            <button id="cancel-error">X</button>
            <p>${message}</p>
        </section>
    `);
};

const renderError = () => {
    if (store.error) {
        const renderedError = generateError(store.error);
        $('.error-container').html(renderedError);
    } else {$('.error-container').empty()}
}

const generateBookmarksString = (bookmarksList) => {
    const items = bookmarksList.map((item) => generateBookmarksElement(item));
    return items.join('');
}

const handleCloseError = () => {
    $('.error-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
      });
}
const renderBookmarkForm = () => {
    $('.main').empty();
    $('.main').prepend(generateBookmarkForm);
}


const render = () => {
    let bookmarksList = [...store.store.bookmarks];
    if (store.store.filter > 0){
        bookmarksList = bookmarksList.filter((item) => item.rating >= store.store.filter);
    }
    const bookmarksListString = generateBookmarksString(bookmarksList);
    $('.js-bookmarks-list').html(bookmarksListString);
};

const handleNewBookmarkSubmit = () => {
    $('.main').submit('#creat',(event) => {
        event.preventDefault();
        event.stopPropagation();
        const newBookmarkTitle = $('#js-bookmark-title').val();
        $('#js-bookmark-title').val('');
        const newBookmarkUrl = $('#js-bookmark-url').val();
        $('#js-bookmark-url').val('');
        const newBookmarkDescription = $('#js-bookmark-description').val();
        $('#js-bookmark-description').val('');
        const newBookmarkRating = $('input:radio[name=stars]:checked').val();
        const newBookmarkRatingNumber = parseInt(newBookmarkRating);
        const newBookmarkItem = {
            id: cuid(),
            title: newBookmarkTitle,
            rating:newBookmarkRatingNumber,
            url: newBookmarkUrl,
            desc: newBookmarkDescription,
            expanded: false
        };
        console.log(newBookmarkItem);
        api.creatBookmark(newBookmarkItem)
          .then((newItem) => {
              store.addBookmark(newItem);
              render();
          }) 
        $('.main').empty();
        $('.main').append(generateMain) 
        render();
    });
};

const handleAddNewButton = () => {
    $('.main').on('click','#add-new-bookmark', (event) => {
        event.preventDefault();
        renderBookmarkForm();
    })
    render();
}
const handleCancelButton = () => {
    $('.main').on('click', '#cancel', (event) => {
        event.preventDefault();
        $('.main').empty();
        $('.main').append(generateMain)
        render();
    })
}
const expandBookmark = () => {
    $('ul').on('click','h3',(event) => {
        event.preventDefault();
        $('.li-bottom').toggleClass('hide');
    })
};

const getItemIdFromElement = (item) => {
    console.log(item[1])
    const itemId = $(item[1]).attr('id');
    return itemId
}

const handleFilterByStars = () => {
    $('select').on('change',() => {
        store.store.filter = $("select option:selected").val();
        render();
    })
}


const handleDeleteBookmarkClicked = () => {
    $('ul').on('click', '#delete' , (event) => {
        event.preventDefault();
        const selectedElement = event.currentTarget;
        const parentTag = $(selectedElement).parentsUntil('ul');
        const id = getItemIdFromElement(parentTag);
        api.deleteBookmark(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            })
            .catch((error) => {
                console.log(error);
                store.setError(error.message);
                renderError();
            });
    })
};

const bindEventListeners = () => {
    handleAddNewButton();
    handleNewBookmarkSubmit();
    handleCancelButton();
    handleDeleteBookmarkClicked();
    expandBookmark();
    handleFilterByStars();
}
export default {
    render,
    bindEventListeners
}