import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client'

@Component({
  selector: 'client-info',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @Input()
  client: Client;
  constructor() { }

  ngOnInit() {
    console.log(this.client);
  }

  avatar() {
    return 'https://icotar.com/initials/' + this.client.name;
  }

}
