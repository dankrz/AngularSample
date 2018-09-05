import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {parseDate} from '@progress/kendo-angular-intl';

@Injectable()
export class UserService {

  private data: User[];

  constructor() {
    this.data = [
      {
        id: 0,
        name: 'name0',
        surname: 'surname0',
        birthDate: parseDate('24-8-1981', 'dd/MM/yyyy'),
        phone: '634523125',
        city: 'Wroclaw',
        street: 'Mydlana',
        number: 1
      },
      {
        id: 1,
        name: 'name1',
        surname: 'surname1',
        birthDate: parseDate('28-9-1983', 'dd/MM/yyyy'),
        phone: '812312312',
        city: 'Warsaw',
        street: 'Domaniewska',
        number: 2
      },
      {
        id: 2,
        name: 'name2',
        surname: 'surname2',
        birthDate: parseDate('01-6-1983', 'dd/MM/yyyy'),
        phone: '987654412',
        city: 'Wroclaw',
        street: 'Mydlana',
        number: 2
      },
      {
        id: 3,
        name: 'name3',
        surname: 'surname3',
        birthDate: parseDate('05-5-1978', 'dd/MM/yyyy'),
        phone: '812312312',
        city: 'Wroclaw',
        street: 'Himalajska',
        number: null
      }
    ];
  }

  getAll(): User[] {
    return this.data;
  }

  add(userToAdd: User): void {
    const lastId = this.data.reduce((maxId: number, item: User) => {

      if (maxId < item.id) {
        return item.id;
      }

      return maxId;

    }, 0);


    this.data = [...this.data, {
      ...userToAdd,
      id: lastId + 1
    }];
  }

  edit(editedUser: User): void {
    const newData = this.data.map((item: User) => {
      if (item.id === editedUser.id) {
        return editedUser;
      } else {
        return item;
      }

    });
    this.data = newData;
  }


  remove(userToDelete: User) {
    if (!userToDelete) {
      return;
    }

    this.data = this.data.filter((item: User) => {
      return item.id !== userToDelete.id;
    });
  }

}
