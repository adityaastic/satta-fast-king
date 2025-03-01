import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Media.css';
import './footer.css';
import GameResult from './GameResult';
import Footer from './footer';
import AllFooterButtonPage from './allFooterButtonPages';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import FooterButton from './footerButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div className='container-fluid'>
      <App />
      {/* <GameResult /> */}
      <AllFooterButtonPage />
      <FooterButton />
    </div>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
