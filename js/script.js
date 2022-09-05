
//clock and calendar

const time = document.querySelector('.time');
const date = new Date();
const currentTime = date.toLocaleTimeString();

const dateList = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = date.toLocaleDateString('en-US', options);


showTime();
function showTime() {
   const date = new Date();
   const currentTime = date.toLocaleTimeString();
   time.textContent = currentTime;
   showGreeting();
   showDate();
   setTimeout(showTime, 1000);
 };
 

function showDate() {
   dateList.textContent = currentDate;
};

// Greeting
function getTimeOfDay() {
   const date = new Date();
   const hours = date.getHours();
   if ( 0 <= hours && hours < 6) {
       return 'night';
   } else if  (6 <= hours && hours < 12) {
      return 'morning';
   } else if (12 <= hours && hours < 18) {
      return 'afternoon';
   } else return 'evening';
 };

function showGreeting(){
const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
   greeting.textContent = greetingText;
}


 function setLocalStorage() {
   let name = document.querySelector('.name');
   localStorage.setItem('name', name.value);
 }
 window.addEventListener('beforeunload', setLocalStorage)

 function getLocalStorage() {
   let name = document.querySelector('.name');
   if(localStorage.getItem('name')) {
     name.value = localStorage.getItem('name');
   };
 }
 window.addEventListener('load', getLocalStorage);

 //Слайдер изображений

 const body = document.querySelector('body');
 let randomNum;
 function getRandomNum(min, max){
   min = Math.ceil(1);
   max = Math.floor(20);
   randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
 };
 getRandomNum();

 function setBg(){
   let bgNum;
   let timeOfDay = getTimeOfDay();
   if ( 1 <= randomNum && randomNum <= 9){
      bgNum = `${randomNum}`.padStart(2, '0')
   } else bgNum = randomNum;    
   const img = new Image();
  img.src = `https://raw.githubusercontent.com/LDS196/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener('load', () => {
   body.style.backgroundImage = `url('https://raw.githubusercontent.com/LDS196/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
 });
 }
 setBg();

 const nextSlide = document.querySelector('.slide-next');
 const prevSlide = document.querySelector('.slide-prev');

nextSlide.addEventListener('click', getSlideNext);
function getSlideNext(){
   randomNum = randomNum + 1;
   if (randomNum > 20) {
      randomNum = 1;
      setBg();
   } else setBg();
   
}

prevSlide.addEventListener('click', getSlideprev);
function getSlideprev(){
   randomNum = randomNum - 1;
   if (randomNum < 1) {
      randomNum = 20;
      setBg();
   } else setBg();
};

// Виджет погоды

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');


city.addEventListener('change', getWeather);

 async function getWeather() {  
   const city = document.querySelector('.city');
   if( city.value == ""){
      alert('Enter correct city');
   } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d54b41946e73ae94ecb0232cbad307c3&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent =`${Math.round(data.main.temp)} °C`;
      weatherDescription.textContent = data.weather[0].description;
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
   }

 };

 function setLocalStorage1() {
   localStorage.setItem('temperature', temperature.textContent);
   localStorage.setItem('weatherDescription', weatherDescription.textContent);
   localStorage.setItem('wind', wind.textContent);
   localStorage.setItem('humidity', humidity.textContent);
   localStorage.setItem('city', city.value);
 }
 window.addEventListener('beforeunload', setLocalStorage1)
 
 
 function getLocalStorage1() {
   
   if(localStorage.getItem('city')) {
     city.value = localStorage.getItem('city');
   };
   if(localStorage.getItem('humidity')) {
      humidity.textContent = localStorage.getItem('humidity');
    };
    if(localStorage.getItem('wind')) {
      wind.textContent = localStorage.getItem('wind');
    };
    if(localStorage.getItem('weatherDescription')) {
      weatherDescription.textContent = localStorage.getItem('weatherDescription');
    };
    if(localStorage.getItem('temperature')) {
      temperature.textContent = localStorage.getItem('temperature');
    };

 }
 window.addEventListener('load', getLocalStorage1);


//Виджет цитата дня

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

changeQuote.addEventListener('click', getQuotes);

 async function getQuotes() { 
   const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   quote.textContent = data[randomNum].text;
   author.textContent = data[randomNum].author;
   randomNum = randomNum + 1;
   if (randomNum > 19) {
      randomNum = 1;
   }
 };
 getQuotes();
 
 // Audioplayer

 import playList from './playList.js';
 
 let playNum = 0;
 let isPlay = false;
 let currentTimeTrack = 0
 const playPrevBtn = document.querySelector('.play-prev');
 const playNextBtn = document.querySelector('.play-next');
 const playPlayer = document.querySelector('.play');
 const playerTitle = document.querySelector('.player_title');
 const audio = new Audio();
const volumeSlider = document.querySelector('.volume_slider');
const mute = document.querySelector('.mute');

volumeSlider.onchange = function (){
   audio.volume = volumeSlider.value / 100;
   console.log(audio.volume)
}

mute.addEventListener('click', function() {
   if(!isPlay){
      audio.volume = '0.5';
      isPlay = true;
      mute.classList.remove('mute-active');
   } else {
      audio.volume = '0.0';
      isPlay = false;
      mute.classList.add('mute-active');
   }
   
})


 playPlayer.addEventListener('click', playStopAudio);
 
 function playStopAudio() {
   if(!isPlay){
      audio.src = playList[playNum].src;
      audio.currentTime = currentTimeTrack;
      audio.volume
      audio.play();
      currentTimeTrack = 0;
      playPlayer.classList.add('pause')
      isPlay = true;
      song[playNum].classList.add('current-song');
      playerTitle.textContent = (playList[playNum].title);
      
   } else {
      audio.pause();
      currentTimeTrack = Math.round(audio.currentTime);
      console.log(currentTimeTrack)
      playPlayer.classList.remove('pause')
      isPlay = false;
      ;
   }
 };
 
   
 function playNext(){
      if( playNum >= playList.length - 1){
         isPlay = false;
         song[playNum].classList.remove('current-song')
         playNum = 0;
         playerTitle.innerHTML = '';
         playStopAudio();
      } else  {
         isPlay = false;
         song[playNum].classList.remove('current-song');
         playNum = playNum + 1;
         playerTitle.innerHTML = '';
         playStopAudio();
      }
 };
 playNextBtn.addEventListener('click', playNext);

 function playPrev(){
   if( playNum == 0){
      isPlay = false;
      song[playNum].classList.remove('current-song');
      playNum = playList.length - 1;
      playerTitle.innerHTML = '';
      playStopAudio();
   } else {
      isPlay = false;
      song[playNum].classList.remove('current-song');
      playNum = playNum - 1;
      playerTitle.innerHTML = '';
      playStopAudio();
   }
 };
 playPrevBtn.addEventListener('click', playPrev);

//Autoplay

 audio.addEventListener('ended', playNext);

//Playlist

 const playConteiner = document.querySelector('.play-list');
 
 for (let i = 0; i < playList.length; i++){
   const li =document.createElement('li');
   li.classList.add('play-item');
   li.textContent = playList[i].title;
   playConteiner.append(li)
 };
 let song = document.querySelectorAll('.play-item')
 
//Progressbar
const progressContainer = document.querySelector('.progress_container');
const progress = document.querySelector('.progress');
const currentTimeSong = document.querySelector('.progress_current');
const totalTimeSong = document.querySelector('.progress_total');


function updateProgress (e){
const {duration, currentTime} = e.srcElement;
const progressPercent = (currentTime / duration) * 100;

progress.style.width = `${progressPercent}%`;
currentTimeSong.textContent = secondsToHms(Math.round(currentTime));
totalTimeSong.textContent = secondsToHms(duration);
};

audio.addEventListener('timeupdate', updateProgress); 

//Transformtime
function secondsToHms(d) {
   d = Number(d);
   var h = Math.floor(d / 3600);
   var m = Math.floor(d % 3600 / 60);
   var s = Math.floor(d % 3600 % 60);
   return `${h}:${m}:${s}`;
}

//Set progress
function setProgreess(e){
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;
audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgreess);
