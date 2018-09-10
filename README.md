# AngularSample

AngularSample is an Angular 6 application which has two modules. One module UsersModule for 
adding, removing and editing user information as in requirements. There is as well 
an additional sample module TrucksModule. For each module was used lazy loading with RouterModule.
 
Regarding UsersModule, the model of smart and dummy components is used. 
Two dummy components UserListComponent and UserSearchComponent were created. 
There is a smart component UsersPageComponent which handle business logic. 
For handling changes is used ngrx actions, store, and effects which communicates 
via HttpClient to simple REST services provided by json-server. 
 

## Starting project

1. Start json-server with command: `npm run db`.
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Technologies used
Angular 6.1.5, ngrx (store, effects), rxjs, kendo-ui, bootstrap, json-server, 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

