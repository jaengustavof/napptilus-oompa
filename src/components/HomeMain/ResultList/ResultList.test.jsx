import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../../redux/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import ResultList from './ResultList';

describe('ResultList Component', () => {
  
  it('Shows 12 Oompa Loompas on first render', () => {
    const initialState = {
      oompaLoompas: {
        data: Array.from({ length: 12 }, (_, i) => ({
          id: i,
          first_name: `First${i}`,
          last_name: `Last${i}`,
          profession: `Profession${i}`,
          image: 'path/to/image',
          gender: 'gender',
        })),
      },
      search: {
        searchTerm: '',
      },
    };

    const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

    render(
      <Provider store={store}>
        <Router>
          <ResultList />
        </Router>
      </Provider>
    );

    const cards = screen.getAllByTestId('oompa-loompa-card');
    expect(cards).toHaveLength(12);
  });

  it('Filters Oompa Loompas based on search term', async () => {
    const searchTerm = 'TestTerm'; 
    const filteredInitialState = {
      oompaLoompas: {
        data: Array.from({ length: 12 }, (_, i) => ({
          id: i,
          first_name: i === 0? `TestTerm`: `First${i}`,
          last_name: i === 0? `TestTerm`: `First${i}`,
          profession: `Profession${i}`,
          image: 'path/to/image',
          gender: 'gender',
        })),
      },
      search: {
        searchTerm: searchTerm,
      },
    };

    const store = configureStore({ reducer: rootReducer, preloadedState: filteredInitialState });

    render(
      <Provider store={store}>
        <Router>
          <ResultList />
        </Router>
      </Provider>
    );

    let cards;
    try {
      cards = await screen.findAllByTestId('oompa-loompa-card', {}, { timeout: 3000 });
    } catch (e) {
      cards = []; 
    }

    expect(cards).toHaveLength(1);
    expect(screen.getByText('TestTerm TestTerm')).toBeInTheDocument();
  });
});
