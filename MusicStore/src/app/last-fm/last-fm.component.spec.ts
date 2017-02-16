/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IArtistInputs } from '../Model/iartistInputs';
import {LastfmService} from '../Service/LastFM/lastfm.service';

import { LastFmComponent } from './last-fm.component';
import { destroyPlatform } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ARTISTS } from '../Mocks/mock-iartist';
import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';

import { ArtistComponent } from '../artist/artist.component';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

describe('LastFmComponent', () => {
  let component: LastFmComponent;
  let fixture: ComponentFixture<LastFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastFmComponent ],
      imports: [FormsModule],
      providers: [
        { provide: LastfmService}
      ]
    });

    TestBed.overrideComponent(LastFmComponent, {
      set: {
        template: '<div>not testing html</div>'
      }});
    

    TestBed.compileComponents().then(() => {
    fixture = TestBed.createComponent(LastFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     });
  }));

  beforeEach(() => {
    
 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return artists',inject([], () => {
        component.SearchTerm='jackson five';
        component.Search()
       let result:IArtist[] = component.artistInputs.artists;
       expect(result.length).toBe(ARTISTS.filter(c=>c.name.toLowerCase().includes('jackson five')).length);
       for (let i in result) {
         expect(result[i].name).toBe(ARTISTS[i].name);
         expect(result[i].id).toBe(ARTISTS[i].id);
      }
       
       
  }));

  it('should not return artists',inject([], () => {
        component.SearchTerm='jackson fivefive';
        component.Search()
       let result:IArtist[] = component.artistInputs.artists;
       expect(result.length).toBe(ARTISTS.filter(c=>c.name.toLowerCase().includes('jackson fivefive')).length);
       for (let i in result) {
         expect(result[i].name).toBe(ARTISTS[i].name);
         expect(result[i].id).toBe(ARTISTS[i].id);
      }
       
       
  }));
});
