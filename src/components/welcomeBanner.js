import React, { useState, useEffect } from 'react';
import '../css/welcomeContainer.css';
import moment from 'moment';

const WelcomeBanner = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // Update the time every second
    return () => clearInterval(timer);
  }, []);

  const getWelcomeMessages = () => {
    const hour = currentTime.hour();
    const dayOfWeek = currentTime.format('dddd');
    const currentDate = currentTime.format('DD-MM'); // Formats date as "DD-MM", e.g., "31-10" for October 31st

    // Holiday flags
    const isHalloweenSoon = currentTime.isBetween(moment('25-10', 'DD-MM'), moment('30-10', 'DD-MM'), 'day', '[]');
    const isHalloweenNow = currentDate === "31-10";

    const isChristmasSoon = currentTime.isBetween(moment('20-12', 'DD-MM'), moment('24-12', 'DD-MM'), 'day', '[]');
    const isChristmasNow = currentDate === "25-12";

    const isNewYearsEveSoon = currentTime.isBetween(moment('27-12', 'DD-MM'), moment('30-12', 'DD-MM'), 'day', '[]');
    const isNewYearsEveNow = currentDate === "31-12";

    const isNewYearNow = currentDate === "01-01";

    const isValentinesDaySoon = currentTime.isBetween(moment('10-02', 'DD-MM'), moment('13-02', 'DD-MM'), 'day', '[]');
    const isValentinesDayNow = currentDate === "14-02";

    const isStPatricksDaySoon = currentTime.isBetween(moment('10-03', 'DD-MM'), moment('16-03', 'DD-MM'), 'day', '[]');
    const isStPatricksDayNow = currentDate === "17-03";

    const isGuyFawkesDaySoon = currentTime.isBetween(moment('01-11', 'DD-MM'), moment('04-11', 'DD-MM'), 'day', '[]');
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


    //Defaults
    if (hour >= 6 && hour < 8) {
      // Early Morning
      subWelcome = "Good morning! The early bird gets the worm.";
    } else if (hour >= 8 && hour < 10) {
      // Mid Morning
      subWelcome = "Good morning! Full steam ahead.";
    } else if (hour >= 10 && hour < 12) {
      // Late Morning
      subWelcome = "Good morning! Almost time for a break.";
    } else if (hour >= 12 && hour < 14) {
      // Early Afternoon
      subWelcome = "Good afternoon! Time for lunch?";
    } else if (hour >= 14 && hour < 16) {
      // Mid Afternoon
      subWelcome = "Good afternoon! Keep pushing through.";
    } else if (hour >= 16 && hour < 18) {
      // Late Afternoon
      subWelcome = "Good afternoon! Wrapping up the day.";
    } else if (hour >= 18 && hour < 20) {
      // Early Evening
      mainWelcome = `Welcome, today is ${dayOfWeek}, almost time to start a new week.`;
      subWelcome = "Good evening! Time to relax.";
    } else if (hour >= 20 && hour < 22) {
      // Mid Evening
      mainWelcome = `Welcome, today is ${dayOfWeek}, time to rest.`;
      subWelcome = "Good evening! It's getting late, time to wind down.";
    } else if (hour >= 22 && hour < 24) {
      // Late Evening
      subWelcome = "Good night! Time to get some rest.";
    } else {
      // Night
      subWelcome = "It's late! Don't forget to rest.";
    }

    // Days of the week Overrides
    // Specific adjustments for Fridays
    if (dayOfWeek === "Friday") {
        if (hour >= 17 && hour < 19) {
        subWelcome = "It's Friday! The weekend is just around the corner.";
        } else if (hour >= 19) {
        subWelcome = "It's Friday night! Time to relax and enjoy the weekend.";
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
    } else if (isStPatricksDaySoon) {
        mainWelcome = "St. Patrick's Day is nearly here!";
        subWelcome = "Time to celebrate with green!";
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
    <div className='welcomeContainer'>
      <h1>{mainWelcome}</h1>
      <h2>{subWelcome}</h2>
      <p>{currentTime.format('h:mm A')}</p>
    </div>
  );
};

export default WelcomeBanner;
