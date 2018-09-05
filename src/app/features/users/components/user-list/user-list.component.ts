import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'tt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public formGroup: FormGroup;
  public gridData: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.gridData = this.userService.getAll();
  }

  protected editHandler({sender, rowIndex, dataItem}) {
    // define all editable fields validators and default values
    const group = new FormGroup({
      'name': new FormControl(dataItem.name, Validators.required),
      'surname': new FormControl(dataItem.surname, Validators.required),
      'birthDate': new FormControl(dataItem.birthDate, Validators.required),
      'phone': new FormControl(dataItem.phone, Validators.pattern('^[0-9]{1,15}')),
      'city': new FormControl(dataItem.city, Validators.required),
      'street': new FormControl(dataItem.street, Validators.required),
      'number': new FormControl(dataItem.number, Validators.compose([Validators.required, Validators.pattern('^[0-9]+')])),
    });

    // put the row in edit mode, with the `FormGroup` build above
    sender.editRow(rowIndex, group);
  }

  protected addHandler({sender}) {
    // define all editable fields validators and default values
    const group = new FormGroup({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'birthDate': new FormControl(null, Validators.required),
      'phone': new FormControl('', Validators.pattern('^[0-9]{1,15}')),
      'city': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'number': new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+')])),
    });

    // show the new row editor, with the `FormGroup` build above
    sender.addRow(group);
  }


  protected cancelHandler({sender, rowIndex}) {
    // close the editor for the given row
    sender.closeRow(rowIndex);
  }



  public removeHandler({dataItem}) {
    this.userService.remove(dataItem);
    this.gridData = this.userService.getAll();

  }

  protected saveHandler({sender, rowIndex, formGroup, isNew}) {
    // collect the current state of the form
    // `formGroup` arguments is the same as was provided when calling `editRow`
    const product: User = formGroup.value;

    // update the data source
    // this.editService.save(product, isNew);

    // close the editor, that is, revert the row back into view mode
    sender.closeRow(rowIndex);
  }
}
