import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

/// <reference path='components.d.ts' />

@Injectable()
export class RestService {
    constructor(private http: Http) { }

    public get(url: string, type: string) {
        if (type == 'xml')
            return this.http.get(url).map(this.extractDataFromXml);
        else 
            return this.http.get(url).map(this.extractData);
    }
    
    private extractDataFromXml(res: Response) {
        return JSON.parse(xml2json(res.text(), '    '));
    }

    private extractData(res: Response) {
        return res.json();
    }
}