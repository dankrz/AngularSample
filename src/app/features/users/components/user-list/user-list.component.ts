import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'tt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public formGroup: FormGroup;

  @Input()
  public users: User[];

  @Output()
  public removeUser = new EventEmitter<User>();

  @Output()
  public addUser = new EventEmitter<User>();

  @Output()
  public editUser = new EventEmitter<User>();

  constructor() {
  }

  static createUserFromGridRow(user: User): User {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      birthDate: user.birthDate,
      phone: user.phone,
      city: user.city,
      street: user.street,
      number: user.number
    };
  }

  ngOnInit() {
  }

  public removeHandler({dataItem}) {
    this.removeUser.emit(dataItem);
  }

  protected editHandler({sender, rowIndex, dataItem}) {
    if (this.isFormInvalid()) {
      return;
    }
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id, Validators.required),
      'name': new FormControl(dataItem.name, Validators.required),
      'surname': new FormControl(dataItem.surname, Validators.required),
      'birthDate': new FormControl(dataItem.birthDate, Validators.required),
      'phone': new FormControl(dataItem.phone, Validators.pattern('^[0-9]{1,15}')),
      'city': new FormControl(dataItem.city, Validators.required),
      'street': new FormControl(dataItem.street, Validators.required),
      'number': new FormControl(dataItem.number, Validators.pattern('^[0-9]+')),
    });

    // put the row in edit mode, with the `FormGroup` build above
    sender.editRow(rowIndex, this.formGroup);
  }

  protected addHandler({sender}) {
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'birthDate': new FormControl(null, Validators.required),
      'phone': new FormControl('', Validators.pattern('^[0-9]{1,15}')),
      'city': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'number': new FormControl(null,  Validators.pattern('^[0-9]+')),
    });

    // show the new row editor, with the `FormGroup` build above
    sender.addRow(this.formGroup);
  }

  protected cancelHandler({sender, rowIndex}) {
    // close the editor for the given row
    sender.closeRow(rowIndex);
  }

  protected saveHandler({sender, rowIndex, formGroup, isNew}) {

    if (this.isFormInvalid()) {
      return;
    }

    // collect the current state of the form
    // `formGroup` arguments is the same as was provided when calling `editRow`
    const row: User = formGroup.value;

    // update the data source
    const user: User = UserListComponent.createUserFromGridRow(row);
    if (isNew) {
      this.addUser.emit(user);
    } else {
      this.editUser.emit(user);
    }

    // close the editor, that is, revert the row back into view mode
    sender.closeRow(rowIndex);
  }

  private isFormInvalid() {
    return this.formGroup && !this.formGroup.valid;
  }

}
