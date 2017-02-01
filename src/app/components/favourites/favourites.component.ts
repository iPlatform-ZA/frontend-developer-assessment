import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {LastFmArtistModel} from '../../LastFmArtistModel';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private favList: LastFmArtistModel[];
  private KEY_STR: string = "favourates";
  private showAlertMessage: string;

  constructor( private _storageService: LocalStorageService) {
    this.initFavourites();
    this.showAlertMessage = "";
  }


  removeFromFav(_id:string )
  {
    var _index :number = this.favList.findIndex(x => x.mbid == _id);
    if(_index >=0) {
      this.favList.splice(_index, 1);
      this.displayMessage("Artist removed to your favorites ");
      this.updateStorage();
    }

  }

  updateStorage()
  {
    var favListString = JSON.stringify(this.favList);
    this._storageService.set(this.KEY_STR, favListString);
  }

  initFavourites()
  {
    var _strFav:any = this._storageService.get(this.KEY_STR);
    this.favList = JSON.parse(_strFav);
  }

  displayMessage(_str:string)
  {
    this.showAlertMessage = _str;
    //setTimeout(function(){ this.showAlertMessage }, 3000); // So not sure if this is necessary
  }

  ngOnInit() {
  }

}
