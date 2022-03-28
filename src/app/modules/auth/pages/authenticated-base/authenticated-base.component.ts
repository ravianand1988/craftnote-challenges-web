import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-authenticated-base',
  templateUrl: './authenticated-base.component.html',
  styleUrls: ['./authenticated-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticatedBaseComponent implements OnInit {
  public userName$: Observable<string> = of('ravi');
  constructor() { }

  ngOnInit(): void {
  }

  public logout(): void {
    console.log('logging out...');
  }
}
