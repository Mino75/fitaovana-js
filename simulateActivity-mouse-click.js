(function simulateUserActivity() {
  // Function to simulate a mousemove event at a random position.
  function simulateMouseMove() {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y
    });
    document.dispatchEvent(mouseMoveEvent);
    console.log(`Simulated mousemove at (${x}, ${y})`);
  }

  // Function to simulate a right-click (contextmenu) event at a random position.
  function simulateRightClick() {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    const rightClickEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      button: 2 // Right mouse button
    });
    document.dispatchEvent(rightClickEvent);
    console.log(`Simulated right click at (${x}, ${y})`);
  }

  // Schedule the simulation to run every 30 seconds.
  const interval = setInterval(() => {
    simulateMouseMove();
    simulateRightClick();
  }, 30000);

  console.log("User activity simulation started (mousemove and right-click every 30 seconds).");
  
  // Optional: Expose a method to stop the simulation.
  window.stopUserActivitySimulation = function() {
    clearInterval(interval);
    console.log("User activity simulation stopped.");
  };
})();
