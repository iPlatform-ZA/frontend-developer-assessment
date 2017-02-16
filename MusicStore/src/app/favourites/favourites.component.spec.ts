/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FavouritesComponent } from './favourites.component';
import { LocalStorageService } from 'angular-2-local-storage';

import { mockLocalStorageService} from '../Mocks/mock-LocalStorageService';
import { IArtist } from '../Model/iartist';
import { ARTISTS } from '../Mocks/mock-iartist';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesComponent ],
      providers: [{ provide: LocalStorageService, useClass:  mockLocalStorageService}]
    });

    TestBed.overrideComponent(FavouritesComponent, {
      set: {
        template: '<div>not testing html</div>'
      }});
    

    TestBed.compileComponents().then(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     });
    
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return artists', () =>{
     let artists:IArtist[]=ARTISTS;
     expect(component.artistInputs.artists.length).toBe(artists.length);
         // for (let i in component.artistInputs.artists) {
         expect(component.artistInputs.artists[0].name).toBeDefined();
         //expect(component.artistInputs.artists[i].id).toBe(artists[i].id);
      //}
  });

});
