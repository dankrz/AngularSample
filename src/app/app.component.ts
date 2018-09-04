import {Component, OnInit} from '@angular/core';
import {LinkItem} from './core/components/navigation-bar/link-item';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Top Trucks';
  navLinks: LinkItem[];

  constructor() {
    this.navLinks = [
      {
        name: 'Trucks',
        url: 'trucks'
      },
      {
        name: 'Users',
        url: 'users'
      }
    ];
  }

  ngOnInit(): void {
  }


}
