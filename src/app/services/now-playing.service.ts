import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import siteConfig from '@utils/app-config';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NowPlayingService {
	private http = inject(HttpClient);

	nowPlayingUrl = "";
	songLink: string | null = null;

	isPlaying = false;
	isPlayingSubscription: Subject<boolean> = new Subject();
	nowPlayingImage: string | null = null;
	nowPlayingImageSubscription: Subject<string | null> = new Subject();
	nowPlayingData: { [key: string]: any } | null = {
		"artist": {
			"mbid": "",
			"#text": ""
		},
		"streamable": 0,
		"image": [],
		"mbid": "",
		"album": {
			"mbid": "",
			"#text": ""
		},
		"name": "",
		"@attr": {
			"nowplaying": false
		},
		"url": ""
	};

	constructor() {
		this.nowPlayingUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dartegnian&api_key=${siteConfig.LASTFM_API_KEY}&format=json&limit=1`;
	}

	getCurrentInfo() {
		return this.http.get(this.nowPlayingUrl);
	}

	public setIsPlaying(isPlaying: boolean): void {
		this.isPlaying = isPlaying;
		this.isPlayingSubscription.next(isPlaying);
	}

	public setNowPlayingImage(image: string | null) {
		this.nowPlayingImage = image;
		this.nowPlayingImageSubscription.next(image);
	}

	public setNowPlayingData(data: { [key: string]: any } | null) {
		this.nowPlayingData = data;
	}

	public setSongLink(link: string | null) {
		this.songLink = link;
	}
}
