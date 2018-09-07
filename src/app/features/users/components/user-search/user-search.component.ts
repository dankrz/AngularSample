import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'tt-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  @Input()
  query: string;

  @Output()
  queryChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  public onSearchInput(event: any): void {
    const newQuery = event.target.value;
    this.queryChange.emit(newQuery);
  }

  public onClearClick(event: any) {
    this.queryChange.emit('');
  }

}
