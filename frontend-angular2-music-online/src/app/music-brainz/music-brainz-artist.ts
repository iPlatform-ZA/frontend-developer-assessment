export class MusicBrainzArtist {
    artistName : string;
    artistId : string;
    releases : MusicBrainzRelease[];
    
}

export class MusicBrainzRelease{
    Year : string;
    Title : string;
    ReleaseLable : string;
    NumberOfTracks : string;
}
