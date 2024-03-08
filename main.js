/*
C - POST - hostname:port/api/v1/products (+data)
R - GET(ALL) - hostname:port/api/v1/products
  - GET(BYID) - hostname:port/api/v1/products/{id}
U - PUT - hostname:port/api/v1/products/{id} (+data)
D - DELETE - hostname:port/api/v1/products/{id}
*/
//axios
var url = "http://localhost:3000/posts";
var globalList;



function Load() {
    fetch(url).then(
        function (response) {
            return response.json();
        }).then(function (posts) {
            posts.sort(Compare);
            globalList = posts;
            let tbody = document.getElementById('tbody');
            tbody.innerHTML = "";
            for (const post of posts) {
                tbody.innerHTML += ConvertFromPostToRow(post);
            }
        })
}
function Compare(a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
    }
    else {
        return -1;
    }
}

function getMaxID() {
    let ids = globalList.map(element => element.id)
    return Math.max(...ids);
}

function Delete(id) {
    fetch(url + "/" + id, {
        method: 'DELETE'
    }).then(function () {
        Load();
    })
}
function Create(data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function () {
        Load()
    })
}

function Edit(id, data) {
    fetch(url + "/" + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function () {
        Load()
    })
}

function Save() {
    let id = parseInt(document.getElementById('id').value);
    if (isNaN(id)) {
        let newItem = {
            id: (getMaxID() + 1) + "",
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            userId: document.getElementById('userid').value,
        }
        Create(newItem);
        //create id = max +1
    } else {
        if (checkExist(id)) {
            let newItem = {
                title: document.getElementById('title').value,
                body: document.getElementById('body').value,
                userId: document.getElementById('userid').value,
            }
            Edit(id, newItem);
        } else {
            let newItem = {
                id: id + "",
                title: document.getElementById('title').value,
                body: document.getElementById('body').value,
                userId: document.getElementById('userid').value,
            }
            Create(newItem);
        }
    }
}

function checkExist(id) {
    let ids = globalList.map(function (element) {
        return element.id
    })
    return ids.includes(id + '');
}

function ConvertFromPostToRow(post) {
    let string = '<tr>';
    string += "<td>" + post.id + "</td>";
    string += "<td>" + post.userId + "</td>";
    string += "<td>" + post.title + "</td>";
    string += "<td>" + post.body + "</td>";
    string += '<td><button onclick="Delete(' + post.id + ')">Delete</button></td>';
    string += '</tr>'
    return string;
}