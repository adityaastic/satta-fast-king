import moment from "moment";
import { Col, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import AdvertisementComponent from "./utilities/advertismentComponent";

function MonthlyTable({ gamedata, dropValue }) {
    const [data, setData] = useState([]);
    const [gameResult, setGameResult] = useState([]);
    let [columns, setcolumn] = useState([]);
    var selectMonthDrop;

    const currentMonth = moment().tz('Asia/Kolkata').month();
    const getCurrentYear = moment().tz('Asia/Kolkata').year();
    const currentMonthDays = moment().tz('Asia/Kolkata').daysInMonth();
    useEffect(() => {
        if (dropValue) {
            setGameResult(dropValue)
            if (gameResult == '') {
                selectMonthDrop = moment().tz('Asia/Kolkata').format("MMMM");
            } else {
                selectMonthDrop = moment(`${dropValue?.year}-${dropValue?.month}-01`).format('MMMM');
            }
        } else {
        }
    })
    useEffect(() => {
        if (gamedata) {
            setData(gamedata)
        }
    })

    useEffect(() => {
        if (data.length > 0) {

            let array = Object.keys(data[0])
            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    title: array[i] == 'day' ? selectMonthDrop : array[i], dataIndex: array[i], key: array[i]
                }
            }
            setcolumn(array)
        }
    }, [data])
    useEffect(() => {
        fetch('https://api.sattakingvip.co.in/getmonthdata', {
            method: 'POST', // or 'PUT' depending on your requirements
            headers: {
                'Content-Type': 'application/json', // specify the content type
            },
            body: JSON.stringify(
                {
                    month: currentMonth + 1,
                    year: getCurrentYear,
                    gameName: '',
                    result: '',
                    days: currentMonthDays
                }
            ),
        })
            .then(response => response.json())
            .then(json => {
                setData(json)
                // console.log('json month table====>', json)
            })
            .catch(error => console.error(error));
    }, []);



    return (
        <div className="pb-3 pt-3 monthYrTbl">
           
            <div>
                {/* <p className='text-white'> even data</p> */}
                < AdvertisementComponent type="even" />
                {
                    (!(dropValue == null))
                    && (
                        <h5 className="text-center bg-dark text-white p-2" style={{ display: 'block' }}>
                            {dropValue?.gameName} MONTHLY RECORD CHART {selectMonthDrop} - {dropValue?.year || getCurrentYear}
                        </h5>

                    )}
            </div>
            <div className='table-responsive'>
                <Table dataSource={data} columns={columns} pagination={false} />
            </div>

        </div>
    )
}

export default MonthlyTable