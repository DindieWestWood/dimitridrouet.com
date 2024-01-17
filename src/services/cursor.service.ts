import { ReactNode } from "react";
import { Observable, Subject } from "rxjs";

export interface ICursorStateMachine {
  open: boolean;
  tooltip: ReactNode;
}

export default class CursorService {
  private static _instance: CursorService;
  public static get instance() {
    if (!this._instance) this._instance = new CursorService();
    return this._instance; 
  }

  private _stateMachine: ICursorStateMachine;
  public get stateMachine() {
    return this._stateMachine;
  }

  private _stateMachineSubject: Subject<ICursorStateMachine>;
  public get stateMachine$(): Observable<ICursorStateMachine> {
    return this._stateMachineSubject.asObservable();
  }

  private constructor() {
    this._stateMachine = {
      open: false,
      tooltip: null
    }

    this._stateMachineSubject = new Subject<ICursorStateMachine>();
  }

  enter(tooltip?: ReactNode) {
    if (this._stateMachine.open && tooltip != this._stateMachine.tooltip) {
      this._stateMachine.tooltip = tooltip;
      this._stateMachineSubject.next(this._stateMachine);
    } else if (!this._stateMachine.open) {
      this._stateMachine.open = true;
      this._stateMachine.tooltip = tooltip;
      this._stateMachineSubject.next(this._stateMachine);
    }
  }

  leave() {
    if (this._stateMachine.open) {
      this._stateMachine.open = false;
      this._stateMachine.tooltip = null;
      this._stateMachineSubject.next(this._stateMachine);
    }
  }
}