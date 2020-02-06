import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  private OMDBApiKey    = ''; //the authentication key of OMDb API
  private OMDBUrl       = 'http://www.omdbapi.com/?apikey=';
  private BackendApiUrl = 'http://127.0.0.1:5000'
  private OMDBauthURL   = this.OMDBUrl + this.OMDBApiKey + '&i=';

  constructor(private http: HttpClient) { }

  getTwitterUser(username: string): any {
    return this.http.get(this.BackendApiUrl + '/user/' + username);
  }

  getMovieDetails(imdbId: string): any {
    return this.http.get(this.OMDBauthURL + imdbId);
  }
}

