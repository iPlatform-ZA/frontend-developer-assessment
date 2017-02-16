import { IArtist } from '../Model/iartist';
import { ARTISTS } from './mock-iartist';

export class mockLocalStorageService{
    artist: IArtist[];
    constructor(){
        this.artist = ARTISTS;
    }

    keys(): string[]{
        let keys : string[] = new Array<string>();

        this.artist.forEach(item=>{
            keys.push(item.id);
        });
        return keys;
    }

    get(key:string): IArtist{
       let artist: IArtist = this.artist.filter(c=>c.id==key)[0];
        return artist;
    }
}