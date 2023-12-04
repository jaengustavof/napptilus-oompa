import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOompaLoompasRequest, fetchOompaLoompasSuccess, fetchOompaLoompasFailure} from '../../redux/actions/oompaLoompaActions';
import axios from 'axios';
import Search from './Search/Search';
import ResultList from './ResultList/ResultList';
import './homeMain.scss';

const HomeMain = () => {

    const dispatch = useDispatch();
    const lastFetch = useSelector(state => state.oompaLoompas.lastFetch);

    const fetchAllOompaLoompas = async () => {
        dispatch(fetchOompaLoompasRequest());
        try {
            // Primer fetch para obtener el total de paginas
            const initialResponse = await axios.get('https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=1');
            const totalPages = initialResponse.data.total; //obtenemos el total de paginas

            // Creamos un array por cada pagina para obtener la data de cada una de ellas 
            const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
            const requests = pageNumbers.map(page =>
                axios.get(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`)
            );

            // Promise all de axios
            const responses = await axios.all(requests);
            const allData = responses.flatMap(response => response.data.results);
            dispatch(fetchOompaLoompasSuccess(allData));
        } catch (error) {
            dispatch(fetchOompaLoompasFailure(error.message));
        }
    };

    useEffect(() => {

        const shouldFetchData = !lastFetch || (Date.now() - lastFetch) > 86400000; // 86400000 ms = 1 dia

        if (shouldFetchData) {
            fetchAllOompaLoompas();
        }
        
    }, [dispatch, lastFetch]);

    return (
        <main>
            <div className='app-container'>
                <Search/>
                <ResultList/>
            </div>
        </main>
    );
}

export default HomeMain;
