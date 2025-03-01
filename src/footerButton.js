import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllFooterButtonPage from './allFooterButtonPages';
import AdvertisementComponent from './utilities/advertismentComponent';
function FooterButton() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="footerButton pt-5">
            {/* <p className='text-white'>random data</p> */}
            <AdvertisementComponent type="random" />
            <div className="col-12">
                <div className="row">
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <a href="/"><button className="p-1" >Satta King</button></a>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/about-us')}>About Us</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/disclaimer')}>Disclaimer</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/terms-conditions')}>Terms & Conditions</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/contact-us')}>Contact Us</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/faq')}>FAQ</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/satta-king-online')}>Satta King Online</button>
                    </div>
                    <div className="col-l-4 col-md-4 col-sm-12 col-xs-12 p-2">
                        <button className="p-1" onClick={() => handleNavigation('/satta-king-chart')}>Satta King Chart</button>
                    </div>
                    <div className="col-l-12 col-md-12 col-sm-12 col-xs-12 p-2 text-center">
                        <button className="p-1 col-l-4 col-md-4 col-sm-12 col-xs-12 last-button" onClick={() => handleNavigation('/satta-result')}>Satta Resultt</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterButton;
