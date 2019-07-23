import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent, Observable, observable, noop } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

     ngOnInit() {
     
      const http$ = Observable.create(observer =>{
        fetch('/api/movies')
           .then(response => {
             return response.json();
           }).then(body =>{
            observer.next(body);
            observer.complete(); 
           }).catch(err =>{
             observer.error(err);
           });
          });

          http$.subscribe(console.log);
    }

}
