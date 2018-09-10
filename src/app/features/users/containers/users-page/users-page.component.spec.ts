import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersPageComponent} from './users-page.component';
import {Store} from '@ngrx/store';
import {MockStore} from '../../../../../tests/mocked-services';
import {State} from '../../users.module.reducers';
import {AddUser, ChangeSearchQuery, EditUser, LoadUsers, RemoveUser} from './users-page.actions';
import {User} from '../../models/user';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>,
    store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Store, useClass: MockStore}
      ],
      declarations: [UsersPageComponent]
    })
      .overrideTemplate(UsersPageComponent, '')
      .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
  });


  it('should dispatch AddUser onAddUser event', () => {
    const user: User = {
      id: 0,
      surname: 'sn',
      phone: '123',
      city: 'Some',
      street: 'Another',
      number: 2,
      birthDate: new Date(2001, 10, 4),
      name: 'test'
    };
    component.onAddUser(user);
    expect(store.dispatch).toHaveBeenCalledWith(new AddUser(user));
  });


  it('should dispatch EditUser onEditUser event', () => {
    const user: User = {
      id: 0,
      surname: 'sn',
      phone: '123',
      city: 'Some',
      street: 'Another',
      number: 2,
      birthDate: new Date(2001, 10, 4),
      name: 'test'
    };
    component.onEditUser(user);
    expect(store.dispatch).toHaveBeenCalledWith(new EditUser(user));
  });

  it('should dispatch RemoveUser onRemoveUser event', () => {
    const user: User = {
      id: 0,
      surname: 'sn',
      phone: '123',
      city: 'Some',
      street: 'Another',
      number: 2,
      birthDate: new Date(2001, 10, 4),
      name: 'test'
    };
    component.onRemoveUser(user);
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveUser(user));
  });

  it('should dispatch ChangeSearchQuery onSearchQueryChange event', () => {
    const searchQuery = 'test';
    component.onSearchQueryChange(searchQuery);
    expect(store.dispatch).toHaveBeenCalledWith(new ChangeSearchQuery(searchQuery));
  });


});
