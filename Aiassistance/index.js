let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text) {
    document.body.style.background = "linear-gradient(to right,rgb(29, 42, 60),rgb(244, 28, 28))";
    setTimeout(() => {
        let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";

    text_speak.onend = () => {
        // Revert background after AI finishes speaking
        document.body.style.background = "linear-gradient(to left,rgb(160, 226, 240),rgb(62, 62, 65))";
    };
    window.speechSynthesis.speak(text_speak);
})
}
        

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let time = day.toLocaleTimeString();

    if (hours >= 0 && hours < 12) {
        speak(`Good morning! It's ${time}. How can I assist you`);
    } else if (hours >= 12 && hours < 16) {
        speak(`Good afternoon! It's ${time}. How can I assist you`);
    } else if (hours >= 16 && hours <= 20) {
        speak(`Good evening! It's ${time}. How can I assist you`);
    } else {
        speak(`Good night! It's ${time}. How can I assist you`);
    }
}

window.addEventListener('load', () => {
    // wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentResult = event.results[0][0].transcript;
    console.log("Recognized speech:", currentResult);
    content.innerText = currentResult;
    takeCommand(currentResult.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";

    // add 1 sec dealy 
    setTimeout(() => {
        voice.style.display = "none";
        btn.style.display = "flex";
    }, 1000);
});

function takeCommand(message) {
    message = message.toLowerCase();// Convert to lowercase for case-insensitive matching
    btn.style.display = "flex";
    voice.style.display = "none";
        // Greeting commands
        if (
            message.includes("hello") || 
            message.includes("hi") || 
            message.includes("hey nova") || 
            message.includes("nova")
        ) { 
            speak("Hello, how can I assist you?");
        }
    
        // Asking how Nova is doing
        else if (
            message.includes("how are you") || 
            message.includes("hu ar u") || 
            message.includes("how are you nova") || 
            message.includes("how r u") ||
            message.includes("tell me about yourself")
        ) {
            let responses = [
                "I'm just a virtual assistant, but I'm here to help you!",
                "I'm doing great! Thanks for asking. How about you?",
                "I'm always ready to assist you, sir!",
                "I'm functioning at full capacity. What can I do for you?"
            ];
            let randomResponse = responses[Math.floor(Math.random() * responses.length)];
            speak(randomResponse);
        }
        // Time-based greeting
        else if (message.includes("good morning") || message.includes("good afternoon") || message.includes("good evening") || message.includes("good night")) {
            let hours = new Date().getHours();
            let greeting = "";
    
            if (hours >= 0 && hours < 12) {
                greeting = "Good morning sir! Hope you have a great day.";
            } else if (hours >= 12 && hours < 16) {
                greeting = "Good afternoon sir! How is your day going?";
            } else if (hours >= 16 && hours < 20) {
                greeting = "Good evening sir! How can I assist you?";
            } else {
                greeting = "Good night sir! Sleep well and take care.";
            }
            
            speak(greeting);
        }
    
        // Providing the current time
        else if (message.includes("what time is it") || message.includes("tell me the time") || message.includes("time")) {
            let time = new Date().toLocaleTimeString();
            speak(`The current time is ${time}`);
        }
    
        // Providing the current date
        else if (message.includes("what is the date") || message.includes("tell me the date") || message.includes("date")) {
            let date = new Date().toDateString();
            speak(`Today's date is ${date}`);
        }
    
        // Asking Nova's name
        else if (message.includes("what is your name") || message.includes("who are you")) {
            speak("My name is Nova, your personal voice assistant.");
        }
    
        // Open Google
        else if (message.includes("open google")) {
            speak("Opening Google...");
            window.open("https://www.google.com", "_blank");
        }
    
        // Open YouTube
        else if (message.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://www.youtube.com", "_blank");
        }
    
        // Open GitHub
        else if (message.includes("open github")) {
            speak("Opening GitHub...");
            window.open("https://www.github.com", "_blank");
        }
    
        // Perform simple math calculations (e.g., "calculate 10 + 5")
        else if (message.includes("calculate")) {
            let expression = message.replace("calculate", "").trim(); // Extract numbers & operators
            try {
                let result = eval(expression);
                speak(`The result is ${result}`);
            } catch (error) {
                speak("Sorry, I couldn't calculate that.");
            }
        }
    
        // Default response if Nova doesn't understand
        else {
            speak("Sorry, I didn't understand that. Can you repeat?");
        }
    }
    
