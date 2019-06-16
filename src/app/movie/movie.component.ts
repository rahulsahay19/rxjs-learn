import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie} from "../model/movie";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Review} from '../model/review';
import { createHttpObservable } from '../../common/util';


@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {
        movieId: string;
        movie$: Observable<Movie>;
        reviews$: Observable<Review[]>;
        
         @ViewChild('searchInput') input: ElementRef;
          constructor(private route: ActivatedRoute) {
        }
        ngOnInit() {
            this.movieId = this.route.snapshot.params['id'];

             
        }
     
        ngAfterViewInit() {
       
        }
    }