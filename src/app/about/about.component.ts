import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent, Observable, observable, noop } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

     ngOnInit() {
     const interval$ = interval(1000);
     const sub = interval$.subscribe(console.log);
      setTimeout(() => {
        sub.unsubscribe();
      }, 5000);
    }

}
