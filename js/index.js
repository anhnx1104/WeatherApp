const APP_ID = "c6080a95d588a1cbeba2d1b1a1d0a461";
DEFAULT_VALUE = "--";

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrice = document.querySelector(".sunrice");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

// Section

searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`
  ).then(async (res) => {
    console.log(res);
    const data = await res.json();
    cityName.innerHTML = data.name || DEFAULT_VALUE;
    weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

    sunrice.innerHTML =
      moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
    sunset.innerHTML =
      moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
    humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
    windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
  });
});

// tim kiem giong noi

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "vi-VI";
recognition.continuous = false;

const microphone = document.querySelector(".microphone");

const handleVoice = (text) => {
  console.log(text);

  const handleText = text.toLowerCase();
  if (handleText.includes("thời tiết tại")) {
    const location = handleText.split("tại")[1].trim();
    searchInput.value = location;
    changeEvent = new Event("change");
    searchInput.dispatchEvent(changeEvent);
    return;
  }

  const container = document.querySelector(".container");
  if (handleText.includes("thay đổi màu nền")) {
    const color = handleText.split("màu nền")[1].trim();
    container.style.background = color;
    return;
  }
  if (handleText.includes("màu nền mặc định")) {
    container.style.background = "";

    return;
  }
};

microphone.addEventListener("click", (e) => {
  e.preventDefault();

  recognition.start();
});

recognition.onspeechend = () => {
  recognition.stop();
};

recognition.onerror = (e) => {
  console.log(e);
};

recognition.onresulte = (e) => {
  console.log(e);
  const text = e.result[0][0].transcript;
  handleVoice(text);
};
