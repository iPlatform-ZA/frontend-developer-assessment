import { Injectable } from '@angular/core';
import { RestService } from './restService'
import { Artist } from '../models/artistModel'
import { Release } from '../models/releaseModel'

import * as _ from "lodash";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicBrainzService {
    private baseUrl: string = 'http://musicbrainz.org/ws/2/';

    constructor(private restService: RestService) { }

    public getArtists(artistName: string) {
        return this.restService.get(this.baseUrl + 'artist/?query=artist:' + artistName, 'xml').toPromise()
            .then(response => _.map(response.metadata['artist-list'].artist, function (m: any) { return new Artist(m.id, m.name) }));
    }

    public getArtistReleases(identifier: string) {
        return this.restService.get(this.baseUrl + 'release/?query=arid:' + identifier, 'xml').toPromise()
            .then(response =>
                _.map(response.metadata['release-list'].release, function (m: any) {
                    var label = '';

                    if(m['label-info-list'] != undefined )
                        if (m['label-info-list']['label-info'].length != undefined) {
                            label = _.first(m['label-info-list']['label-info'])['label']['name'];
                        }
                        else {
                            label = m['label-info-list']['label-info']['label']['name'];
                        }

                    return new Release(m.id, m.title, m.date != undefined ? m.date : null, label, m['medium-list']['track-count'])
                })
            );
    }
}