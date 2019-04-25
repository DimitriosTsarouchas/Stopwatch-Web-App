$(function(){
    // variables
    let mode = 0;// App mode
    let timeCounter = 0;// time counter
    let lapCounter = 0; // lap counter
    let action; // variable for setInterval
    let lapNumber = 0; // number of laps

    // minutes,seconds and sentiseconds for time and lap
    let timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    // on App load show start and lap button
    hideshowButtons("#startButton", "#lapButton");

    // click on start button
    $("#startButton").click(function(){
        // mode on
        mode = 1;
        // show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        // start the counter
        startAction();
    });


    // click on stop button
    $("#stopButton").click(function() {
        // show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        // stop the counter
        clearInterval(action);
    });

    // click on resume button
    $("#resumeButton").click(function() {
        // show stop and lep buttons
        hideshowButtons("#stopButton", "#lapButton");
        // start the counter
        startAction();
    });

    // click on reset button 
    $("#resetButton").click(function() {
       // reload the page
       location.reload();
    });

    // click on lap button
    $("#lapButton").click(function() {
        // if mode is ON
        if(mode) {
            // stop action
            clearInterval(action);
            // resetLap and print lap details
            lapCounter = 0;
            addLap();
            // start action
            startAction();
        }
    });

    // functions

    // hodeshowButtons function shows 2 buttons
    function hideshowButtons(x,y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    // start the counter
    function startAction() {
        action = setInterval(function(){
            timeCounter++;
            // limit the counter to 100 minutes
            if(timeCounter == 100*60*100) {
                timeCounter = 0;
            }
            lapCounter++;
            // limit the counter to 100 minutes
            if(lapCounter == 100*60*100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }

    // updateTime: converts counters to min,sec,centisec
    function updateTime() {
        // 1min: 60sec*100centisec = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        // 1sec: 100 centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        // 1min: 60sec*100centisec = 6000 centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        // 1sec: 100 centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    // format numbers
    function format(number) {
        if( number < 10 ) {
            return '0' + number;
        }
        else {
            return number;
        }
    }

    // addLap function print lap details inside the lap box
    function addLap() {
        lapNumber++;
        let lapDetails = 
        '<div class="lap">' +
            '<div class="laptitle">' + 
                'Lap-' + lapNumber +
            '</div>' +
            '<div class="laptime">' +
                '<span>' + format(lapMinutes) + '</span>' +
                ':<span>' + format(lapSeconds) + '</span>' +
                ':<span>' + format(lapCentiseconds) + '</span>' +
            '</div>' +
            
        '</div>';
        $(lapDetails).prependTo('#laps');
    }
});