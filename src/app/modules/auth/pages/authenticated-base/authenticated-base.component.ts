import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-authenticated-base',
  templateUrl: './authenticated-base.component.html',
  styleUrls: ['./authenticated-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedBaseComponent implements OnInit {
  public userEmail$ = this.fireAuth.user.pipe(
    map((user) => user?.email),
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
    this.fireAuth.signOut();
  }
}
