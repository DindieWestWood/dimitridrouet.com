import { ReactNode } from "react";
import { Observable, Subject } from "rxjs";

export interface ICursorState {
  open: boolean;
  tooltip: ReactNode;
}

export default class CursorService {
  private static _instance: CursorService;
  public static get instance() {
    if (!this._instance) this._instance = new CursorService();
    return this._instance; 
  }

  private _state: ICursorState;
  public get state() {
    return this._state;
  }

  private _stateSubject: Subject<ICursorState>;
  public get state$(): Observable<ICursorState> {
    return this._stateSubject.asObservable();
  }

  private constructor() {
    this._state = {
      open: false,
      tooltip: null
    }

    this._stateSubject = new Subject<ICursorState>();
  }

  open(tooltip?: ReactNode) {
    this._state = {
      open: true,
      tooltip: tooltip ?? null
    }
    this._stateSubject.next(this._state);
  }

  close() {
    this._state = {
      open: false,
      tooltip: null
    }

    this._stateSubject.next(this._state);
  }

  setToolTip(tooltip: ReactNode) {
    this._state = {
      open: this._state.open,
      tooltip: tooltip ?? null
    }

    this._stateSubject.next(this._state);
  }
}