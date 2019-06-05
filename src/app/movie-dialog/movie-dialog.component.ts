import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Movie} from "../model/movie";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'movie-dialog',
    templateUrl: './movie-dialog.component.html',
    styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    movie: Movie;

    @ViewChild('saveButton') saveButton: ElementRef;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MovieDialogComponent>,
        @Inject(MAT_DIALOG_DATA) movie: Movie) {

        this.movie = movie;

        this.form = fb.group({
            name: [movie.name, Validators.required],
            genre: [movie.genre, Validators.required],
            reviewsCount: [movie.reviewsCount, Validators.required],
            directorName: [movie.directorName, Validators.required],
            longDescription: [movie.longDescription, Validators.required],
            releasedAt: [moment(), Validators.required]
        });

    }

      ngOnInit() {
      //Concat is all about completeion. Waiting for one observable to complete
      //before subscribing and using next observable. This way sequence can be maintained
      // this.form.valueChanges. ConcatMap is taking the values from value changes, creating
      // new observable subscribing to them and concatinating them together
      this.form.valueChanges
      .pipe(
       //First this checks whether form is valid or not
          filter(() => this.form.valid),
          concatMap(changes => this.saveMovie(changes))
           )
           .subscribe();
    }
       saveMovie(changes) {
       return fromPromise(fetch(`/api/movies/${this.movie.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }


    ngAfterViewInit() {
     //Exhaust Map makes sure same value shouldn't go down the line.
     //exhaustMap makes sure that repeated stream of clicks won't happen.
     //This will take only one click in the stream of events.
     //fromEvent will capture the button click and turn into observable
     //so that we can subscribe to click stream here
      fromEvent(this.saveButton.nativeElement, 'click')
               .pipe(
               exhaustMap(() => this.saveMovie(this.form.value))
               ).subscribe();
     }



    close() {
        this.dialogRef.close();
    }

}
