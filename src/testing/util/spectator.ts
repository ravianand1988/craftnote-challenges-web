import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DomSpectator } from '@ngneat/spectator/lib/base/dom-spectator';

/** Get a component instance from a Spectator by its CSS selector */
function getSpectatedComponent(spectator: DomSpectator<any>, selector: string): any;

/** Get a component instance from a Spectator by its type */
function getSpectatedComponent<T>(spectator: DomSpectator<any>, selector: Type<T>): T;

function getSpectatedComponent<T>(
  spectator: DomSpectator<any>,
  selector: string | Type<T>,
): any | T {
  if (typeof selector === 'string') {
    return spectator.debugElement.query(By.css(selector)).componentInstance;
  }
  return spectator.debugElement.query(By.directive(selector)).componentInstance;
}

export { getSpectatedComponent };
