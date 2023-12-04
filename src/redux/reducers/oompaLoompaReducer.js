import {
    FETCH_OOMPA_LOOMPAS_REQUEST,
    FETCH_OOMPA_LOOMPAS_SUCCESS,
    FETCH_OOMPA_LOOMPAS_FAILURE,
    FETCH_OOMPA_DETAIL_REQUEST,
    FETCH_OOMPA_DETAIL_SUCCESS,
    FETCH_OOMPA_DETAIL_FAILURE
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    data: [],
    error: null,
    details: {},
    lastFetch: null
};

const oompaLoompaReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OOMPA_LOOMPAS_REQUEST:
            return { ...state, loading: true };
        case FETCH_OOMPA_LOOMPAS_SUCCESS:
            return { ...state, loading: false, data: action.payload, lastFetch: Date.now() };
        case FETCH_OOMPA_LOOMPAS_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        case FETCH_OOMPA_DETAIL_REQUEST:
            return { ...state, loading: true };
            case FETCH_OOMPA_DETAIL_SUCCESS:
                const { id, data, fetchedAt } = action.payload;
                return {
                    ...state, 
                    loading: false, 
                    details: { 
                        ...state.details, 
                        [id]: { ...data, fetchedAt }
                    }
                };
        case FETCH_OOMPA_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default oompaLoompaReducer;
