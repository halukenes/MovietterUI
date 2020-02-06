import { Component, OnInit } from '@angular/core';
import { BackEndService } from './Services/back-end.service';
import { IMovieDetail, IMovieIDs } from './Interfaces/IMovieDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private userInformation = {};
  private username = 'Username';
  private profilePhoto = '';
  private userEmotions = {};
  private userTopics = [];
  private emotionRelatedMovies: IMovieDetail[] = [];
  private topicRelatedMovies: IMovieDetail[] = [];
  private areMoviesLoaded: boolean = false;

  constructor(private backend: BackEndService) { }

  ngOnInit() {
  }

  async getUserInfo(event) {
    var userMovies: IMovieIDs;
    this.username = 'Username';
    this.profilePhoto = '';
    this.emotionRelatedMovies = [];
    this.topicRelatedMovies = [];
    this.userTopics = [];
    this.userEmotions['Tentative'] = 0;
    this.userEmotions['Analytical'] = 0;
    this.userEmotions['Joy'] = 0;
    this.userEmotions['Sadness'] = 0;
    this.userEmotions['Anger'] = 0;
    this.userEmotions['Fear'] = 0;

    console.log(event.target.value);
    await this.backend.getTwitterUser(event.target.value).subscribe((response) => {
      if (response.message) {
        this.username = 'User not found.'
      } else {
        this.username = '@' + response.username;
        this.userInformation = response;
        this.userEmotions['Tentative'] = response.tentative;
        this.userEmotions['Analytical'] = response.analytical;
        this.userEmotions['Joy'] = response.joy;
        this.userEmotions['Sadness'] = response.sadness;
        this.userEmotions['Anger'] = response.anger;
        this.userEmotions['Fear'] = response.fear;
        this.profilePhoto = response.profile_image;
        this.userTopics.push(response.topic1);
        this.userTopics.push(response.topic2);
        this.userTopics.push(response.topic3);
        this.userTopics.push(response.topic4);
        this.userTopics.push(response.topic5);
        userMovies = {
          emotionRelated: response['emotion_movies'],
          topicRelated: response['topic_movies']
        }
        console.log(userMovies);
        this.updateMovies(userMovies);
      }
    });
  }

  updateMovies(imdbIDs: IMovieIDs) {
    imdbIDs.emotionRelated.forEach(async (imdbID: string) => {
      await this.backend.getMovieDetails(imdbID).subscribe((response) => {
        let movieDetail: IMovieDetail = {
          imdbID: imdbID,
          name: response["Title"] + " (" + response["Year"] + ")",
          genre: response["Genre"],
          imdbRating: response["imdbRating"],
          posterUrl: response["Poster"]
        };
        this.emotionRelatedMovies.push(movieDetail);
      });
    });
    imdbIDs.topicRelated.forEach(async (imdbID: string) => {
      await this.backend.getMovieDetails(imdbID).subscribe((response) => {
        let movieDetail: IMovieDetail = {
          imdbID: imdbID,
          name: response["Title"] + " (" + response["Year"] + ")",
          genre: response["Genre"],
          imdbRating: response["imdbRating"],
          posterUrl: response["Poster"]
        };
        this.topicRelatedMovies.push(movieDetail);
      });
    });
    this.areMoviesLoaded = true;
    console.log('e, ', this.emotionRelatedMovies);
    console.log('t, ', this.topicRelatedMovies);
  }

  getKeys(object) {
    return Object.keys(object);
  }

  getRoundsandPercent(number: number) {
    let base = 40;
    return Math.round(number * 100 * 100 / base * 100) / 100;
  }

  getTopic(arraystring: string) {
    let re = /[\'|\]\[]/g;
    return arraystring.replace(re, '');
  }

}
