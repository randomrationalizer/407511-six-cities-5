import {NameSpace} from "../root-reducer";

export const getLoadFinishStatus = (state) => state[NameSpace.LOAD_STATUS].isLoadFinished;
export const getOffersLoadedStatus = (state) => state[NameSpace.LOAD_STATUS].isOffersLoaded;
export const getFavoritesLoadedStatus = (state) => state[NameSpace.LOAD_STATUS].isFavoritesLoaded;
export const getErrorMessage = (state) => state[NameSpace.LOAD_STATUS].errorMessage;
