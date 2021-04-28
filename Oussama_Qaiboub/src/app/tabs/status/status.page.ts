import {Component, OnInit} from '@angular/core';
import {PlatformService} from '../../services/platform/platform.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-status',
    templateUrl: './status.page.html',
    styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

    constructor(
        private router: Router,
        public platformService: PlatformService
    ) {
    }

    setting() {
        this.router.navigate(['/settings/'], {skipLocationChange: false});
    }

    ngOnInit() {
    }
}
