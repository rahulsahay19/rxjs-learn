import { Component, OnInit } from "@angular/core";
import { interval, Observable, of, timer, noop } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap
} from "rxjs/operators";
import { Movie } from "../model/movie";
import { createHttpObservable } from "../../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  thrillerMovies$: Observable<Movie[]>;
  actionMovies$: Observable<Movie[]>;
  constructor() {}
  ngOnInit() {
    const http$ = createHttpObservable("/api/movies");

    const movies$ :Observable<Movie[]> = http$.pipe(map(res => Object.values(res["payload"])), shareReplay());
    
    this.thrillerMovies$ = movies$.pipe(
      map(movies => movies.filter(movie => movie.genre === "Thriller"))
    );
    
    this.actionMovies$ = movies$.pipe(
      map(movies => movies.filter(movie => movie.genre === "Action"))
    );
  }
}
