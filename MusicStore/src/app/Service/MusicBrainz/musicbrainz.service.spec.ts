/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusicbrainzService } from './musicbrainz.service';
import { MockBackend } from '@angular/http/testing';

import { HttpModule,Http, Response, Headers, BaseRequestOptions, RequestOptions, ResponseOptions, ResponseType, RequestMethod } from '@angular/http';
import { IMusicBrainzArtists } from '../../Model/IMusicBrainzArtists';
import { IMusicBrainzArtistReleases } from '../../Model/iMusicBrainzArtistReleases';
import { mockMusicBrainzArtist } from '../../Mocks/mock-musicBrainzArtists';
import { mockMusicBrainzArtistReleases } from '../../Mocks/mock-MusicBrainzArtistReleases';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

describe('MusicbrainzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [MusicbrainzService,
      {
      provide: Http,
      useFactory: (mockBackend, options) => {
        return new Http(mockBackend, options);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
    MockBackend,
    BaseRequestOptions]
    });
  });

  it('should ...', inject([MusicbrainzService], (service: MusicbrainzService) => {
    expect(service).toBeTruthy();
  }));

   it('should SearchArtsts(jackson five) return Observable<IMusicBrainzArtists>',
  inject([MusicbrainzService, MockBackend], (service: MusicbrainzService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      let targetUrl = 'http://musicbrainz.org/ws/2/artist/?query=artist:jackson five&fmt=json';
      expect(connection.request.method).toBe(RequestMethod.Get);
      //expect(connection.request.url).toBe(targetUrl);
      connection.mockRespond(new Response(new ResponseOptions({
    body: JSON.stringify(new mockMusicBrainzArtist())
  })));
    });
    let value = new mockMusicBrainzArtist();
    service.SearchForArtist('jackson five').subscribe(
      data =>{
               expect(data.count).toBe(value.count);
               expect(data.artists.length).toBe(value.artists.length);
               expect(data.artists[0].name).toBe(value.artists[0].name);
      }
    )
  }));

   it('should SearchArtsts(jackson five) return error when response is empty',
  inject([MusicbrainzService, MockBackend], (service: MusicbrainzService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
    body: JSON.stringify({})
  })));
    });
    let value = new mockMusicBrainzArtist();
    service.SearchForArtist('jackson five').subscribe(
      data =>{
               
               expect(data.count).not.toBeDefined();
               expect(data.artists).not.toBeDefined();
      },
      error =>{
           fail(error);
      }
    )
  }));

   it('handle error -SearchArtsts - Unknown object',
  inject([MusicbrainzService, MockBackend], (service: MusicbrainzService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: "error object",
        status: 404
      })));
    });
    let value = new mockMusicBrainzArtist();
    service.SearchForArtist('jackson five').subscribe(
      data =>{
               //unknown return data object
      },
      error =>{
           expect(error).not.toBe(null);
      }
    )
  }));

  //test GetArtistReleases
   it('GetArtistReleases(1) should return Observable<IMusicBrainzArtistReleases>',
  inject([MusicbrainzService, MockBackend], (service: MusicbrainzService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      let targetUrl = 'http://musicbrainz.org/ws/2/release?artist=1&inc=labels+media+artist-credits&fmt=json';
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe(targetUrl);
      connection.mockRespond(new Response(new ResponseOptions({
    body: JSON.stringify(new mockMusicBrainzArtistReleases())
  })));
    });
    let value = new mockMusicBrainzArtistReleases();
    service.GetArtistReleases('1').subscribe(
      data =>{
               expect(data.releases.length).toBe(value.releases.length);
               expect(data.releases[0].date).toBe(value.releases[0].date);
               expect(data.releases[0].title).toBe(value.releases[0].title);
               expect(data.releases[0].label).toBe(value.releases[0].label);
               expect(data.releases[0].numberOfTracks).toBe(value.releases[0].numberOfTracks);
               expect(data.releases[0].media).toBe(value.releases[0].media);
      }
    )
  }));
  
});
