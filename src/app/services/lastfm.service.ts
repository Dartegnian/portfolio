import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  private apiKey = environment.lastfmApiKey;

  constructor(private http: HttpClient) {}

  getNowListening(username: string) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=tresillo2017&api_key=${this.apiKey}&format=json`;
    return this.http.get(url);
  }
}
