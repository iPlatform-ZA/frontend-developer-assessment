/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';
import { IArtistInputs } from '../Model/iartistInputs';

import { MusicBrainzComponent } from './music-brainz.component';
import { MusicbrainzService } from '../service/MusicBrainz/musicbrainz.service';

import {mockMusicbrainzService} from '../Mocks/mock-MusicBrainzService';


import { IMusicBrainzArtists } from '../Model/IMusicBrainzArtists';
import { IMusicBrainzArtistReleases } from '../Model/iMusicBrainzArtistReleases';

import { HttpModule } from '@angular/http';
import { ARTISTS } from '../Mocks/mock-iartist';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

describe('MusicBrainzComponent', () => {
  let component: MusicBrainzComponent;
  let fixture: ComponentFixture<MusicBrainzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicBrainzComponent ],
      imports: [HttpModule],
       providers: [{ provide: MusicbrainzService, useClass:  mockMusicbrainzService}]
    });
    TestBed.overrideComponent(MusicBrainzComponent, {
      set: {
        template: '<div>not testing html</div>'
      }});
    

    TestBed.compileComponents().then(() => {
    fixture = TestBed.createComponent(MusicBrainzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     });
    
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search return artists',async(inject([], () =>{
    component.SearchTerm="jackson five";
    component.Search();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
         //expect(component.artistInputs.artists.length).toBe(ARTISTS.filter(c=>c.name.toLowerCase().includes('jackson five')).length);
      });
  })));

});
