import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import {
  fetchOompaDetailRequest,
  fetchOompaDetailSuccess,
  fetchOompaDetailFailure
} from '../../redux/actions/oompaLoompaActions';
import './detailsMain.scss';

const DetailsMain = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const oompaDetail = useSelector(state => state.oompaLoompas.details[id]);

    useEffect(() => {
        const isDataStale = !oompaDetail || (Date.now() - oompaDetail.fetchedAt) > 86400000;

        if (isDataStale) {
            dispatch(fetchOompaDetailRequest(id));

            axios.get(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`)
                .then(response => {
                    dispatch(fetchOompaDetailSuccess(id, response.data));
                })
                .catch(error => {
                    dispatch(fetchOompaDetailFailure(id, error.message));
                });
        }
    }, [id, dispatch, oompaDetail]);

    if (!oompaDetail) {
        return <div>There is no Oompa with that id...</div>;
    }

    const { first_name, last_name, profession, image, gender, favorite: { song } } = oompaDetail;

    return (
        <div className='app-container'>
            <div className='details-card'>
                <div className='details-card_image-container'>
                    <img src={image} alt={`${first_name} ${last_name}`} />
                </div>
                <div className='details-card_info'>
                    <h5 className='oompa-name'>{first_name} {last_name}</h5>
                    <div className='oompa-info'>
                        <p>{gender === 'F'? 'Woman': 'Man'}</p>
                        <p>{profession}</p>
                    </div>
                    <p className='oompa-song'>{song}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsMain;
