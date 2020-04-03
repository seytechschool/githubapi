

// how to create class
// add construstor
// method super;
// creating methods in class
// generators
function* aizat(){
    yield 1;
    yield 2;
}

var nurseit = aizat();
while(!nurseit.next().done) {
    console.log(nurseit.next().value)
}


class User{
    name = 'janatbek';
    info = 'my user info';
    constructor(type){
        this.type = type;
    }
}

class GithubUser extends User {
    constructor(type){
        super(type);
    }

    getInfo(){
        console.log(this.info);
    }
    getName() {
        console.log(this.name)
    }
}

var yusufates = new GithubUser('muted');

