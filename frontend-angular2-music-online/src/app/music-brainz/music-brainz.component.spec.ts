/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicBrainzComponent } from './music-brainz.component';

describe('MusicBrainzComponent', () => {
  let component: MusicBrainzComponent;
  let fixture: ComponentFixture<MusicBrainzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicBrainzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicBrainzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
