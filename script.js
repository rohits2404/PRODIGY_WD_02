// Stopwatch logic
let stopwatchInterval;
let startTime;
let lapCount = 1;

function startStop() {
    const startStopButton = document.querySelector('.control.start');
    if (startStopButton.classList.contains('on')) {
        // Stop the stopwatch
        clearInterval(stopwatchInterval);
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('on');
    } else {
        // Start the stopwatch
        startTime = Date.now();
        stopwatchInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('on');
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    const startStopButton = document.querySelector('.control.start');
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('on');
    document.querySelector('.timer').textContent = '00:00.000';
    document.querySelector('.laps').innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (!stopwatchInterval) return; // Only record lap if stopwatch is running
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);

    const lapList = document.querySelector('.laps');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${formattedTime}`;
    lapItem.classList.add('lap-item');
    lapList.appendChild(lapItem);

    lapCount++;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.timer').textContent = formattedTime;
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000) / 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}