import { Component, OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform/platform.service';
import {FakerService} from "../../services/faker/faker.service";

@Component({
  selector: 'app-calls',
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
})
export class CallsPage implements OnInit {
  callList: any;

  constructor(
    public platformService: PlatformService,
    private fakerService: FakerService
  ) { }

  segmentChanged(event) {
    console.log(event);
  }

  dataInit() {
    this.fakerService.getFaker().then((faker) => {
      this.callList = Array.apply(null, Array(10)).map(() => {
        const gender = faker.random.arrayElements([1, 0])[0];
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(gender),
          last_name: faker.name.lastName(gender),
          avatar: faker.image.avatar(),
        };
      });
    });
  }

  ngOnInit() {
    this.dataInit();
  }
}
