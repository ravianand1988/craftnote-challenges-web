import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-authenticated-base',
  templateUrl: './authenticated-base.component.html',
  styleUrls: ['./authenticated-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedBaseComponent {
  public userEmail$ = this.fireAuth.user.pipe(
    map((user) => user?.email),
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  public logout(): void {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
