import { Component, OnInit } from '@angular/core';
import { MusicBrainzService } from './music-brainz.service';
import { MusicBrainzArtist } from './music-brainz-artist';
import { MusicBrainzRelease } from './music-brainz-artist';
import { FavouriteArtistService } from '../shared/favourite-artist-service.service';
import { FavouriteArtist } from '../shared/favourite-artist';

@Component({
  selector: 'app-music-brainz',
  templateUrl: './music-brainz.component.html',
  styleUrls: ['./music-brainz.component.css']
})
export class MusicBrainzComponent implements OnInit {

  constructor(private musicBrainzService: MusicBrainzService, private favouriteArtistService : FavouriteArtistService) { }

  ngOnInit() {
  }

  artists: Array<any>;
  searchText: string;
  artistLst: MusicBrainzArtist[] = [];  
  likeImageUrl: string = '../app/images/favorites-icon-blue.png';


  getArtists(artistName: string) {
    console.log(artistName);
    var result = this.musicBrainzService.getArtists(artistName)
      .subscribe(data => {
        this.artists = data.recordings;
        for (var i = 0; i < this.artists.length; i++) {
          var ar = this.artists[i]['artist-credit'][1];
          if (ar) {
            var releases: MusicBrainzRelease[] = [];
            var rel = this.artists[i].releases;
            for (var t = 0; t < rel.length; t++) {
              releases.push({Title : rel[t].title, NumberOfTracks : rel[t]['track-count'], ReleaseLable : rel[t].title, Year: rel[t].date});
              console.log(rel[t]);
            }
            this.artistLst.push({ artistName: ar.artist.name, artistId : ar.artist.id, releases: releases });
          }
        }
      });
  }

  addFavourite(artist: MusicBrainzArtist){
    var favourite: FavouriteArtist = {artistName : artist.artistName, isFavorite: true, releases : artist.releases};
    this.favouriteArtistService.addFavourite(favourite);
  }
}
