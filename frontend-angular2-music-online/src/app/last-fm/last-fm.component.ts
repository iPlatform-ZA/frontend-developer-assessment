import { Component, OnInit, Input } from '@angular/core';
import { LastFmService } from '../last-fm/last-fm.service';
import { LastFmArtist } from './last-fm-artist';
import { LastFmShortlist } from './last-fm-shortlist';

@Component({
  selector: 'app-last-fm',
  templateUrl: './last-fm.component.html',
  styleUrls: ['./last-fm.component.css']
})
export class LastFmComponent implements OnInit {

  constructor(private lastFmService: LastFmService) { }

  ngOnInit() {
  }

  @Input()
  searchText: string;

  likeImageUrl: string = '../app/images/like-icon.png';

  artists: Array<any>;
  artistLst: LastFmArtist[] = [];
  shortListShown:boolean = true;
  buttonText = "Show short-list";

  getArtists(artistName: string) {
    console.log(artistName);
    var result = this.lastFmService.getArtists(artistName)
      .subscribe(data => {
        this.artists = data.results.artistmatches.artist;
        for (var i = 0; i < this.artists.length; i++) {
          var t = this.getImages(this.artists[i].image);
          this.artistLst.push({ artistName: this.artists[i].name, imgUrl: t['small'], isFavourite: false });
        }
      });
  }

  addShortlist(artist: LastFmArtist) {
    this.lastFmService.addShortlist(artist);
  }

  getImages = (image) => {
    let o: any = {};
    image
      .filter(o => o['#text'])
      .forEach((element, index, array) => o[element.size] = element['#text']);
    return o;
  }

  showShortList(){
    if (this.shortListShown == true){
      this.shortListShown = false;
      this.buttonText = "Hide short-list";
    }
    else{
      this.shortListShown = true;
      this.buttonText = "Show short-list";
    }
  }

}
