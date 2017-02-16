import { Component, OnInit, Input  } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';
import { IArtistInputs } from '../Model/iartistInputs';
import { ILabel } from '../Model/iLabel';
import { ILabelInfo } from '../Model/ilableInfo';
import { IMedia} from '../Model/iMedia';

import { MusicbrainzService } from '../service/MusicBrainz/musicbrainz.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'] ,
   providers: [MusicbrainzService ]
})
export class ArtistComponent implements OnInit {
  Show: boolean= true;
  activeArtist:IArtist;
  ShowShortList: boolean;
  ShortList:IArtist[];
  Releases: IRelease[];
  YearDateFormat: string;

  constructor(private musicbrainzService: MusicbrainzService, 
              private localStorageService: LocalStorageService) {
    this.activeArtist = <IArtist>{ id:'0'};   
    this.ShowShortList = false; 
    this.ShortList = []; 
    this.Releases = [];  
    this.YearDateFormat="y";  
   }

  ngOnInit() {

    console.log(this.artistInputs.artists.length);
    console.log(this.artistInputs.favouriteOptions);
  }

  @Input() artistInputs: IArtistInputs = <IArtistInputs>{ 
    ShowReleaseInfo: false,
      artists:[],
      favouriteOptions: FavouritesEnum.None,
      showShortList: false,      
  }

  ShowRelease(selectedArtist:IArtist){
     console.log("Enter: ShowRelease");
     this.activeArtist=selectedArtist as IArtist;
     console.log(this.activeArtist.id);
     this.musicbrainzService.GetArtistReleases(this.activeArtist.id).subscribe(
       data =>{
         this.Releases = new Array<IRelease>();
         data.releases.forEach(item=>{
             this.Releases.push(<IRelease>{ date:item.date,
              title: item.title,
              label: this.GetLabels(item as IRelease),
              numberOfTracks: this.CountNumberOfTracks(item.media)
             });
             
          });
          
      },
       error =>{ console.log(error)}
     );
  }

  private GetLabels(release:IRelease): string{
     let labelNames:string="";
     let labels: ILabelInfo[]=release["label-info"];
     if(labels.length>0){
       labels.forEach(item=>{
         if(item.label!=null){
            labelNames=labelNames+item.label.name;
         }
       });
     } 
    
    return labelNames;
  }

  private CountNumberOfTracks(medias:IMedia[]): number{
    let count: number =0;
    medias.forEach(item=>{
      count = count + item["track-count"];
    })
    return count;
  }

  private HideRelease(){
    this.activeArtist = <IArtist>{ id:'0'};
  }

  private AddToFavoutires(artist: IArtist): void{
       this.localStorageService.set(artist.id, artist);
  }

  private RemoveFromFavoutires(artist: IArtist): void{
    this.artistInputs.artists.splice(this.artistInputs.artists.indexOf(artist),1);
    this.localStorageService.remove(artist.id);
  }

  ShowList(){
    this.ShowShortList= this.ShowShortList? false : true;
    console.log(this.ShowShortList);
  }

  AddToShortList(artist: IArtist){
    this.ShortList.push(artist);
    this.artistInputs.artists.splice(this.artistInputs.artists.indexOf(artist),1);
    console.log(this.ShortList.length);      
  }

}
