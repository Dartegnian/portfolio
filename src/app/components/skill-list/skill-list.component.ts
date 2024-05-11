import { Component, OnInit } from '@angular/core';
// import { locate } from '@iconify/json';

@Component({
	selector: 'skill-list',
	templateUrl: './skill-list.component.html',
	styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
	certifications: Array<any>;
	devOpsStack: Array<any>;
	feWebStack: Array<any>;
	beWebStack: Array<any>;
	generalStack: Array<any>;

	constructor() {
		this.certifications = [
			{
				icon: "cib:amazon-aws",
				text: "AWS Certified Cloud Practitioner"
			},
		];
		this.devOpsStack = [
			{
				icon: "codicon:terminal-linux",
				text: "Linux"
			},
			{
				icon: "fa-brands:jenkins",
				text: "Jenkins"
			},
			{
				icon: "simple-icons:sonarqube",
				text: "Sonarqube"
			},
			{
				icon: "fa-brands:docker",
				text: "Docker"
			},
			{
				icon: "codicon:terminal-bash",
				text: "Shell scripting"
			},
			{
				icon: "cib:amazon-aws",
				text: "Amazon EC2"
			},
			{
				icon: "cib:cloudflare",
				text: "Cloudflare"
			},
			{
				icon: "fa-brands:linode",
				text: "Linode"
			},
		];

		this.feWebStack = [
			{
				icon: "fa-brands:angular",
				text: "Angular"
			},
			{
				icon: "cib:typescript",
				text: "TypeScript"
			},
			{
				icon: "simple-icons:jasmine",
				text: "Jasmine"
			},
			{
				icon: "file-icons:karma",
				text: "Karma"
			},
			{
				icon: "fa-brands:react",
				text: "React"
			},
			{
				icon: "devicon-plain:nextjs",
				text: "Next.js"
			},
			{
				icon: "file-icons:jsx-alt",
				text: "JSX"
			},
			{
				icon: "fa-brands:vuejs",
				text: "Vue.js"
			},
			{
				icon: "cib:nuxt-js",
				text: "Nuxt"
			},
			{
				icon: "cib:sass-alt",
				text: "Sass"
			},
			{
				icon: "file-icons:bem",
				text: "B.E.M."
			},
			{
				icon: "fa-brands:html5",
				text: "HTML5"
			},
			{
				icon: "fa-brands:css3",
				text: "CSS3"
			},
			{
				icon: "cib:javascript",
				text: "JavaScript"
			},
		];

		this.beWebStack = [
			{
				icon: "simple-icons:express",
				text: "ExpressJS"
			},
			{
				icon: "simple-icons:mongodb",
				text: "MongoDB"
			}
		];

		this.generalStack = [
			{
				icon: "cib:flutter",
				text: "Flutter"
			},
			{
				icon: "simple-icons:dart",
				text: "Dart"
			},
			{
				icon: "cib:git",
				text: "Git"
			},
			{
				icon: "cib:github",
				text: "GitHub"
			},
			{
				icon: "cib:bitbucket",
				text: "BitBucket"
			},
			{
				icon: "cib:vim",
				text: "Vim"
			},
			{
				icon: "akar-icons:vscode-fill",
				text: "VSCode"
			},
			{
				icon: "cib:arch-linux",
				text: "Arch Linux, btw"
			},
			{
				icon: "cib:jira",
				text: "Jira"
			},
			{
				icon: "cib:confluence",
				text: "Confluence"
			},
			{
				icon: "simple-icons:clickup",
				text: "ClickUp"
			},
			{
				icon: "tabler:seo",
				text: "S.E.O."
			},
		];
	}

	ngOnInit(): void {
	}

}
