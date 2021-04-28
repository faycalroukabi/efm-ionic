import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private helper: HelperService
  ) { }

  canActivate(): boolean {
    return this.helper.user != null;
  }

  canDeactivate(): boolean {
    return this.helper.canDeactivate;
  }
}
