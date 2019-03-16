import { Component, Input } from "@angular/core";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Store, select } from "@ngrx/store";
import { filter } from "rxjs/operators";

import { ReposRequested } from "app/activity/activity.actions";
import { Repo } from "app/activity/models";
import { getRepos } from "app/activity/activity.selectors";

@Component({
	selector: "github-profile",
	templateUrl: "./github-profile.component.html",
	styleUrls: ["./github-profile.component.scss"],
})
export class GitHubProfileComponent {
	@Input() username: string;

	public error: string;
	public githubIcon = faGithub;
	public languages: any;
	public repos: Repo[];

	public get hasError(): boolean {
		return !!this.error;
	}

	public get profileUrl(): string {
		return "https://github.com/" + this.username;
	}

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.store.dispatch(new ReposRequested());
		this.store.pipe(select(getRepos), filter(x => !!x.length)).subscribe(
			repos => {
				this.repos = repos;
				this.setLanguagesAndIcons();
			}
		);
	}

	private buildLanguageStats() {
		let stats = this.repos
			.map(r => r.languages)
			.reduce((accumulator, currentValue) => {
				accumulator = accumulator || {};
				for (let lang in currentValue) {
					if (accumulator[lang]) {
						accumulator[lang] += currentValue[lang];
					} else {
						accumulator[lang] = currentValue[lang];
					}
				}

				return accumulator;
			});

		let statsArray = [];
		for (let lang in stats) {
			let langObj = {};
			langObj["name"] = lang;
			langObj["count"] = stats[lang];
			statsArray.push(langObj);
		}

		this.languages = statsArray
			.filter(s => !["CSS", "HTML"].includes(s.name))
			.sort((a, b) => {
				if (a.count > b.count) {
					return -1;
				} else {
					return 1;
				}
			})
			.slice(0, 3)
			.map(s => Icons[s.name] || s.name);
	}

	private getIconLink(icon: string) {
		return `assets/icons/file_type_${icon}.svg`;
	}

	private setLanguagesAndIcons() {
		for (let r of this.repos) {
			if (r.topics.includes("angular")) {
				r.icon = Icons["Angular"];
			} else if (r.topics.includes("angularjs")) {
				r.icon = Icons["AngularJS"];
			} else if (r.topics.includes("nodejs")) {
				r.icon = Icons["Node.js"];
			} else if (r.topics.includes("react")) {
				r.icon = Icons["React"];
			} else {
				r.icon = Icons[r.topLanguage];
			}
		}

		this.buildLanguageStats();
	}
}

const Icons = {
	Angular: "angular",
	AngularJS: "ng_controller_js",
	"C#": "csharp",
	CSS: "css",
	Dockerfile: "docker",
	HTML: "html",
	JavaScript: "js_official",
	"Node.js": "node",
	React: "reactjs",
	TypeScript: "typescript_official",
};