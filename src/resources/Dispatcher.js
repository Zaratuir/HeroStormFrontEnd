// Adds a hashing algorithm for strings to generate unique IDs from strings.
// This helps make sure that only the store that subscribed can remove itself.
// eslint-disable-next-line
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

class Dispatcher{

    stores;
    dispatching;

    constructor(){
        this.stores = {};
        this.dispatching = false;
        this.subscribe = this.subscribe.bind(this);
        this.remove = this.remove.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    subscribe(name,callback){
        this.stores[name.hashCode()] =
        {
            name: name,
            callback: callback
        }
    }

    remove(id, name){
        if(this.stores[id] != null && id === name.hashCode()){
            delete this.stores[id];
        }
    }

    dispatch(evt){
        if(this.dispatching){
            throw new Error("Cannot Begin New Dispatch While Dispatching");
        }
        this.dispatching = true;
        for(let i in this.stores){
           this.stores[i].callback(evt);
        }
        this.dispatching = false;
    }
}

export const dispatcher = new Dispatcher();