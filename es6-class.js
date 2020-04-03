// classes
//OOP with prototypal inheritance

// var Person = function(gender, name) {
//     this.gender = gender;
//     this.name = name;
//     this.walk = function(){
//         console.log('I am walking')
//     }
//     this.speak = function(text){
//         console.log(text);
//     }
// }

// const malePerson = new Person('male', 'Nurseit');
// const femalePerson = new Person('female', 'Aselia');

// es6 Classes.

// class expression
// const User = class{

// }
// class declaration
class Person{
    constructor(name, gender = null){
        this.name = name;
        this.gender = gender;
    }
    walk(){
        console.log('I am walking')
    }
    talk(text){
        console.log(text);
    }
    sayYourName(){
        console.log(this.name);
    }
}
const maleUser = new Person('Azamat');
const female = new Person('Guliza', 'female');

// declaration
class GithubUser {
    followers;
    repositoriesCount;
    url = 'https://api.github.com/users/';
    info;
    constructor(username){
        this.username = username;
    }
    getInfo(){
        this.url = this.url + this.username;
        fetch(this.url)
        .then(response => response.json())
        .then(user => {
            this.info = user;
            console.log(user);
            // this.drawUI(user);
            // getFollowers(user.followers_url);
        })
        .catch(error => {
            console.log("Something went wrong!", error);
        })
    }

    showProgress(elementId){
        const loadingDiv = document.getElementById(elementId);
        loadingDiv.innerText = 'Loading...';
    }

    drawUI(userObject){
        // change image of user.
       this.changeAvatar(userObject.avatar_url);
       // add info about user
       const info = {
           name: userObject.name,
           email: userObject.email,
           location: userObject.location,
           bio: userObject.bio,
           githubUrl: userObject.url
       }
       this.addUserInfo(info);
    }

    addUserInfo(info) {
        let bio = document.createElement('p');
        let infoDiv = document.getElementById('info');
        bio.innerText = info.bio;
        infoDiv.appendChild(bio);
    }

    changeAvatar(src){
        let avatarImg = document.querySelector('#avatar');
        avatarImg.src = src;
    }

    getFollowers(){
        fetch(this.info.followers_url)
        .then(response => response.json())
        .then(followers => {

            followers = followers;
            console.log(followers);
        })
        .catch( err => console.log(`Something went wrong!,        ${err}`));
    }
    
}

class FaceBookUsers extends GithubUser{
    constructor(username){
        super(username)
    }

    getPictures(){
    }

    getPosts() {
    }
}

var fbuser = new FaceBookUsers('Aidar');


const azamat = new GithubUser('azamatrashidbekov');
azamat.drawUI();

const aidai = new GithubUser('saruwka');

function simpleFunction(){
    console.log('i am simple function');
}

// es6 generators;

function* generateusers() {
    const azamat = new GithubUser('azamatrashidbekov');
    azamat.getInfo();

    yield 'I am generator';

    yield 'I am used to generate different output every time you call me, until done';
}

let searchInput = document.getElementById('search');

searchInput.addEventListener('input', event => {
    if (event.target.id === 'search' && event.target.value.length > 2) {
        let submitButton = document.getElementById('submitBtn');
        submitButton.disabled = false;
    }
})
const validateAndSubmit = event => {
    console.log(event);
    event.preventDefault();
    var url = event.target.action;
    var username = event.target.elements.search.value;
    var user = new GithubUser(username);
    
    // url = url + username;
    user.getInfo(url);
    // user = getUser(url);
}
var formById = document.getElementById('form');
formById.addEventListener('submit', validateAndSubmit);

// element becomes an Object;
// a property of that object


