import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';
import Header from './frontend/components/Header/Header';
import Footer from './frontend/components/Footer/Footer';
import OffersContainer from './frontend/components/OffersContainer/OffersContainer';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <OffersContainer />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
