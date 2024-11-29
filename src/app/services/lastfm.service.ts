import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  private apiKey = environment.lastfmApiKey;
  private apiUrl = 'http://ws.audioscrobbler.com/2.0/';

  constructor(private http: HttpClient) {}

  getNowListening(username: string): Observable<any> {
    const url = `${this.apiUrl}?method=user.getrecenttracks&user=${username}&api_key=${this.apiKey}&format=json`;
    return this.http.get(url).pipe(
      map((response: any) => response.recenttracks.track[0])
    );
  }
}
