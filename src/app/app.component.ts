import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservablesService } from './observables.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  behaviourSubjectValues: Date[] = [];
  behaviourSubjectValues2: Date[] = [];
  behaviourSubjectValues3: Date[] = [];
  replaySubjectValues: Date[] = [];
  replaySubjectValues2: Date[] = [];
  replaySubjectValues3: Date[] = [];

  interval;

  constructor(private service: ObservablesService) {}

  ngOnInit(): void {}

  start() {
    this.subs.sink = this.service.subject.subscribe(date =>
      this.behaviourSubjectValues.push(date)
    );

    setTimeout(() => {
      this.subs.sink = this.service.subject.subscribe(date =>
        this.behaviourSubjectValues2.push(date)
      );
    }, 10000);

    setTimeout(() => {
      this.subs.sink = this.service.subject.subscribe(date =>
        this.behaviourSubjectValues3.push(date)
      );
    }, 20000);

    this.subs.sink = this.service.replaySubject.subscribe(date =>
      this.replaySubjectValues.push(date)
    );

    setTimeout(() => {
      this.subs.sink = this.service.replaySubject.subscribe(date =>
        this.replaySubjectValues2.push(date)
      );
    }, 10000);

    setTimeout(() => {
      this.subs.sink = this.service.replaySubject.subscribe(date =>
        this.replaySubjectValues3.push(date)
      );
    }, 20000);

    this.interval = setInterval(() => this.service.add(), 1000);
  }

  reset() {
    this.behaviourSubjectValues = [];
    this.behaviourSubjectValues2 = [];
    this.behaviourSubjectValues3 = [];

    this.replaySubjectValues = [];
    this.replaySubjectValues2 = [];
    this.replaySubjectValues3 = [];
  }

  stop() {
    this.subs.unsubscribe();
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    clearInterval(this.interval);
  }
}
