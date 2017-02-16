import { Pipe, PipeTransform } from '@angular/core';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';

@Pipe({
  name: 'ArtistExistPipe'
})
export class ArtistExistPipe implements PipeTransform {

  transform(artists: IArtist[], artistId: string): boolean {

    if(typeof artists.length  == 'undefined'){
      console.log(artists  + ' false');
      return false;
    }
    else{
      console.log("length:"+ artists.length);
     let artist =artists.filter(c=>c.id===artistId)[0];
     if(artist != null){
     return false;
    }
    else
       return true;
    }

  }

}
