import {
  FETCH_OOMPA_LOOMPAS_REQUEST,
  FETCH_OOMPA_LOOMPAS_SUCCESS,
  FETCH_OOMPA_LOOMPAS_FAILURE,
  FETCH_OOMPA_DETAIL_REQUEST,
  FETCH_OOMPA_DETAIL_SUCCESS,
  FETCH_OOMPA_DETAIL_FAILURE
} from './actionTypes';

//Lista completa
export const fetchOompaLoompasRequest = () => ({
  type: FETCH_OOMPA_LOOMPAS_REQUEST
});

export const fetchOompaLoompasSuccess = (data) => ({
  type: FETCH_OOMPA_LOOMPAS_SUCCESS,
  payload: data
});

export const fetchOompaLoompasFailure = (error) => ({
  type: FETCH_OOMPA_LOOMPAS_FAILURE,
  payload: error
});

//Oompa details
export const fetchOompaDetailRequest = (id) => ({
  type: FETCH_OOMPA_DETAIL_REQUEST,
  payload: id
});

export const fetchOompaDetailSuccess = (id, data) => ({
  type: FETCH_OOMPA_DETAIL_SUCCESS,
  payload: { id, data, fetchedAt: Date.now() }
});

export const fetchOompaDetailFailure = (id, error) => ({
  type: FETCH_OOMPA_DETAIL_FAILURE,
  payload: { id, error }
});
