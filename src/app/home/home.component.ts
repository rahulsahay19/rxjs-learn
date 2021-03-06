import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { createHttpObservable } from '../../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  thrillerMovies$: Observable<Movie[]>;
  actionMovies$: Observable<Movie[]>;
  constructor() { }
  ngOnInit() {
    const http$ = createHttpObservable('/api/movies');
    //sharereplay will fix the multiple calls to backend. It will pass the same response
    //to different subscriptions
    //tap is used to break the observable means if you want to update something which is not
    //in the context of observable
    const movies$: Observable<Movie[]> = http$
      .pipe(
        tap(() => console.log('Http request executed')),
        map(res => Object.values(res['payload'])),
        shareReplay()
      );
    //We can derive other movies from movies$ itself.
    this.thrillerMovies$ = movies$
      .pipe(
        map(movies => movies.filter(movie => movie.genre === 'Action'))
      );
    this.actionMovies$ = movies$
      .pipe(
        map(movies => movies.filter(movie => movie.genre === 'Thriller'))
      );
  }

}
