export var User = function(){
    let idS = Symbol("id");
    let nameS = Symbol("name");
    let loggedInS = Symbol("loggedIn");

    class userClass{

        constructor(id, name, loggedIn){
            this[idS] = id;
            this[nameS] = name;
            this[loggedInS] = loggedIn == null ? false : loggedIn;
        }

        getLoggedIn(){
            return this[loggedInS];
        }

        setLoggedIn(loggedIn){
            this[loggedInS] = loggedIn;
        }

        getId(){
            return this[idS];
        }
        
        setId(id){
            this[idS] = id;
        }

        getName(){
            return this[nameS];
        }

        setName(name){
            this[nameS] = name;
        }
    }
    return userClass;
}();

export default User;