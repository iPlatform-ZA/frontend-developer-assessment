
import { IRelease } from '../Model/irelease';
import {IMusicBrainzArtistReleases} from '../Model/iMusicBrainzArtistReleases'

export class mockMusicBrainzArtistReleases implements IMusicBrainzArtistReleases{
    releases: IRelease[];
    constructor() {
        this.releases = [<IRelease>{
      date: '2012',
      title: 'The Samuel Jackson Five',
      label: 'Denovali Records',
      numberOfTracks: 11},
      <IRelease>{
      date: '',
      title: 'Sea Sides and Elsewhere',
      label: 'Honest Abe',
   numberOfTracks: 5}];
    }
}