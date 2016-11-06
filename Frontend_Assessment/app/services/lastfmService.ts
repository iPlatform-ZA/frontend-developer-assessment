import { Injectable } from '@angular/core';
import { RestService } from './restService'
import { Artist } from '../models/artistModel'

import * as _ from "lodash";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LastFMService {
    private baseUrl: string = 'http://ws.audioscrobbler.com/2.0/';
    private apiKey: string = '6b4bb7fd92d1246dd0bd8d38516e56d0';

    constructor(private restService: RestService) { }

    public artistSearch(artist: string) {
        var url = '?method=artist.search&artist=' + artist + '&api_key=' + this.apiKey + '&format=json';

        return this.restService.get(this.baseUrl + url, 'json').toPromise()
            .then(response => {
                return _.map(response.results.artistmatches.artist, function (m: any) { return new Artist(m.mbid, m.name, m.url, _.find(m.image, function (x: any) { return x.size == 'large' })['#text']) });
            });
    }
}