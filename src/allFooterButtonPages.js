import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FooterButton from './footerButton';
import AboutUs from './js/aboutUs';
import PrivacyPolicy from './js/privacy';
import Disclaimer from './js/disclaimer';
import TermsConditions from './js/terms';
import ContactUs from './js/contact';
import FAQ from './js/faq';
import App from './App';

const AllFooterButtonPage = () => {
    return (
        <div className='pt-4'>
            <Routes>
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
        </div>
    );
};

export default AllFooterButtonPage;
