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
   //When an observable gets defined, it doesn't trigger any request
   //however, once subscribed then only it will trigger request.
   //Creating custom observable. Observer will emit the new value of the stream
   //calling next, or error or complete. Observer is internally used to implement 
   //the observer.
      const http$ = Observable.create(observer => {
        fetch('/api/movies')
           .then(response => {
             return response.json();
           })
           .then(body => {
             //this is the value used to emit the value in the observable
             observer.next(body);
             observer.complete();
           })
           .catch(err => {
             observer.error(err);
           });
   });

   http$.subscribe(
     courses => console.log(courses),
     noop, //basically means no operation
     () => console.log('completed')
   );
  }

}
