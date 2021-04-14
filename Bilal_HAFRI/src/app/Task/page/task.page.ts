import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../service/task.service';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  ngOnInit() {

  }

  messages: Task[];
  model: Task;
  isEditing: boolean = false;
  showForm: boolean;
  @ViewChild('slidingList', { static: false }) slidingList;

  constructor(private firestore: TaskService, private router: Router, public alertController: AlertController) {
    this.loadData();
    this.model = {
      id: '',
      text: '',
      checked: false
    }
  }

  goBack() {
    this.router.navigate(['clients']);
  }

  loadData() {
    this.firestore.getAllDocuments("tasks").subscribe((e) => {
      let arr: Task[] = [];
      if (e && e.length > 0) {
        e.forEach(item => {
          const obj: Task = item.payload.doc.data() as unknown as Task;
          obj.id = item.payload.doc.id;
          arr.push(obj)
        });
      }

      this.messages = arr;
    });
  }

  toggleCheck(item): void {
    this.isEditing = true;
    item.checked = !item.checked;
    this.model = item;
    this.addMessage();
  }

  addMessage(): void {
    if (!this.model.text) {
      return;
    }
    if (!this.isEditing) {
      this.firestore.addDocument("tasks", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.firestore.updateDocument("tasks", this.model.id, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.checked = false;
    this.model.text = '';
    this.showForm = false;
  }

  updateMessage(obj) {
    this.showForm = true;
    this.model = obj;
    this.isEditing = true;
    this.slidingList.closeSlidingItems();
  }

  deleteMessage(id: string) {
    var confirmed = this.deleteAlertConfirm();
    if (confirmed) {
      console.log(confirmed);
      this.slidingList.closeSlidingItems();
      this.firestore.deleteDocument("tasks", id).then(() => {
        this.loadData();//refresh view
        this.isEditing = false;
      });
    }
  }

  async deleteAlertConfirm() {
    var confirmed = true;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'do you want to delete this <strong>Task</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            confirmed = false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            confirmed = true;
          }
        }
      ]
    });
    await alert.present();
    return confirmed;
  }

  addItem(): void {
    this.slidingList.closeSlidingItems();
    this.showForm = !this.showForm;
  }

  trackByFn(index: number, item: any): number {
    return index; // or item.id
  }
}
