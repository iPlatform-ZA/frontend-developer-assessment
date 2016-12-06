import { Component, Input } from '@angular/core';
@Component({
  selector: 'search-control',
  template: '<div class="col-lg-6"><div class="input-group"><input class="form-control" placeholder="Search for..." [(ngModel)]="searchField" /><span class="input-group-btn"><button class="btn btn-default" type="button" (click)="search()" ><i class="fa fa-search" aria-hidden="true"></i></button></span></div></div>'
})
export class SearchComponent {
    @Input() onSearch: Function;
    @Input() searchField: string = '';

    public search()
    {
        this.onSearch(this.searchField);
    }
 }
