import {Component, OnInit} from '@angular/core';
import {interval, Observable, of, timer, noop} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { Movie } from '../model/movie';
import { createHttpObservable } from '../../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

     constructor() {}
     ngOnInit() {
    
  }

}
