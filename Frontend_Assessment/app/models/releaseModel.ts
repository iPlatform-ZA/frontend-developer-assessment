import { Injectable } from '@angular/core';

import * as _ from "lodash";

@Injectable()
export class Release 
{
    constructor(identifier: string, title: string, date: string, label: string, trackCount: number)
    {
        var titleArray = _.split(title, ',');
        var titleInfo = _.first(titleArray);

        this.Title = title;
        this.ReleaseYear = date != undefined ? String(new Date(date).getFullYear()) : '';
        this.Label = label;
        this.Identifier = identifier;
        this.TrackCount = trackCount != undefined ? trackCount : 0;
    }

    public Identifier : string;
    public Title: string;
    public Label: string;
    public ReleaseYear: string;
    public TrackCount: number;

    public $favourited: boolean = false;
}