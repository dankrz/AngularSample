import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {UserService} from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
    ]),
    GridModule,
  ],
  providers: [UserService],
  declarations: [UserListComponent]
})
export class UsersModule { }
