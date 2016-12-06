import { Injectable } from '@angular/core';
import { Release } from '../models/releaseModel'

@Injectable()
export class Artist {
    constructor(identifier: string, name: string, artistUrl: string = '', imageUrl: string = '') {
        this.Name = name;
        this.Identifier = identifier;
        this.Url = artistUrl;
        this.imageUrl = imageUrl;
    }

    public Identifier: string;
    public Name: string;
    public Releases: Release[];
    public Url: string;
    public imageUrl: string;

    public $Hidden: boolean = true;
    public $HasReleases: boolean = false;
    public $added: boolean = false;

    public $favourited: boolean = false;
}