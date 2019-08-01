import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {
  subject: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  replaySubject: ReplaySubject<Date> = new ReplaySubject();

  constructor() {
    this.replaySubject.next(new Date());
  }

  reset() {
    this.subject = new BehaviorSubject(new Date());
    this.replaySubject = new ReplaySubject();
    this.replaySubject.next(new Date());
  }

  add() {
    this.subject.next(new Date());
    this.replaySubject.next(new Date());
  }

  getSubject() {
    return this.subject;
  }
}
