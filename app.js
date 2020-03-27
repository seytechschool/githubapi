'use strict';

console.log('connected');
var user = {
    login: "Janatbek",
    id: 16279325,
    node_id: "MDQ6VXNlcjE2Mjc5MzI1",
    avatar_url: "https://avatars1.githubusercontent.com/u/16279325?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Janatbek",
    html_url: "https://github.com/Janatbek",
    followers_url: "https://api.github.com/users/Janatbek/followers",
    following_url: "https://api.github.com/users/Janatbek/following{/other_user}",
    gists_url: "https://api.github.com/users/Janatbek/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Janatbek/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Janatbek/subscriptions",
    organizations_url: "https://api.github.com/users/Janatbek/orgs",
    repos_url: "https://api.github.com/users/Janatbek/repos",
    events_url: "https://api.github.com/users/Janatbek/events{/privacy}",
    received_events_url: "https://api.github.com/users/Janatbek/received_events",
    type: "User",
    site_admin: false,
    name: "Janatbek",
    company: null,
    blog: "janatbek.us",
    location: "Boise",
    email: null,
    hireable: true,
    bio: "Excellent analytical and problem-solving skills. Passionate about building robust applications with a team of diversely talented, dedicated engineers.",
    public_repos: 165,
    public_gists: 3,
    followers: 19,
    following: 27,
    created_at: "2015-12-13T18:27:44Z",
    updated_at: "2020-03-26T20:32:25Z"
}

// global variables setup: 
var imagesCollection = document.images;
var imagesArray = Array.from(imagesCollection);
/*
document.images; = HTML collection, not array.
you cannot use arrays built in methods. 
therefor use Array.from to create an array.
*/

// Submit Event

var formById = document.getElementById('form');
var searchInput = document.getElementById('search');
var followers = [];

searchInput.addEventListener('input', function(event){
    console.log(event)
    if (event.target.id === 'search' && event.target.value.length > 2) {
        var submitButton = document.getElementById('submitBtn');
        submitButton.disabled = false;
    }
})

formById.addEventListener('submit', validateAndSubmit);

function validateAndSubmit(event) {
    console.log(event);
    event.preventDefault();
    var url = event.target.action;
    var username = event.target.elements.search.value;
    url = url + username;
    user = getUser(url);
}

function drawUI(userObject) {
    // change image of user.
   changeAvatar(userObject.avatar_url);
   // add info about user
   var info = {
       name: userObject.name,
       email: userObject.email,
       location: userObject.location,
       bio: userObject.bio,
       githubUrl: userObject.url
   }
   addUserInfo(info);
}
// change image.
function changeAvatar(src) {
    var avatar = imagesArray.find(function(item) {
        return item.id === 'avatar';
    })
    // if didn;t find, its undefined. 

    if(avatar) {
        avatar.src = src;
    }
}

function addUserInfo(info) {
    var bio = document.createElement('p');
    var infoDiv = document.getElementById('info');
    bio.innerText = info.bio;
    infoDiv.appendChild(bio);
}

function getUser(url) {
    var loadingDiv = document.getElementById('loading');
    loadingDiv.innerText = 'Loading ...';
    
    fetch(url)
        .then(function (response) {
            loadingDiv.innerText = 'success, response code is ' + response.status;
            return response.json();
        })
        .then(function(user) {
            console.log(user);
            drawUI(user);
            getFollowers(user.followers_url);
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
            loadingDiv.innerText = err;
            loadingDiv.style.background = 'red';
        });
}


function getFollowers(followers_url) {
    fetch(followers_url)
        .then(function(response){
            return response.json();
        })
        .then(function(followers){
            followers = followers;
            console.log(followers);
            for (var i = 0; i < followers.length; i++) {
                if(followers[i].login === 'maratgaip'){
                    var p = document.createElement('p');
                    p.innerText = 'My Teacher is ' + followers[i].login;
                    var infoDiv = document.getElementById('info');
                    infoDiv.appendChild(p);
                }
            }
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}
// drawUI(user);
// delete drawUI;