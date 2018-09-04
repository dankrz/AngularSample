import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'tt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public gridData: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
     this.gridData = this.userService.getAll();
  }
}
