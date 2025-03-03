import moment from "moment";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import trackVisitor from './utilities/tracker';
import GameResult from "./GameResult";
import AdvertisementComponent from "./utilities/advertismentComponent";
const momenttz = require('moment-timezone')

const App = () => {
  const [data, setData] = useState([]); // State to store data fetched from backend
  const [datagame, setDataFor] = useState([]); // State to store processed data for display

  // const [oddAdd, setOddAdd] = useState([]);
  // const [evenAdd, setEvenAdd] = useState([]);
  // const [randomAdd, setRandomAdd] = useState([]);

  // Get current date and time
  const currentDateDisplay = moment().format("lll");
  const currentDate = moment().format("YYYY-MM-DD");
  const prevDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm");

  // Debugging log to check current time

  useEffect(() => {
    trackVisitor(); // Call the tracking function when the component mounts
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:3001/getadvertisement', {
  //     method: 'GET',
  //     headers: {

  //     }
  //   })
  // })

  // Fetch data from backend when component mounts
  // useEffect(() => {
  //   fetch('http://localhost:3001/getData', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       game_name: "",
  //       curr_date: currentDate,
  //       prev_date: prevDate,
  //       open_time: "market_sunday_time_open"
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       setData(json); // Set fetched data into state
  //     })
  //     .catch(error => console.error(error));
  // }, [currentDate, prevDate]); // Dependencies ensure fetch is triggered when dates change




  useEffect(() => {
    fetch('https://api.sattakingvip.co.in/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_name: "",
        curr_date: currentDate,
        prev_date: prevDate,
        open_time: "market_sunday_time_open"
      }),
    })
      .then(response => response.json())
      .then(json => {
        // Sort data based on open_time
        const sortedData = json.sort((a, b) => {
          const timeA = moment(a.open_time, 'HH:mm');
          const timeB = moment(b.open_time, 'HH:mm');
          return timeA.diff(timeB);
        });

        // Set sorted data into state
        setData(sortedData);


      })
      .catch(error => console.error(error));
  }, [currentDate, prevDate]);

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     const newData = data.map(item => {
  //       // Convert item time and current time to moment objects
  //       const itemTime = moment(item.open_time, 'HH:mm');
  //       const currentMoment = moment(currentTime, 'HH:mm');
  //       const timeDifference = moment.duration(currentMoment.diff(itemTime)).asMinutes();

  //       // Check conditions and set result accordingly
  //       if (item?.curr_date?.date === currentDate || item?.curr_date == undefined) { 
  //         // if (itemTime.isSame(currentMoment, 'minute')) {
  //         if (timeDifference == 15 || timeDifference < 15) {
  //           if (item.open_time > currentTime || item?.curr_date == undefined ) {
  //             return {
  //               gameName: item.game_name,
  //               result: 'wait'
  //               // .sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')))
  //             }

  //           } else if (timeDifference < 15 || timeDifference == 15) {
  //             return {
  //               gameName: item.game_name,
  //               result: item?.curr_date?.result
  //             }
  //           }
  //         } else if (item.open_time == currentTime) {
  //           return {
  //             gameName: item.game_name,
  //             result: item?.curr_date?.result

  //           }.sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')))
  //         }
  //       } return null
  //       //   }; // Exclude items that don't meet the criteria
  //     }).filter(item => item !== null); // Filter out null values

  //     // Ensure at least two items are displayed if none match criteria
  //     if (newData.length === 0) {
  //       // Include the first two items from the original data with 'wait' result
  //       newData.push(...data.slice(0, 2).map(item => ({
  //         gameName: item?.game_name,
  //         result: 'wait',
  //         time: item?.open_time
  //       })));
  //     }

  //     setDataFor(newData); // Update state with processed data
  //     // console.log('newData', newData); // Debugging log to check processed data
  //   }
  // }, [data, currentTime, currentDate]); // Dependencies ensure useEffect runs when data or time changes



  // useEffect(() => { 
  //   if (data?.length > 0) {
  //     // Convert current time to a moment object for comparison
  //     const currentMoment = moment(currentTime, 'HH:mm');

  //     console.log('Current Time:', currentMoment.format('HH:mm'));

  //     // Process and filter the data
  //     const processedData = data.map(item => {
  //       // Convert item time to a moment object
  //       const itemTime = moment(item.open_time, 'HH:mm');

  //       console.log(`Processing Item - Game: ${item.game_name}, Open Time: ${item.open_time}`);

  //       // Only include items where the open_time is after the current time
  //       if (itemTime.isAfter(currentMoment)) {
  //         return {
  //           gameName: item.game_name,
  //           result: item?.curr_date?.result || 'wait',
  //           openTime: item.open_time // Include openTime for sorting
  //         };
  //       }
  //       return null;
  //     }).filter(item => item !== null); // Filter out null values

  //     console.log('Processed Data:', processedData);

  //     // Sort the processed data by open_time, ensuring the earliest times are first
  //     const sortedProcessedData = processedData.sort((a, b) => {
  //       const timeA = moment(a.openTime, 'HH:mm');
  //       const timeB = moment(b.openTime, 'HH:mm');
  //       return timeA.diff(timeB);
  //     });

  //     console.log('Sorted Processed Data:', sortedProcessedData);

  //     // Limit the results to a maximum of 3
  //     const limitedData = sortedProcessedData.slice(0, 3);

  //     console.log('Limited Data:', limitedData);

  //     // Update state with the processed and limited data
  //     setDataFor(limitedData);
  //   }
  // }, [data, currentTime, currentDate]); // Dependencies ensure useEffect runs when data or time changes
  // // Dependencies ensure useEffect runs when data or time changes



  // useEffect(() => {
  //   if (data?.length > 0) {
  //     // Convert current time to a moment object for comparison
  //     const currentMoment = moment(currentTime, 'HH:mm');

  //     // Process and filter the data
  //     const processedData = data.map(item => {
  //       const itemTime = moment(item.open_time, 'HH:mm');
  //       const resultAvailable = item?.curr_date?.result ? true : false;

  //       return {
  //         gameName: item.game_name,
  //         result: resultAvailable ? item?.curr_date?.result : 'wait',
  //         openTime: item.open_time,
  //         isAvailable: resultAvailable,
  //         itemTime: itemTime
  //       };
  //     });

  //     // Sort the processed data by open_time
  //     const sortedProcessedData = processedData.sort((a, b) => {
  //       return a.itemTime.diff(b.itemTime);
  //     });

  //     // Separate records into those with available results and those with "wait"
  //     const availableResults = sortedProcessedData.filter(item => item.isAvailable);
  //     const upcomingRecords = sortedProcessedData.filter(item => !item.isAvailable);

  //     // Determine the records to display
  //     let recordsToDisplay = [];

  //     if (availableResults.length > 0) {
  //       // Show available results and include records up to the next upcoming record
  //       recordsToDisplay = [...availableResults];

  //       const lastAvailableIndex = sortedProcessedData.indexOf(availableResults[availableResults.length - 1]);
  //       const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
  //       if (nextRecord) {
  //         recordsToDisplay.push(nextRecord);
  //       }
  //     } else {
  //       // No available results, show up to 3 upcoming records with "wait"
  //       recordsToDisplay = [...upcomingRecords.slice(0, 3)];
  //     }

  //     // Ensure only 3 records are shown
  //     if (recordsToDisplay.length > 3) {
  //       // Remove the oldest record if more than 3 records are present
  //       recordsToDisplay = recordsToDisplay.slice(-3);
  //     }

  //     // Update state with the processed and limited data
  //     setDataFor(recordsToDisplay);

  //     // Debugging log

  //   }
  // }, [data, currentTime]);


  useEffect(() => {
    if (data?.length > 0) {
      const currentMoment = moment(currentTime, "HH:mm");
  
      const processedData = data.map((item) => {
        const itemTime = moment(item.open_time, "HH:mm");
        const resultAvailable = item?.curr_date?.result ? true : false;
  
        return {
          gameName: item.game_name,
          result: resultAvailable ? item?.curr_date?.result : "wait",
          openTime: item.open_time,
          isAvailable: resultAvailable,
          itemTime: itemTime,
        };
      });
  
      const sortedProcessedData = processedData.sort((a, b) =>
        a.itemTime.diff(b.itemTime)
      );
  
      const availableResults = sortedProcessedData.filter((item) => item.isAvailable);
      const upcomingRecords = sortedProcessedData.filter((item) => !item.isAvailable);
  
      let recordsToDisplay = [];
  
      if (availableResults.length > 0) {
        recordsToDisplay = [...availableResults];
  
        const lastAvailableIndex = sortedProcessedData.indexOf(
          availableResults[availableResults.length - 1]
        );
        const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
        if (nextRecord) {
          recordsToDisplay.push(nextRecord);
        }
      } else {
        recordsToDisplay = [...upcomingRecords.slice(0, 3)];
      }
  
      if (recordsToDisplay.length > 3) {
        recordsToDisplay = recordsToDisplay.slice(-3);
      }
  
      // Move "wait" items to the top
      recordsToDisplay.sort((a, b) => (a.result === "wait" ? -1 : 1));
  
      setDataFor(recordsToDisplay);
    }
  }, [data, currentTime]);






  // Navigation handler
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="">

      {/* seo setup start */}
      <Helmet>
        <title>Satta Fast King</title>
        <meta name="description" content="This is the page for getting all details." />
        <meta name="keywords" content="sattafastking, bgm satta, satta king, sattaking, satta result, satta, satta fast king, sattafast king, games, numbergames, number games, game results" />
        <link rel="canonical" href="https://sattafastking.co/" /><link rel="canonical" href="sattafastking/" />
      </Helmet>
      {/* seo setup end */}



      <div className='section-1 col-12'>
        <div className="row">
          <div className="col-md-4 col-sm-12 p-4 text-center">
            <button className="btn btn-danger fs-1 fw-bold" onClick={() => handleNavigation('/')}>HOME</button>
          </div>
          <div className="col-md-4 col-sm-12 p-4 text-center">
            <button className="btn btn-danger fs-1 fw-bold" onClick={() => handleNavigation('/satta-king-chart')}>CHART</button>
          </div>
          <div className="col-md-4 col-sm-12 p-4 text-center">
            <button className="btn btn-danger fs-1 fw-bold" onClick={() => handleNavigation('/contact-us')}>CONTACT</button>
          </div>
        </div>

        <marquee className="text-secondary fw-bold bg-white text-dark">
          {/* Marquee text */}
          satta king, satta king result, satta king online, sattaking, satta result, online satta king, satta king live, satta king live result, सट्टा किंग, satta king matka, gali satta king, gali satta, satta king online result, satta king chart, satta king gali chart, satta king disawar chart, satta king faridabad chart, satta king gaziyabad chart, satta king record, सत्ता किंग, live satta king, matka satta king, sattaking result, satta king gali result, satta king game, delhi satta king, satta live result, dara satta king, gali live result, satta king today, satta king online chart, satta result online, satta king result online, satta king live online result, online satta king result, satta king bazar, sattaking live, satta king disawar result
        </marquee>
        <div>



        </div>
        <div className="row">
          <div className="col-md-12 text-center p-4">
            <a href="/"><button className='section1-btn col-md-11 col-sm-12 col-xs-12 btn btn-danger text-black fw-bold'> SATTA KING </button></a>
          </div>
        </div>
        <div className="col-12 board text-center text-white">
          <p className="text-warning pt-2">{currentDateDisplay}</p>

          {/* Display data based on processed results */}
          {datagame?.map((todayData, index) => (
            <div key={index}>
              <p className="mb-0">{todayData?.gameName}</p>
              <p className="lh-1 blinking-text">{todayData?.result || 'wait'}</p>
            </div>
          ))}
        </div>
        {/* <p className='text-white'> odd data</p>  */}
        <AdvertisementComponent type="odd" />
      </div>
      <GameResult dayGameData={data} /> {/* Pass data to GameResult component */}
    </div >
  );
};

export default App;
