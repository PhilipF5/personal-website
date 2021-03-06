import { createFeatureSelector, createSelector } from "@ngrx/store";
import { groupBy, sortBy } from "lodash";
import { BioState, favoritesAdapter } from "app/bio/reducers";
import { Favorite } from "app/bio/models";

const fromFavorites = favoritesAdapter.getSelectors();

export const selectBioState = createFeatureSelector<BioState>("bio");

const selectFavoritesState = createSelector(
	selectBioState,
	bioState => bioState.favorites
);

const selectFavorites = createSelector(
	selectFavoritesState,
	fromFavorites.selectAll
);

export const getBio = createSelector(
	selectBioState,
	bioState => bioState.bio
);

export const getBioError = createSelector(
	selectBioState,
	bioState => bioState.error
);

export const getFavorites = createSelector(
	selectFavorites,
	favorites => {
		let sortedFavorites = sortBy(favorites, [f => f.alphaSort || f.name]);
		return groupBy(sortedFavorites, (f: Favorite) => f.type);
	}
);
