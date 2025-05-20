import { Injectable } from '@angular/core';
import { BehaviorSubject, flatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor() { }

  private _toggleState = new BehaviorSubject<boolean>(false);
  toggleState$ = this._toggleState.asObservable();

  setToggleState(state: boolean): void {
    this._toggleState.next(state);
  }

  toggle(): void {
    this._toggleState.next(!this._toggleState.value);
  }

}
