import {Component, Input, OnInit} from '@angular/core';
import {LinkItem} from './link-item';

@Component({
  selector: 'tt-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  links: LinkItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
