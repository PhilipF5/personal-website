import { Moment } from "moment";

import { Repo } from "app/activity/models";
import { Skill } from "./skill.model";

export interface Project {
	_id: string;
	featured: boolean;
	image: string;
	name: string;
	platform: Skill;
	repo: Repo;
	skills: Skill[];
	startDate: Moment;
	story: string;
}
