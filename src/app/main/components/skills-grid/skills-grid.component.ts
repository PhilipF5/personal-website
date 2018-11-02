import { Component, OnInit } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Skill } from "app/main/models";

@Component({
	selector: "skills-grid",
	templateUrl: "./skills-grid.component.html",
	styleUrls: ["./skills-grid.component.scss"]
})
export class SkillsGridComponent implements OnInit {
	public skills: Observable<Skill[]>;

	constructor(private afs: AngularFirestore) {}

	ngOnInit() {
		this.skills = this.afs
			.collection<Skill>("skills")
			.valueChanges()
			.pipe(
				map(c => {
					return c.sort((a, b) => {
						let nameA = a.alphaSort || a.name;
						let nameB = b.alphaSort || b.name;
						if (nameA < nameB) {
							return -1;
						} else {
							return 1;
						}
					});
				})
			);
	}
}
