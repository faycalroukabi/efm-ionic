import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface ClientData {
  Name: string;
  Email: string;
  Address: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientList = [];
  clientData: ClientData;
  clientForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.clientData = {} as ClientData;
  }

  ngOnInit() {

    this.clientForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Address: ['', [Validators.required]]
    })

    this.firebaseService.read_clients().subscribe(data => {

      this.clientList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Email: e.payload.doc.data()['Email'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.clientList);

    });
  }

  CreateRecord() {
    console.log(this.clientForm.value);
    this.firebaseService.create_client(this.clientForm.value).then(resp => {
      this.clientForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_client(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditEmail = record.Email;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Email'] = recordRow.EditEmail;
    record['Address'] = recordRow.EditAddress;
    this.firebaseService.update_client(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
