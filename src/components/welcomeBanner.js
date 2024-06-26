import React, { useState, useEffect } from 'react';
import firebase from '../firebase'; // Adjust the path as needed
import '../css/welcomeContainer.css';
import moment from 'moment';

const WelcomeBanner = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [userDetails, setUserDetails] = useState({ firstName: "" });

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        try {
          const doc = await userRef.get();
          if (doc.exists) {
            // Use setUserDetails to update the first name in context
            setUserDetails(previousDetails => ({
              ...previousDetails,
              firstName: doc.data().firstName
            }));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error getting document:", error);
        }
      }
    };

    fetchUserData();

    return () => clearInterval(timer);
  }, []); // Dependencies array is empty to run once after initial render



  const getWelcomeMessages = () => {
    const hour = currentTime.hour();
    const dayOfWeek = currentTime.format('dddd');
    const currentDate = currentTime.format('DD-MM'); // Formats date as "DD-MM", e.g., "31-10" for October 31st
    const currentDateFormatted = currentTime.format('dddd MMMM Do');

    // General Flags
    const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";

    // Holiday flags
    const isHalloweenSoon = currentTime.isBetween(moment('25-10', 'DD-MM'), moment('30-10', 'DD-MM'), 'day', '[]');
    const isHalloweenNow = currentDate === "31-10";

    const isChristmasSoon = currentTime.isBetween(moment('20-12', 'DD-MM'), moment('24-12', 'DD-MM'), 'day', '[]');
    const isDecFirst = currentDate === "01-12";
    const isChristmasEve = currentDate === "24-12";
    const isChristmasNow = currentDate === "25-12";

    const isNewYearsEveSoon = currentTime.isBetween(moment('27-12', 'DD-MM'), moment('30-12', 'DD-MM'), 'day', '[]');
    const isNewYearsEveNow = currentDate === "31-12";

    const isNewYearNow = currentDate === "01-01";

    const isValentinesDaySoon = currentTime.isBetween(moment('10-02', 'DD-MM'), moment('13-02', 'DD-MM'), 'day', '[]');
    const isValentinesDayNow = currentDate === "14-02";

    const isStPatricksDayNow = currentDate === "17-03";

    const isGuyFawkesDaySoon = currentTime.isBetween(moment('03-11', 'DD-MM'), moment('04-11', 'DD-MM'), 'day', '[]');
    const isGuyFawkesDayNow = currentDate === "05-11";

    const isRemembranceDayNow = currentDate === "11-11";

    const isBoxingDayNow = currentDate === "26-12";

    // Seasons flags
    const isSpringSoon = currentTime.isBetween(moment('24-02', 'DD-MM'), moment('28-02', 'DD-MM'), 'day', '[]');
    const isSpringNow = currentTime.isBetween(moment('01-03', 'DD-MM'), moment('06-03', 'DD-MM'), 'day', '[]');
    
    const isSummerSoon = currentTime.isBetween(moment('27-05', 'DD-MM'), moment('31-05', 'DD-MM'), 'day', '[]');
    const isSummerNow = currentTime.isBetween(moment('01-06', 'DD-MM'), moment('06-06', 'DD-MM'), 'day', '[]');
    
    const isAutumnSoon = currentTime.isBetween(moment('26-08', 'DD-MM'), moment('31-08', 'DD-MM'), 'day', '[]');
    const isAutumnNow = currentTime.isBetween(moment('01-09', 'DD-MM'), moment('06-09', 'DD-MM'), 'day', '[]');
    
    const isWinterSoon = currentTime.isBetween(moment('26-11', 'DD-MM'), moment('30-11', 'DD-MM'), 'day', '[]');
    const isWinterNow = currentTime.isBetween(moment('01-12', 'DD-MM'), moment('06-12', 'DD-MM'), 'day', '[]');

    let mainWelcome = `Welcome, today is ${dayOfWeek}.`;
    let subWelcome = "";
    let userNameValue = userDetails.firstName ? ', ' + userDetails.firstName : '';

    if (hour === 0) {
      // Midnight
      mainWelcome = `It's midnight hour${userNameValue}`;
    } else if (hour === 1) {
      // 1 AM
      mainWelcome = `It's the early hours, peaceful isn't it.`;
    } else if (hour === 2) {
      // 2 AM
      mainWelcome = `Still quite early${userNameValue}`;
    } else if (hour === 3) {
      // 3 AM
      mainWelcome = `Evening${userNameValue}, it's the dead of the night`;
    } else if (hour === 4) {
      // 4 AM
      mainWelcome = `Quiet before sunrise, everything is still`;
    } else if (hour === 5) {
      // 5 AM
      mainWelcome = `The sun will be up soon${userNameValue}`;
    } else if (hour === 6) {
      // 6 AM
      mainWelcome = `Dawn's breaking${userNameValue}`;
    } else if (hour === 7) {
      // 7 AM
      mainWelcome = `Good morning${userNameValue}. The day is starting`;
    } else if (hour === 8) {
      // 8 AM
      mainWelcome = `Time to start getting to work${userNameValue}`;
    } else if (hour === 9) {
      // 9 AM
      mainWelcome = `Good morning${userNameValue}`;
    } else if (hour === 10) {
      // 10 AM
      mainWelcome = `Morning's in full swing${userNameValue}`;
    } else if (hour === 11) {
      // 11 AM
      mainWelcome = `Morning${userNameValue}, almost time for a break.`;
    } else if (hour === 12) {
      // Noon
      mainWelcome = `Time for some lunch${userNameValue}?`;
    } else if (hour === 13) {
      // 1 PM
      mainWelcome = `Afternoon${userNameValue}. Well into the day`;
    } else if (hour === 14) {
      // 2 PM
      mainWelcome = `A perfect time for a short break${userNameValue}`;
    } else if (hour === 15) {
      // 3 PM
      mainWelcome = `Afternoon${userNameValue}`;
    } else if (hour === 16) {
      // 4 PM
      mainWelcome = `Almost time to get home and relax${userNameValue}`;
    } else if (hour === 17) {
      // 5 PM
      mainWelcome = `Evening${userNameValue}`;
    } else if (hour === 18) {
      // 6 PM
      mainWelcome = `Evening${userNameValue}. How's your day gone?`;
    } else if (hour === 19) {
      // 7 PM
      mainWelcome = `Perfect time for a chillout${userNameValue}`;
    } else if (hour === 20) {
      // 8 PM
      mainWelcome = `Perfect time for a chillout${userNameValue}`;
    } else if (hour === 21) {
      // 9 PM
      mainWelcome = `It's getting late${userNameValue}`;
    } else if (hour === 22) {
      // 10 PM
      mainWelcome = `Late evening. Time to start winding down`;
    } else if (hour === 23) {
      // 11 PM
      mainWelcome = `Evening${userNameValue}. The perfect time for reflection or rest.`;
    }

    

    // Days of the week Overrides
    // Specific adjustments for Fridays
    if (dayOfWeek === "Friday") {
        if (hour >= 15 && hour < 16) {
          subWelcome = "It's Friday! The weekend is just around the corner.";
        } else if (hour >= 19) {
          subWelcome = "The weekend begins now";
        }
    }

    if (dayOfWeek === "Saturday") {
      if (hour >= 17 && hour < 20) {
        subWelcome = "It's Saturday Night! Time to relax and enjoy the weekend.";
      } 
    }

    if (dayOfWeek === "Sunday") {
      if (hour >= 17 && hour < 19) {
        subWelcome = "Sadly the weekend is almost over";
      }
    }

    // Holiday Overrides
    // Check for Halloween
    if (isHalloweenNow) {
        mainWelcome = "Happy Halloween!";
        subWelcome = "Hope it's spooky and fun!";
        return { mainWelcome, subWelcome };
    } else if (isHalloweenSoon) {
        mainWelcome = "It's almost Halloween";
        subWelcome = "The festive season is almost upon us.";
    }

    // Check for Christmas
    if (isChristmasNow) {
        mainWelcome = "Merry Christmas!";
        subWelcome = "Wishing you a joyful day filled with warmth and cheer.";
        return { mainWelcome, subWelcome };
    } else if (isChristmasSoon) {
        mainWelcome = "Christmas is coming!";
        subWelcome = "The festive season is almost upon us.";
    }

    // Check for New Year's Eve
    if (isNewYearsEveNow) {
        mainWelcome = "Happy New Year's Eve!";
        subWelcome = "Here's to a bright New Year ahead!";
        return { mainWelcome, subWelcome };
    } else if (isNewYearsEveSoon) {
        mainWelcome = "New Year's Eve is on the horizon!";
        subWelcome = "Get ready to welcome the New Year!";
    }

    // Check for New Year's Day
    if (isNewYearNow) {
        mainWelcome = "Happy New Year!";
        subWelcome = "Wishing you a year full of happiness and success.";
        return { mainWelcome, subWelcome };
    }

    // Check for Valentine's Day
    if (isValentinesDayNow) {
        mainWelcome = "Happy Valentine's Day!";
        subWelcome = "Spread love and joy around you.";
        return { mainWelcome, subWelcome };
    } else if (isValentinesDaySoon) {
        mainWelcome = "Valentine's Day is coming up!";
        subWelcome = "A day full of love and affection is almost here.";
    }

    // Check for St. Patrick's Day
    if (isStPatricksDayNow) {
        mainWelcome = "Happy St. Patrick's Day!";
        subWelcome = "May the luck of the Irish be with you.";
        return { mainWelcome, subWelcome };
    }

    // Check for Guy Fawkes Day
    if (isGuyFawkesDayNow) {
        mainWelcome = "Happy Bonfire Night";
        subWelcome = "Remember, remember the fifth of November!";
        return { mainWelcome, subWelcome };
    } else if (isGuyFawkesDaySoon) {
        mainWelcome = "Guy Fawkes Day is approaching!";
        subWelcome = "A night full of fireworks and bonfires awaits.";
    }

    // Check for Remembrance Day
    if (isRemembranceDayNow) {
        mainWelcome = "Remembrance Day";
        subWelcome = "Lest we forget.";
        return { mainWelcome, subWelcome };
    }

    // Check for Boxing Day
    if (isBoxingDayNow) {
        mainWelcome = "Happy Boxing Day!";
        subWelcome = "Hope you enjoy the holiday!";
        return { mainWelcome, subWelcome };
    }
  
    return { mainWelcome, subWelcome };
  };
  

  const { mainWelcome, subWelcome } = getWelcomeMessages();

  return (
    <div className='welcomeContainer' id='welcomeContainer'>
      <h1>{mainWelcome}</h1>
      <h2>{subWelcome}</h2>
      <p>{currentTime.format('dddd MMMM Do')}</p>
    </div>
  );
};

export default WelcomeBanner;
