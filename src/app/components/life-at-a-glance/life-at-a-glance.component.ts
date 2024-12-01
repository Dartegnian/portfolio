import { Component, OnInit } from '@angular/core';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
    selector: 'life-at-a-glance',
    templateUrl: './life-at-a-glance.component.html',
    styleUrls: ['./life-at-a-glance.component.scss'],
    standalone: true,
    imports: [NgFor, NgTemplateOutlet, NgIf]
})
export class LifeAtAGlanceComponent implements OnInit {
	featureIndex = 0;
	features = [
		{
			title: "At a glance",
			icon: "lightbulb",
			link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			shortDescription: "How did this get here?",
			description: ["Click any of the cards below to know the activities I'm involved with my life at the moment. Cards will be updated as I pick up new interests and hobbies."],
		},
		{
			title: "Archery",
			icon: "crisis_alert",
			link: "https://worldarchery.sport/sport",
			shortDescription: "A sport that I never knew I would take up. I took it up anyway and now I'm an archer.",
			description: ["I took up archery around the summer in the Philippines. A close friend and I were watching \"All of Us Are Dead\" on Netflix. I told them about how cool the archers in the show looked and expressed interest in taking it. I really would love to see where my skills lead to in this sport."],
			isNew: true
		},
		{
			title: "Development",
			icon: "terminal",
			link: "https://github.com/dartegnian",
			shortDescription: "Development's always been my thing. Always has and always will be.",
			description: ["I've always loved working on personal projects or ideas of mine that involve writing code. Having an opportunity to implement ideas, whether the client's or otherwise, is always exciting.", "These days, I'm working on writing shell scripts for my Linux installation and DevOps-ing. I use Arch Linux btw."]
		},
		{
			title: "Relationships",
			icon: "sentiment_satisfied",
			link: "https://www.instagram.com/dartegnian/",
			shortDescription: "Keeping up with friends is hard, but they're my main source of joy in life.",
			description: ["I've spent a great time of my life thinking about what my main source of joy is. Turns out, it was simple: my friends!", "I'm currently involved in many friend groups and, while it's hard to keep up with all of them on a monthly basis, I still try my best. Sometimes, I keep up with friends through Instagram."]
		},
		{
			title: "Cat care",
			icon: "pets",
			link: "https://www.reddit.com/r/cats/",
			shortDescription: "I never expected myself to be a cat person. Turns out, I prefer them over dogs, sorry.",
			description: ["My sister and I currently take care of a Persian & Siamese cat named Milktea. He's really cute and the fluffiest cat I've ever owned. In the future, I want to name all my cats' names after drinks, like Sprite or Pepsi.", "Cats are really cute uwu."],
			isNew: true
		},
		{
			title: "Music",
			icon: "queue_music",
			link: "https://open.spotify.com/user/dartegnian",
			shortDescription: "Why do I listen to weird genres these days? I'm not sure, but I like 'em.",
			description: ["My day isn't really complete without playing a song on loop for hours on end, to be honest. I mostly listen to stuff on YouTube music and off my local FLAC collection.", "My main genres of music these days are pop, K-Pop, and OPM."]
		},
		{
			title: "Writing",
			icon: "edit",
			link: "https://dartegnian.com",
			shortDescription: "Blogging and writing about my life story has been my hobby since high school.",
			description: ["I write blog posts in my free time. It's been a hobby/tradition to let out and express my thoughts through writing. It's sad to see that I'm the only person in all of my friend groups who has a public blog.", "Even so, I keep on writing for myself."]
		},
		{
			title: "Learning",
			icon: "psychology",
			link: "https://www.youtube.com/results?search_query=web+development+tutorial",
			shortDescription: "Why would I let my skillset rot as technologies change? In tech, you need to keep up.",
			description: ["In the field of IT, you always need to keep your skills sharpened and stay updated to the latest technologies offered.", "That's why I use Skillsha—ah, no, I really just watch through YouTube."]
		},
		{
			title: "Growth",
			icon: "potted_plant",
			link: "https://en.wikipedia.org/wiki/Stoicism",
			shortDescription: "I dread stagnation, I always yearn for growth. I always want to keep growing.",
			description: ["I really dread stagnation. I feel like my life will come to a standstill if I don't do a major life change every year. Because of a personal story, I always have to keep moving and improving myself.", "One of my main skills is the ability to grow up in a short amount of time, as someone can attest."]
		},
	];
	feature: string;

	constructor() {
		this.feature = this.features[this.featureIndex].title;
	}

	ngOnInit(): void {
	}

	setFeature(index: number) {
		this.featureIndex = index;
		this.feature = this.features[index].title;
	}

	skipFeature(action: "previous" | "next") {
		let newFeatureIndex = this.featureIndex;
		if (action === "previous") {
			if (this.featureIndex !== 1 && this.featureIndex !== 0) {
				newFeatureIndex -= 1;
			}
		} else {
			if (this.featureIndex !== this.features.length - 1) {
				newFeatureIndex += 1;
			}
		}
		this.setFeature(newFeatureIndex);
	}

	shuffleFeature() {
		let randomFeatureIndex: number;
		
		do {
			randomFeatureIndex = this.getRandomNumberFromFeatures();
		} while (randomFeatureIndex === this.featureIndex);

		this.setFeature(randomFeatureIndex);
	}

	getRandomNumberFromFeatures() {
		const min = 1;
		const max = (this.features.length - 1);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
