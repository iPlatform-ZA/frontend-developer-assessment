
import { IArtist } from './iartist';
import { IRelease } from './irelease';
import { FavouritesEnum } from './FavouritesEnum';
  
  export interface IArtistInputs{
      ShowReleaseInfo: boolean;
      artists:Array<IArtist>;
      favouriteOptions: FavouritesEnum;
      showShortList: boolean;     
 }