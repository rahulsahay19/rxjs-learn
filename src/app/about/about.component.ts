import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { pipe, interval, timer, fromEvent, Observable, observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../../common/util';

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
       const http$ = createHttpObservable('/api/movies');
       //whenever, we are going to derive new observable from existing observable,
       //we need to use pipe operator. using map op, we are trannsforming the same
       //in array of movies
       const movies$ = http$.pipe(map(res => Object.values(res['payload'])));
       http$.subscribe(
       movies => console.log(movies),
      noop, //basically means no operation
      () => console.log('completed')
      );
       movies$.subscribe(movies => console.log(movies), noop, () =>
       console.log('movies fetched')
      );
    
    }
 
   
  

}
