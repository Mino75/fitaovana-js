// Configuration variables
const buttonSelector = ".your-button-class"; // Change this to match your button
const intervalTime = 5000; // Time in milliseconds (5000ms = 5 seconds)

// Function to click all occurrences of the button
function clickAllButtons() {
    const buttons = document.querySelectorAll(buttonSelector);
    buttons.forEach(button => {
        button.click();
        console.log("Clicked a button!");
    });
}

// Run the function every `intervalTime` milliseconds
setInterval(clickAllButtons, intervalTime);
