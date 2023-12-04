import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './resultList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom'; 

const ResultList = () => {

    const navigate = useNavigate();
    const oompaLoompas = useSelector(state => state.oompaLoompas.data);
    const searchTerm = useSelector(state => state.search.searchTerm);
    const [displayedOompaLoompas, setDisplayedOompaLoompas] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleCardClick = (id) => {
        navigate(`/${id}`); 
    };

    // Filtra en base a lo ingresado en el input
    const filterOompaLoompas = (data, term) => {
        return data.filter(oompaLoompa => {
            return (
                oompaLoompa.first_name.toLowerCase().includes(term.toLowerCase()) ||
                oompaLoompa.last_name.toLowerCase().includes(term.toLowerCase()) ||
                oompaLoompa.profession.toLowerCase().includes(term.toLowerCase())
            );
        });
    };

    // infinite scroll
    const loadMoreData = () => {
        if (displayedOompaLoompas.length >= filteredOompaLoompas.length) {
            setHasMore(false);
            return;
        }

        setIsLoadingMore(true); 

        setTimeout(() => {
            const nextData = filteredOompaLoompas.slice(
                displayedOompaLoompas.length,
                displayedOompaLoompas.length + 12
            );
            setDisplayedOompaLoompas([...displayedOompaLoompas, ...nextData]);
            setIsLoadingMore(false); 
        }, 1500);
    };

    useEffect(() => {
        setDisplayedOompaLoompas(filterOompaLoompas(oompaLoompas, searchTerm).slice(0, 12));
        setHasMore(true);
    }, [searchTerm, oompaLoompas]);

    const filteredOompaLoompas = searchTerm ? filterOompaLoompas(oompaLoompas, searchTerm) : oompaLoompas;

    return (
        <section className='result-list'>
            <div className='app-container'>
                <div className='heading-container'>
                    <h1 className='heading-container_heading'>Find your Oompa Loompa</h1>
                    <h3 className='heading-container_subheading'>
                        There are more than 100k
                    </h3>
                </div>
                <div id="scrollableDiv" className='results-container' style={{ height: 550, overflow: 'auto' }}>
                    <InfiniteScroll
                        dataLength={displayedOompaLoompas.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        
                        {displayedOompaLoompas.map(oompaLoompa => {

                            const { id, first_name, image, gender, last_name, profession } = oompaLoompa;

                            return (
                                <div key={id} className='card' onClick={() => handleCardClick(id)} data-testid="oompa-loompa-card">
                                    <div className='card_image-container'>
                                        <img className='card_image' src={image} alt={`${first_name} ${last_name}`} />
                                    </div>
                                    <h5 className='card_name'>{first_name} {last_name}</h5>
                                    <p>{gender === 'F'? 'Woman': 'Man'}</p>
                                    <p>{profession}</p>
                                </div>
                            );
                        })}
                        
                    </InfiniteScroll>
                    {isLoadingMore && <div>Loading more Oompa Loompas...</div>}
                </div>
            </div>
        </section>
    );
}

export default ResultList;
