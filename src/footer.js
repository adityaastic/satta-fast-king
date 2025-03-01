import Select, { MultiValue } from 'react-select';
import { Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import MonthlyTable from './monthlyTable';
import FooterButton from './footerButton';
import AllFooterButtonPage from './allFooterButtonPages';
import { useLocation, location } from 'react-router-dom';

let monthFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Footer() {
    var location = useLocation();
    const isContact = location.pathname.includes('/contact-us');
    const isPrivacy = location.pathname.includes('/privacy-policy');
    const isDisclaimer = location.pathname.includes('/disclaimer');
    const isTermsCondition = location.pathname.includes('/terms-conditions');
    const isAbout = location.pathname.includes('/about-us');
    const isFaq = location.pathname.includes('/faq');
    const [tableData, setTableData] = useState({ tableTrue: true, pathName: '' });
    const [selectedOption, setSelectedOption] = useState(null);
    const [selecYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [sendList, sndList] = useState([]);
    const [selecteData, sendData] = useState();
    const [sendDate, sndDate] = useState();
    const [dropValue, getDropValue] = useState([])


    const currentYear = moment.tz('Asia/Kolkata').format('YYYY');
    const currentMonth = moment().tz('Asia/Kolkata').month() + 1;



    // const YearGame = { selecYear, selectedOption, selectMonthnew, selectedMonth };
    useEffect(() => {
        fetch('https://api.sattakingvip.co.in/getGameName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(json => sndList(json))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleChangeYear = (selecYear) => {
        setSelectedYear(selecYear);
    };

    const handleChangeMonth = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided, minHeight: '46px', height: '46px',
        }),
        input: (provided, state) => ({
            ...provided, minHeight: '46px'
        }),
        valueContainer: (provided, state) => ({
            ...provided, height: '46px', padding: '0 8px',
        }),
        singleValue: (provided, state) => ({
            ...provided, height: '46px', display: 'flex', alignItems: 'center',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided, height: '46px',
        }),
    };

    let monthArray = [];
    for (let i = 0; i < monthFullName.length; i++) {
        monthArray.push({ value: i + 1, label: monthFullName[i] });
    }

    function apiData(params) {
        fetch('https://api.sattakingvip.co.in/getmonthdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                month: params.month,
                year: params.year,
                gameName: params.gameName ? params.gameName : '',
                result: '',
                days: params.days
            }),
        })
            .then(response => response.json())
            .then(json => {
                sendData(json);
                // console.log('json footer===>', json)
            })
            .catch(error => console.error(error));
    }

    function getAllGameDetails() {
        if (selectedMonth != null && selecYear != null && selectedOption != null) {
            let allData = {
                month: selectedMonth ? selectedMonth.value : '',
                year: selecYear ? selecYear.value : '',
                gameName: selectedOption ? selectedOption.value : '',
                result: '',
                days: moment(selecYear.value + "-" + selectedMonth.value).daysInMonth()
            }
            if (selectedMonth.value > currentMonth && currentYear == selecYear.value) {

                // apiData(allData);
                toast.error("Selected month out of Date", {
                    className: "toast-message"
                });

            } else if (selectedMonth != null && selecYear != null && selectedOption != null) {

                apiData(allData);
                getDropValue(allData);
            }
        } else {
            return toast.error("All Fields Required", {
                className: "toast-message"
            });
        }

    }

    // const currentYear = new Date().getFullYear();
    let arr = [];
    for (let year = currentYear - 9; year <= currentYear; year++) {
        arr.push({ value: year, label: year });
    }

    return (
        <div className="footer pt-5">
            
            {
                (!((isContact || isPrivacy || isDisclaimer || isTermsCondition || isAbout || isFaq) && (tableData.tableTrue))) &&
                (
                    <MonthlyTable gamedata={selecteData} dropValue={dropValue} style={{ display: 'block' }} />
                )}
            <div className="yellow-container">
                <div className="bottom-container">
                    <div className="selection-container">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                                    <Select menuPlacement="auto" value={selectedMonth} onChange={handleChangeMonth} options={monthArray} placeholder="Select Month" styles={customStyles} />
                                </div>
                                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                                    <Select menuPlacement="auto" value={selecYear} onChange={handleChangeYear} options={arr} placeholder="Select Year" styles={customStyles} />
                                </div>
                                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                                    <Select menuPlacement="auto" value={selectedOption} onChange={handleChange} options={sendList} placeholder="Select Game" styles={customStyles} />
                                </div>
                                <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                                    <button className="form-control" id="go-button" onClick={getAllGameDetails}>Go</button>
                                    <ToastContainer
                                        autoClose={2000}
                                        position="top-right"
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        closeOnClick
                                        pauseOnHover
                                        draggable={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="/"><button className="float-end refreshButton">Refresh</button></a>
        </div>
    )
}
export default Footer
