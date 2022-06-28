import { ErrorHandler } from "./errors.js";
import { WebAPI } from "./webfuncs.js";


// window.dispatchEvent(new Event('unhandledrejection'));
window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    ErrorHandler(event);
});



const App = new WebAPI("https://jsonplaceholder.typicode.com");

App.controls.dashboard      = document.querySelector("main");
App.controls.mainForm       = document.querySelector("form");
App.controls.buttonGetUsers = document.querySelector("form button[name='users']");
App.controls.buttonGetPosts = document.querySelector("form button[name='posts']");


App.controls.mainForm.addEventListener("submit", event => {
    event.preventDefault();
}, false);


App.controls.buttonGetUsers.focus();
App.controls.buttonGetUsers.addEventListener("click", event => {
    event.preventDefault();
    App.getUsers();
    App.controls.buttonGetPosts.disabled = true;
}, false);


App.controls.dashboard.addEventListener("click", event => {
    event.preventDefault();
    let item;

    if ( event.target && event.target.nodeName === "DIV" ) {
        item = parseInt(event.target.dataset.id);
    } else if ( event.target && event.target.nodeName === "B" ) {
        item = parseInt(event.target.parentNode.dataset.id);
    }

    if ( item ) {
        App.getUserInfo(item);
        App.controls.buttonGetPosts.setAttribute("data-id", item);
        App.controls.buttonGetPosts.disabled = false;
    }
}, false);


App.controls.buttonGetPosts.addEventListener("click", event => {
    event.preventDefault();
    App.getUserPosts(parseInt(event.target.dataset.id));
    App.controls.buttonGetPosts.disabled = true;
}, false);
