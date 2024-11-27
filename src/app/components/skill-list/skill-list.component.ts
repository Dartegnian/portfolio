import { Component, OnInit } from '@angular/core';
// import { locate } from '@iconify/json';

@Component({
	selector: 'skill-list',
	templateUrl: './skill-list.component.html',
	styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
	// certifications: Array<any>;
	devOpsStack: Array<any>;
	feWebStack: Array<any>;
	beWebStack: Array<any>;
	generalStack: Array<any>;

	constructor() {
		// this.certifications = [
		// 	{
		// 		icon: "cib:amazon-aws",
		// 		text: "AWS Certified Cloud Practitioner"
		// 	},
		// ];
		this.devOpsStack = [
			{
				icon: "codicon:terminal-linux",
				text: "Linux"
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
				icon: "cib:cloudflare",
				text: "Cloudflare"
			},
			{
				icon: "bi:gitlab",
				text: "GitLab"
			},
			{
				icon: "simple-icons:vercel",
				text: "Vercel"
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
				icon: "cib:sass-alt",
				text: "Sass"
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
				icon: "simple-icons:mongodb",
				text: "MongoDB"
			}
		];

		this.generalStack = [
			{
				icon: "cib:git",
				text: "Git"
			},
			{
				icon: "cib:github",
				text: "GitHub"
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
				icon: "tabler:seo",
				text: "S.E.O."
			},
		];
	}

	ngOnInit(): void {
	}

}
