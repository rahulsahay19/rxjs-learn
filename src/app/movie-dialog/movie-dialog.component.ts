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
            longDescription: [movie.longDescription, Validators.required],
            genre: [movie.genre, Validators.required],
            reviewsCount: [movie.reviewsCount, Validators.required],
            directorName: [movie.directorName, Validators.required],
            releasedAt: [moment(), Validators.required]
        });

    }

    ngOnInit() {
    }



    ngAfterViewInit() {
    }



    close() {
        this.dialogRef.close();
    }

}
