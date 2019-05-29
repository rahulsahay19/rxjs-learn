import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {MovieDialogComponent} from "../movie-dialog/movie-dialog.component";
import { Movie } from '../model/movie';

@Component({
    selector: 'movies-card-list',
    templateUrl: './movies-card-list.component.html',
    styleUrls: ['./movies-card-list.component.css']
})
export class moviesCardListComponent implements OnInit {

    @Input()
    movies: Movie[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {

    }

    editCourse(movie: Movie) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = movie;

        const dialogRef = this.dialog.open(MovieDialogComponent, dialogConfig);


    }

}









