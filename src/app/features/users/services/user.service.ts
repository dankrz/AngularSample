import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {formatDate, parseDate} from '@progress/kendo-angular-intl';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserDto} from '../models/user-dto';

@Injectable()
export class UserService {


  private _apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  static convertFromUserToDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      birthDate: formatDate(user.birthDate, 'dd-MM-yyyy'),
      phone: user.phone,
      city: user.city,
      street: user.street,
      number: user.number,
    };
  }

  static convertFromDtoToUser(userDto: UserDto): User {
    return {
      id: userDto.id,
      name: userDto.name,
      surname: userDto.surname,
      birthDate: parseDate(userDto.birthDate, 'dd-MM-yyyy'),
      phone: userDto.phone,
      city: userDto.city,
      street: userDto.street,
      number: userDto.number,
    };
  }

  public static findNextId(users: User[]): number {
    const lastId = users.reduce((maxId: number, item: User) => {

      if (maxId < item.id) {
        return item.id;
      }

      return maxId;

    }, 0);

    return lastId + 1;
  }

  getAll(): Observable<User[]> {
    return this.http.get<UserDto[]>(this._apiUrl).pipe(
      map((userDtoList) => userDtoList.map(userDto => UserService.convertFromDtoToUser(userDto)))
    );
  }

  findAllWith(query: string) {
    return this.http.get<UserDto[]>(this._apiUrl + `?name_like=${query || ''}`).pipe(
      map((userDtoList) => userDtoList.map(userDto => UserService.convertFromDtoToUser(userDto)))
    );
  }

  add(userToAdd: User): Observable<User> {

    return this.http.post<UserDto>(this._apiUrl, UserService.convertFromUserToDto(userToAdd))
      .pipe(
        map(user => UserService.convertFromDtoToUser(user))
      );
  }


  edit(userToEdit: User): Observable<User> {
    return this.http.put<UserDto>(this.buildUserUrl(userToEdit), UserService.convertFromUserToDto(userToEdit))
      .pipe(
        map(user => UserService.convertFromDtoToUser(user))
      );
  }

  remove(user: User) {
    if (!user) {
      return;
    }

    return this.http.delete<User>(this.buildUserUrl(user));
  }


  private buildUserUrl(user: User) {
    return this._apiUrl + `/${user.id}`;
  }
}
