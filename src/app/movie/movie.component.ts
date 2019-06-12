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

      movie$: Observable<Movie>;
      reviews$: Observable<Review>;
      @ViewChild('searchInput') input: ElementRef;
      constructor(private route: ActivatedRoute) {
      }
      ngOnInit() {
          const movieId = this.route.snapshot.params['id'];
          this.movie$ = createHttpObservable(`/api/movies/${movieId}`);
          this.reviews$ = createHttpObservable(`/api/reviews?movieId=${movieId}&pageSize=100`)
                        .pipe(
                            map(res => res['payload'])
                            );
      }
      ngAfterViewInit() {
       fromEvent<any>(this.input.nativeElement, 'keyup')
          .pipe(
              map(event => event.target.value),
              debounceTime(400),
              distinctUntilChanged()
          ).subscribe(console.log);
     }
    }