import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myImage from './images/new.gif';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './footer';
import moment from "moment";
import { Helmet } from 'react-helmet';

const GameResult = ({ dayGameData }) => {
    const [data, setGameData] = useState([]);
    const location = useLocation();


    const currentTime = moment().format("HH:mm");
    const currentDate = moment().format("YYYY-MM-DD");


    useEffect(() => {
        setGameData(dayGameData);
    }, [dayGameData]);

    // based on current date and time get data
    // const getTodayResult = (gameData) => {
    //     const itemTime = moment(gameData.open_time, 'HH:mm');
    //     const currentMoment = moment(currentTime, 'HH:mm');

    //     if (gameData?.curr_date?.date === currentDate) {
    //         return currentMoment.isSameOrAfter(itemTime) ? gameData?.curr_date?.result || '' : '';
    //     }
    //     return '';
    // };

    const isSpecialPage = [
        '/contact-us',
        '/privacy-policy',
        '/disclaimer',
        '/terms-conditions',
        '/about-us',
        '/faq'
    ].some(path => location.pathname.includes(path));

    return (

        <div className="">
            <Helmet>
                <title>GameResult - Satta Fast King</title>
                <meta name="description" content="This is the page for getting all details." />
                <meta name="keywords" content="sattafastking, bgm satta, satta king, sattaking, satta result, satta, satta fast king, sattafast king, games, numbergames, number games, game results" />
                <link rel="canonical" href="https://sattafastking.co/" />
            </Helmet>

            {!isSpecialPage && (
                <div className='row' style={{ display: 'block' }}>
                    <div className="col-12">
                        <div className="row">
                            {data && data.length > 0 ? (
                                data.map((gameData, index) => (
                                    <div key={index} className="col-lg-6 col-sm-12 col-md-6">
                                        <div className='d-flex align-items-center flex-column game_column col-lg-12'>
                                            <p className="mb-0 pt-2 fw-bold fs-6 text-light">{gameData?.game_name}</p>
                                            <p className="mb-0 text-warning fs-6">{gameData?.open_time}</p>
                                            <div className="d-flex align-items-end text-center">
                                                <div>
                                                    <p className="mb-0 fs-6 text-light">Last</p>
                                                    <button className="btn btn-light">{gameData?.prev_date?.result || ''}</button>
                                                </div>
                                                <div>
                                                    <img src={myImage} alt="Game Result" />
                                                </div>
                                                <div>
                                                    <p className="mb-0 fs-6 text-light">Today</p>
                                                    <button className="btn btn-light">
                                                        {/* {getTodayResult(gameData)} */}
                                                        <button className="btn btn-light">{gameData?.curr_date?.result || ''}</button>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            )}

        </div>
    );
};

export default GameResult;
