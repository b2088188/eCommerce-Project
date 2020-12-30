import {
LOADING_REVIEWLIST,
REVIEWLIST_SUCCESS,
REVIEWLIST_FAIL,
LOADING_REVIEWCREATE,
REVIEWCREATE_SUCCESS,
REVIEWCREATE_FAIL,
REVIEWCREATE_RESET
} from '../types';





function reviewReducer(currentState, action) {
	switch(action.type) {
		case LOADING_REVIEWCREATE:
		case LOADING_REVIEWLIST:
			return {
				...currentState,
				loading: true
			}
		case REVIEWLIST_SUCCESS:
			return {
				...currentState,
				reviews: action.payload.reviews,
				loading: false
			}
		case REVIEWCREATE_SUCCESS:
			return {
				...currentState,
				reviews: [...currentState.reviews, action.payload.review],
				loading: false				
			}
		case REVIEWCREATE_FAIL:
		case REVIEWLIST_FAIL:
			return {
				...currentState,
				error: action.payload.error
			}
		case REVIEWCREATE_RESET:
			return {
				
			}
		default:
		  return currentState;
	}
}

export default reviewReducer;