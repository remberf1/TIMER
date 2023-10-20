document.addEventListener('DOMContentLoaded', function () {
    const customMessageInput = document.getElementById('customMessage');
    const timerInput = document.getElementById('timerInput');
    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');
    const resetButton = document.getElementById('resetTimer');
    const remainingTimeDisplay = document.getElementById('remainingTime');
    let timer;
    let remainingTime = -1;

    startButton.addEventListener('click', function () {
        const customMessage = customMessageInput.value;
        const timerValue = timerInput.value;
        let duration;

        if (customMessage && timerValue && parseInt(timerValue) > 0) {
            // Clear any existing timer
            clearInterval(timer);

            // Parse the timer input into milliseconds
            if (timerValue.endsWith('s')) {
                duration = parseInt(timerValue) * 1000; // Seconds to milliseconds
            } else if (timerValue.endsWith('m')) {
                duration = parseInt(timerValue) * 60 * 1000; // Minutes to milliseconds
            } else if (timerValue.endsWith('h')) {
                duration = parseInt(timerValue) * 60 * 60 * 1000; // Hours to milliseconds
            } else {
                duration = parseInt(timerValue) * 1000; // Default to seconds
            }

            remainingTime = duration;
            displayRemainingTime(); // Display initial time

            timer = setInterval(function () {
                remainingTime -= 1000; // Subtract one second
                displayRemainingTime(); // Update the displayed time

                if (remainingTime === 0) {
                    // Display a notification when the timer reaches zero
                    const notificationOptions = {
                        type: 'basic',
                        title: 'Time Over',
                        message: 'The timer has reached zero',
                        iconUrl: 'icon.png'
                    };
                    chrome.notifications.create('timerNotification', notificationOptions);
                    // Display a prompt
                    window.alert('Time is over');
                }
            }, 1000); // Update every second
        }
    });

    stopButton.addEventListener('click', function () {
        // Stop the timer
        clearInterval(timer);
        remainingTime = 0;
        remainingTimeDisplay.innerText = '';
    });

    resetButton.addEventListener('click', function () {
        // Reset the input fields and remaining time display
        customMessageInput.value = '';
        timerInput.value = '';
        remainingTimeDisplay.innerText = '';
        remainingTime = 0;

        // Stop the timer
        clearInterval(timer);
    });

    // Function to display the remaining time
    function displayRemainingTime() {
        const formattedTime = formatTime(remainingTime);
        remainingTimeDisplay.innerText = `Remaining Time: ${formattedTime}`;
    }

    // Function to format the remaining time
    function formatTime(milliseconds) {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);

        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
        return formattedTime;
    }
});
