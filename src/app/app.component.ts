import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservablesService } from './observables.service';
import { SubSink } from 'subsink';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
      date ? this.behaviourSubjectValues.push(date) : null
    );

    setTimeout(() => {
      this.subs.sink = this.service.subject.subscribe(date => {
        if (this.behaviourSubjectValues2.length === 0) {
          // add some extra empty row to the list
          this.behaviourSubjectValues.forEach(() =>
            this.behaviourSubjectValues2.push(null)
          );

          this.behaviourSubjectValues2.pop();
        }

        if (date !== null) {
          this.behaviourSubjectValues2.push(date);
        }
      });
    }, 5000);

    setTimeout(() => {
      this.subs.sink = this.service.subject.subscribe(date => {
        if (this.behaviourSubjectValues3.length === 0) {
          // add some extra empty row to the list
          this.behaviourSubjectValues.forEach(() =>
            this.behaviourSubjectValues3.push(null)
          );

          this.behaviourSubjectValues3.pop();
        }

        if (date !== null) {
          this.behaviourSubjectValues3.push(date);
        }
      });
    }, 10000);

    this.subs.sink = this.service.replaySubject.subscribe(date =>
      this.replaySubjectValues.push(date)
    );

    setTimeout(() => {
      this.subs.sink = this.service.replaySubject.subscribe(date =>
        this.replaySubjectValues2.push(date)
      );
    }, 5000);

    setTimeout(() => {
      this.subs.sink = this.service.replaySubject.subscribe(date =>
        this.replaySubjectValues3.push(date)
      );
    }, 10000);

    this.interval = setInterval(() => this.service.add(), 1000);

    // stop after 20 seconds
    setTimeout(() => this.stop(), 20000);
  }

  reset() {
    this.stop();

    this.behaviourSubjectValues = [];
    this.behaviourSubjectValues2 = [];
    this.behaviourSubjectValues3 = [];

    this.replaySubjectValues = [];
    this.replaySubjectValues2 = [];
    this.replaySubjectValues3 = [];

    this.service.reset();
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
