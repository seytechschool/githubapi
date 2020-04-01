// 'use strict';

// let, var,  const.

console.log(User);

// global variables setup: 
const imagesCollection = document.images;
const imagesArray = Array.from(imagesCollection);
const imagesArrayShortcut = [...imagesCollection];
/*
document.images; = HTML collection, not array.
you cannot use arrays built in methods. 
therefor use Array.from to create an array.
*/

// Submit Event

let formById = document.getElementById('form');
let searchInput = document.getElementById('search');
let followers = [];


searchInput.addEventListener('input', event => {
    if (event.target.id === 'search' && event.target.value.length > 2) {
        let submitButton = document.getElementById('submitBtn');
        submitButton.disabled = false;
    }
})



let validateAndSubmit = event => {
    console.log(event);
    event.preventDefault();
    let url = event.target.action;
    let username = event.target.elements.search.value;
    url = url + username;
    let azamat = new User('Azamat', 'Rashidbekov');
    console.log(azamat);
    azamat.getGithubInfo(url);
    // getUser(url);
}

formById.addEventListener('submit', validateAndSubmit);

let drawUI = userObject => {
    // change image of user.
   changeAvatar(userObject.avatar_url);
   // add info about user
   let info = {
       name: userObject.name,
       email: userObject.email,
       location: userObject.location,
       bio: userObject.bio,
       githubUrl: userObject.url
   }
   addUserInfo(info);
}

let avatarName = 'avatar';

let changeAvatar = src => {
    let avatar = imagesArray.find(item => item.id === avatarName);
    // if didn;t find, its undefined. 

    if(avatar) {
        avatar.src = src;
    }
}

const addUserInfo = info => {
    let bio = document.createElement('p');
    let infoDiv = document.getElementById('info');
    bio.innerText = info.bio;
    infoDiv.appendChild(bio);
}

const getUser = url => {
    let loadingDiv = document.getElementById('loading');
    loadingDiv.innerText = 'Loading ...';
    
    fetch(url)
        .then(response => response.json())
        .then(user => {
            console.log(user);
            drawUI(user);
            getFollowers(user.followers_url);
        })
        .catch(error => {
            console.log("Something went wrong!", error);
            loadingDiv.innerText = error;
            loadingDiv.style.background = 'red';
        })
}

const getFollowers = followers_url => {
    fetch(followers_url)
        .then(response => response.json())
        .then(followers => {

            followers = followers;
            console.log(`your followers 
            
            
            ${followers}`);
            for (let i = 0; i < followers.length; i++) {
                if(followers[i].login === 'maratgaip'){
                    let p = document.createElement('p');
                    p.innerText = 'My Teacher is ' + followers[i].login;
                    let infoDiv = document.getElementById('info');
                    infoDiv.appendChild(p);
                }
            }
        })
        .catch( err => console.log(`Something went wrong!,        ${err}`));
}
