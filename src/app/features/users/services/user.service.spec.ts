import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule} from '../../../../../node_modules/@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {User} from '../models/user';
import {UserDto} from '../models/user-dto';
import {parseDate} from '@progress/kendo-angular-intl';

describe('UserService', () => {

  const apiUrl = 'http://localhost:3000/users';
  let http: HttpClient,
    testUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        HttpClientTestingModule
      ]
    });

    http = TestBed.get(HttpClient);
    testUser = {
      name: 'name',
      birthDate: new Date('2010-06-10'),
      city: 'Wro',
      id: 6,
      number: 2,
      phone: '123',
      street: 'narrow',
      surname: 'surname'
    };
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));


  it('convertFromUserToDto convert date to string and keeps other fields', inject([UserService], (service: UserService) => {


    const actualDto = UserService.convertFromUserToDto(testUser);
    expect(actualDto.name).toEqual(testUser.name);
    expect(actualDto.birthDate).toEqual('10-06-2010');
    expect(actualDto.number).toEqual(testUser.number);
    expect(actualDto.street).toEqual(testUser.street);
    expect(actualDto.city).toEqual(testUser.city);
    expect(actualDto.phone).toEqual(testUser.phone);
    expect(actualDto.surname).toEqual(testUser.surname);
    expect(actualDto.id).toEqual(testUser.id);
  }));


  it('convertFromUserToDto convert date to string and keeps other fields', inject([UserService], (service: UserService) => {
    const dto: UserDto = {
      id: 1,
      surname: 'sn',
      phone: '123',
      city: 'city',
      street: 'street',
      number: 2,
      birthDate: '11-03-2012',
      name: 'name2'
    };
    const expectedUser: User = {
      id: 1,
      surname: 'sn',
      phone: '123',
      city: 'city',
      street: 'street',
      number: 2,
      birthDate: parseDate(dto.birthDate, 'dd-MM-yyyy'),
      name: 'name2'
    };

    const actualUser = UserService.convertFromDtoToUser(dto);
    expect(actualUser).toEqual(expectedUser);
  }));


  it('add method calls post method with converted object', inject([UserService], (service: UserService) => {
    const testUserDto = UserService.convertFromUserToDto(testUser);
    spyOn(http, 'post').and.returnValue(of(testUser));
    service.add(testUser);
    expect(http.post).toHaveBeenCalledWith(apiUrl, testUserDto);
  }));

  it('remove method calls delete method ', inject([UserService], (service: UserService) => {
    spyOn(http, 'delete');
    service.remove(testUser);
    expect(http.delete).toHaveBeenCalledWith(apiUrl + `/${testUser.id}`);
  }));

  it('edit method calls put method with converted object', inject([UserService], (service: UserService) => {
    const testUserDto = UserService.convertFromUserToDto(testUser);
    spyOn(http, 'put').and.returnValue(of(testUser));
    service.edit(testUser);
    expect(http.put).toHaveBeenCalledWith(apiUrl + `/${testUserDto.id}`, testUserDto);
  }));


  it('getAll method calls get', inject([UserService], (service: UserService) => {
    spyOn(http, 'get').and.returnValue(of([testUser]));
    service.getAll();
    expect(http.get).toHaveBeenCalledWith(apiUrl);
  }));

  it('findAllWith method calls get with specific a search query string', inject([UserService], (service: UserService) => {
    spyOn(http, 'get').and.returnValue(of([]));
    service.findAllWith('test');
    expect(http.get).toHaveBeenCalledWith(apiUrl + `?name_like=test`);
  }));
});
