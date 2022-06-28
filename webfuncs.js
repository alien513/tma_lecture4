import { CustomError } from "./errors.js";

export { WebAPI };

class WebAPI {

    controls = {
        dashboard: null,
        mainForm: null,
        buttonGetUsers: null,
        buttonGetPosts: null,
    };

    constructor(url) {
        this.url = url;
        this.escHTML = document.createElement("b");
    }

    async getURL(url) {
        const response = await fetch(url);
        if ( !response.ok ) {
            throw new CustomError("HTTP Error",
                response.status + " - " + response.statusText + " [ " + response.url + " ]",
                response
            );
        }

        const json = await response.json();
        if ( !json ) {
            console.log(response);
            throw new CustomError("JSON Error", "JSON Parsing Error", response);
        }

        return json;
    }

    // High performance escape HTML code [ https://jsperf.com/htmlencoderegex/93 ]
    escapeHTML(data) {
        if ( !data ) { return ''; }
        this.escHTML.textContent = data;
        return this.escHTML.innerHTML;
    }

    clearDashboard() {
        this.controls.dashboard.innerHTML = "";
    }


    async getUsers() {
        let data = await this.getURL(this.url + "/users/");
        this.renderUsers(data);
    }

    renderUsers(data) {
        console.log(data);
        this.clearDashboard();

        let item;
        for ( let i = 0; i < data.length; i++ ) {
            item = document.createElement("div");
            item.setAttribute("data-id", this.escapeHTML(data[i].id));
            item.innerHTML = "<b>Name:</b> " + this.escapeHTML(data[i].name)
                + "<br /><b>Email:</b> " + this.escapeHTML(data[i].email)
                + "<br /><b>Phone:</b> " + this.escapeHTML(data[i].phone);
            this.controls.dashboard.append(item);
        }
    }


    async getUserInfo(id) {
        let data = await this.getURL(this.url + "/users/" + id);
        this.renderUserInfo(data);
    }

    renderUserInfo(data) {
        console.log(data);
        this.clearDashboard();

        let item = document.createElement("div");
        item.setAttribute("data-uid", this.escapeHTML(data.id));
        item.innerHTML = "<b>ID:</b> " + this.escapeHTML(data.id)
            + "<br /><b>Name:</b> " + this.escapeHTML(data.name)
            + "<br /><b>Email:</b> " + this.escapeHTML(data.email)
            + "<br /><b>Phone:</b> " + this.escapeHTML(data.phone)
            + "<br /><b>Website:</b> " + this.escapeHTML(data.website)
            + "<br /><b>Username:</b> " + this.escapeHTML(data.username)
            + "<br /><b>Company name:</b> " + this.escapeHTML(data.company.name) + "<br />"
            + "<br /><b>Address:</b> " + this.escapeHTML(data.address.zipcode) + ", "
            + this.escapeHTML(data.address.city) + ", "
            + this.escapeHTML(data.address.street) + ", "
            + this.escapeHTML(data.address.suite);
        this.controls.dashboard.append(item);
    }


    async getUserPosts(uid) {
        console.log("Getting user posts, uid = ", uid);
        let data = await this.getURL(this.url + "/posts?userId=" + uid);
        this.renderUserPosts(data);
    }

    renderUserPosts(data) {
        console.log(data);
        this.clearDashboard();
        let item;
        for ( let i = 0; i < data.length; i++ ) {
            item = document.createElement("div");
            item.classList.add("post");
            item.setAttribute("data-postid", this.escapeHTML(data[i].id));
            item.setAttribute("data-uid", this.escapeHTML(data[i].userId));
            item.innerHTML = "<b>Post ID:</b> " + this.escapeHTML(data[i].id)
                + "<br /><b>Title:</b> " + this.escapeHTML(data[i].title)
                + "<br /><b>Body:</b> " + this.escapeHTML(data[i].body);
            this.controls.dashboard.append(item);
        }
    }
};
