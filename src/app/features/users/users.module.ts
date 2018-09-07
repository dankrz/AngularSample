import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {UserService} from './services/user.service';
import { UsersPageComponent } from './containers/users-page/users-page.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {StoreModule} from '@ngrx/store';
import {reducers} from './users.module.reducers';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './containers/users-page/user-page.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersPageComponent },
    ]),
    GridModule,
    InputsModule,
    PopupModule,
    ButtonsModule,
    StoreModule.forFeature('userModule', reducers),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UserService],
  declarations: [UserListComponent, UsersPageComponent, UserSearchComponent]
})
export class UsersModule { }
