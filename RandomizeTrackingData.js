(function randomTrackingDataScript() {
  // Utility: returns a random item from an array.
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Utility: returns a random integer between min (inclusive) and max (inclusive).
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Data samples for randomized personal info.
  const firstNames = ["Alice", "Bob", "Carlos", "Diana", "Eve", "Fatima", "George", "Hiroshi", "Ivan", "Julia"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Garcia", "Müller", "Kim", "Chen", "O'Neil"];

  // Arrays for address components.
  const streetPrefixes = ["Street", "St.", "Avenue", "Ave.", "Boulevard", "Blvd.", "Lane", "Ln.", "Road", "Rd.", "Alley", "Ally", "Court", "Ct."];
  const buildingTypes = ["Bld", "Building", "Block", "Complex"];
  // City name modifiers.
  const cityPrefixes = ["Saint", "San", "New", "Fort", "La", "El", "Monte"];
  const citySuffixes = ["City", "Ville", "Town", "Burg", "polis", "grad", "dorp"];

  // A list of generic street names and city names.
  const streetNames = ["Main", "Central", "Park", "Oak", "Pine", "Maple", "Cedar", "Elm", "Riverside", "Hill"];
  const cityNames = ["Spring", "River", "Forest", "Lake", "Meadow", "Valley", "Grove", "Heights"];

  // A simple list of countries.
  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Spain", "Brazil", "Japan", "South Korea"];

  // Generate a randomized address with street number, prefix, and optional building info.
  function generateRandomAddress() {
    const streetNumber = getRandomInt(1, 9999);
    const streetPrefix = getRandomItem(streetPrefixes);
    const streetName = getRandomItem(streetNames);
    // Optionally include a building type and number.
    const includeBuilding = Math.random() < 0.5;
    let buildingInfo = "";
    if (includeBuilding) {
      buildingInfo = ", " + getRandomItem(buildingTypes) + " " + getRandomInt(1, 100);
    }
    return `${streetNumber} ${streetPrefix} ${streetName}${buildingInfo}`;
  }

  // Generate a randomized city name with optional prefix and suffix.
  function generateRandomCity() {
    const usePrefix = Math.random() < 0.5;
    const useSuffix = Math.random() < 0.5;
    const prefix = usePrefix ? getRandomItem(cityPrefixes) + " " : "";
    const base = getRandomItem(cityNames);
    const suffix = useSuffix ? " " + getRandomItem(citySuffixes) : "";
    return prefix + base + suffix;
  }

  // Generate a randomized personal data object.
  function generateRandomPersonalData() {
    return {
      firstName: getRandomItem(firstNames),
      lastName: getRandomItem(lastNames),
      address: generateRandomAddress(),
      city: generateRandomCity(),
      country: getRandomItem(countries)
    };
  }

  // Convert the personal data object to a JSON string.
  function personalDataToString() {
    return JSON.stringify(generateRandomPersonalData());
  }

  // Update (or set) a cookie with the randomized personal data.
  function updateTrackingCookie() {
    const dataString = personalDataToString();
    // Set a cookie named "trackingData" with a 1-day expiry.
    document.cookie = "trackingData=" + encodeURIComponent(dataString) + "; max-age=" + (60 * 60 * 24) + "; path=/";
    console.log("Updated tracking cookie with:", dataString);
  }

  // Override geolocation functions to return randomized location data.
  if (navigator.geolocation) {
    // Override getCurrentPosition.
    const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
    navigator.geolocation.getCurrentPosition = function(success, error, options) {
      const randomPosition = {
        coords: {
          // Random latitude between -90 and 90.
          latitude: (Math.random() * 180 - 90).toFixed(6) * 1,
          // Random longitude between -180 and 180.
          longitude: (Math.random() * 360 - 180).toFixed(6) * 1,
          accuracy: getRandomInt(10, 100),
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: Date.now()
      };
      console.log("Returning randomized geolocation:", randomPosition);
      if (typeof success === "function") {
        success(randomPosition);
      }
    };

    // Override watchPosition.
    const originalWatchPosition = navigator.geolocation.watchPosition;
    navigator.geolocation.watchPosition = function(success, error, options) {
      const id = setInterval(() => {
        const randomPosition = {
          coords: {
            latitude: (Math.random() * 180 - 90).toFixed(6) * 1,
            longitude: (Math.random() * 360 - 180).toFixed(6) * 1,
            accuracy: getRandomInt(10, 100),
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: Date.now()
        };
        console.log("Returning randomized geolocation update:", randomPosition);
        if (typeof success === "function") {
          success(randomPosition);
        }
      }, 60000); // Update every minute.
      return id;
    };
  } else {
    console.warn("Geolocation is not supported on this browser.");
  }

  // Start by updating the cookie immediately.
  updateTrackingCookie();
  // Then update it every minute.
  setInterval(updateTrackingCookie, 60000);

  console.log("Randomized tracking data script activated.");
})();
