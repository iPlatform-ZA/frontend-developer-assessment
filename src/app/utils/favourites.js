import { remove } from 'lodash';

class Favourites {
    static getFavourites(type){
        let current = window.localStorage.getItem(type);
        current = current ? JSON.parse(current) :  [];
        return current;
    }

    static saveFavourite(fav, type){
        let current = Favourites.getFavourites(type);
        current.push(fav);
        window.localStorage.setItem(type, JSON.stringify(current));    
        return true;
    }

    static remove(release, type) {
        let current = Favourites.getFavourites(type);
        remove(current, release);
        window.localStorage.setItem(type, JSON.stringify(current));
    }
}

export default Favourites;
