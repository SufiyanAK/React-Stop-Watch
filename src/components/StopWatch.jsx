import React, { useState, useEffect, useRef } from "react"


function StopWatch() {
    // const [sec, setSec] = useState(0);
    // const [min, setMin] = useState(0);
    // const [hour, setHour] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalId = useRef(null);
    const startTime = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalId.current = setInterval(() => {
                setTime(Date.now() - startTime.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalId.current);
        }

    }, [isRunning]);


    function startWatch() {
        setIsRunning(true);
        startTime.current = Date.now() - time;
    }

    function stopWatch() {
        setIsRunning(false);
    }

    function resetWatch() {
        setTime(0)
        setIsRunning(false);

    }

    function formatTime() {
        let hour = Math.floor(time / (1000 * 60 * 60));
        let min = Math.floor(time / (1000 * 60) % 60);
        let sec = Math.floor(time / (1000) % 60);
        let miliSec = Math.floor(time % 1000);


        hour = String(hour).padStart(2, '0');
        min = String(min).padStart(2, '0');
        sec = String(sec).padStart(2, '0');
        miliSec = String(miliSec).padStart(2, '0');

        return `${hour}:${min}:${sec}:${miliSec}`

    }


    return (
        <div className="stopWatchContainer">
            <div className="stopWatch">
                <span>{formatTime()}</span>
                <div className="btns">
                    <button onClick={stopWatch}>Stop</button>
                    <button onClick={resetWatch}>Reset</button>
                    <button onClick={startWatch}>Start</button>
                </div>
            </div>
        </div>

    )
}

export default StopWatch