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

    if (hour === 0) {
      // Midnight
      mainWelcome = `Midnight hour`;
      subWelcome = "Everything is quieter";
    } else if (hour === 1) {
      // 1 AM
      mainWelcome = `Still night`;
      subWelcome = "The quiet hour, perfect for deep thoughts or deep sleep.";
    } else if (hour === 2) {
      // 2 AM
      mainWelcome = `Night time`;
      subWelcome = "The world sleeps, and dreams weave their tales.";
    } else if (hour === 3) {
      // 3 AM
      mainWelcome = `Deep night time`;
      subWelcome = "The darkest part of the night.";
    } else if (hour === 4) {
      // 4 AM
      mainWelcome = `Deep night time`;
      subWelcome = "Quiet before the dawn, the world is still.";
    } else if (hour === 5) {
      // 5 AM
      mainWelcome = `The sun will be up soon`;
      subWelcome = "Early risers begin their day, while the world gently wakes.";
    } else if (hour === 6) {
      // 6 AM
      mainWelcome = "Early morning";
      subWelcome = "The early bird catches the worm.";
    } else if (hour === 7) {
      // 7 AM
      mainWelcome = `Good morning!`;
      subWelcome = "The day starts for many, breakfast time.";
    } else if (hour === 8) {
      // 8 AM
      mainWelcome = `Good morning!`;
      subWelcome = "Time to start getting to work";
    } else if (hour === 9) {
      // 9 AM
      mainWelcome = `Good morning!`;
      subWelcome = "Work and school are in full swing.";
    } else if (hour === 10) {
      // 10 AM
      mainWelcome = `Good morning!`;
      subWelcome = "Mid-morning - a time for productivity.";
    } else if (hour === 11) {
      // 11 AM
      mainWelcome = `Good morning!`;
      subWelcome = "Late morning, almost time for a midday break.";
    } else if (hour === 12) {
      // Noon
      mainWelcome = `Afternoon!`;
      subWelcome = "Midday has arrived. Time for lunch!";
    } else if (hour === 13) {
      // 1 PM
      mainWelcome = `Afternoon!`;
      subWelcome = "Early afternoon, the day continues.";
    } else if (hour === 14) {
      // 2 PM
      mainWelcome = `Afternoon!`;
      subWelcome = "Mid-afternoon, a perfect time for a short break.";
    } else if (hour === 15) {
      // 3 PM
      mainWelcome = `Afternoon!`;
      subWelcome = "The afternoon is well underway.";
    } else if (hour === 16) {
      // 4 PM
      mainWelcome = `Afternoon!`;
      subWelcome = "Late afternoon, the day begins to wind down.";
    } else if (hour === 17) {
      // 5 PM
      mainWelcome = `Evening!`;
      subWelcome = "The end of the conventional workday.";
    } else if (hour === 18) {
      // 6 PM
      mainWelcome = `Evening!`;
      subWelcome = "Early evening, time to transition from work to relaxation.";
    } else if (hour === 19) {
      // 7 PM
      mainWelcome = `Evening!`;
      subWelcome = "Dinner time for many. The evening is young.";
    } else if (hour === 20) {
      // 8 PM
      mainWelcome = `Evening!`;
      subWelcome = "Mid-evening. Time for relaxation or evening activities.";
    } else if (hour === 21) {
      // 9 PM
      mainWelcome = `Evening!`;
      subWelcome = "The night progresses. Time for late evening routines.";
    } else if (hour === 22) {
      // 10 PM
      mainWelcome = `Evening!`;
      subWelcome = "Late evening. The day winds down further.";
    } else if (hour === 23) {
      // 11 PM
      mainWelcome = `Evening!`;
      subWelcome = "Almost midnight. The perfect time for reflection or rest.";
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
