import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

import { ProjectsAction, ProjectsActionTypes } from "app/projects/actions";
import { Project, Skill } from "app/projects/models";

export interface ProjectsState extends EntityState<Project> {
	error: boolean;
}

export interface SkillsState extends EntityState<Skill> {
	error: boolean;
}

export const projectsAdapter: EntityAdapter<Project> = createEntityAdapter<Project>({
	selectId: project => project._id,
});

export const skillsAdapter: EntityAdapter<Skill> = createEntityAdapter<Skill>({
	selectId: skill => skill._id,
});

export const initialProjectsState: ProjectsState = projectsAdapter.getInitialState({
	error: false,
});

export const initialSkillsState: SkillsState = skillsAdapter.getInitialState({
	error: false,
});

export function projectsReducer(state = initialProjectsState, action: ProjectsAction): ProjectsState {
	switch (action.type) {
		case ProjectsActionTypes.ProjectsError:
			return { ...state, error: true };
		case ProjectsActionTypes.ProjectsLoaded:
			return projectsAdapter.addAll(action.payload.projects, { ...state, projectsLoaded: true });
		default:
			return state;
	}
}

export function skillsReducer(state = initialSkillsState, action: ProjectsAction): SkillsState {
	switch (action.type) {
		case ProjectsActionTypes.ProjectsError:
			return { ...state, error: true };
		case ProjectsActionTypes.SkillsLoaded:
			return skillsAdapter.addAll(action.payload.skills, { ...state, skillsLoaded: true });
		default:
			return state;
	}
}
