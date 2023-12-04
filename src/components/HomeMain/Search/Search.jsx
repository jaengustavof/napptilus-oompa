import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../redux/actions/searchActions';
import './search.scss';
import icon from '../../../assets/imgs/icons/ic_search.png'

const Search = () => {

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };

    return (
        <div className='search-container'>
            <input 
                id='searchInput' 
                className='search-container_input' 
                type="text"
                onChange={handleInputChange}
                placeholder='Search'
                >
            </input>
            <img className='search-container_icon' src={icon} height={15} alt='search-icon'/>
        </div>
    );
}

export default Search;
