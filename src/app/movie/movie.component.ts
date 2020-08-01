import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../model/movie";
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
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Review } from '../model/review';
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
        this.movie$ = createHttpObservable(`/api/movies/${this.movieId}`);
    }
    //SwitchMap makes sure that ongoing request gets cancelled and new request gets submitted
    //once user types in new thing
    ngAfterViewInit() {
        const searchReviews$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(search => this.loadReviews(search))
            );// ).subscribe(console.log);
        const initialReviews$ = this.loadReviews();
        this.reviews$ = concat(initialReviews$, searchReviews$);
        console.log('Reviews obs:- ', this.reviews$);
    }
    loadReviews(search = ''): Observable<Review[]> {
        return createHttpObservable(`/api/reviews?movieId=${this.movieId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res => res['payload'])
            );
    }
}