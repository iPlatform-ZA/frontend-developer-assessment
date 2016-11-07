import { Injectable } from '@angular/core';
import { Artist } from '../models/artistModel'

@Injectable()
export class Favourite {
    public Artists: Artist[];

    constructor() {
        this.Artists = new Array<Artist>(0);
    }
}