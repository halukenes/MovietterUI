import { Component, OnInit, Input } from '@angular/core';
import { IMovieDetail } from '../../Interfaces/IMovieDetail';

@Component({
  selector: 'movie-info',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movieDetail: IMovieDetail;
  
  constructor() { }

  ngOnInit() {
  }

}
