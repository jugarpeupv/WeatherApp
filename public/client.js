
// Getting CurrentLocation
function getCurrentLocation(){
  // document.getElementById('inputbox').value = null
  if('geolocation' in navigator) {
   navigator.geolocation.getCurrentPosition(async (position) => {
       
       const lat = position.coords.latitude;
       const long = position.coords.longitude;

       //Fetching /api to send client the current location
       const data = {lat, long};
       const fetchoptions = {
         method: 'POST',
         headers:{
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data),
       }
       const response = await fetch('/api', fetchoptions);
       const responsedata = await response.json();
       console.log(responsedata.name);

       document.getElementById('date__location').innerHTML = `${lat.toFixed(2)}º  ${long.toFixed(2)}º ${responsedata.name} ${responsedata.sys.country}`;
       document.getElementById('weather__temp').innerHTML = `${(responsedata.main.temp-273.15).toFixed(2)}º`
       document.getElementById('weather__description').innerHTML = `${responsedata.weather[0].main}`
  
   });  

} else {
  console.log("geolocation not supported")
}
}


// Getting Weather information
async function getWeatherInfo(city) {

  const response = await fetch(`/weather/${city}`);
  const responsedata = await response.json();
  if (responsedata.message === 'city not found') {
    document.getElementById('date__location').innerHTML = 'Error, location not found';
    document.getElementById('input__text').value = ''

  }
  console.log(responsedata)

 //Set the lat and long and icon
 const lat = responsedata.coord.lat
 const long = responsedata.coord.lon
 const icon = responsedata.weather[0].icon
 
 document.getElementById('date__location').innerHTML = `${lat.toFixed(2)}º  ${long.toFixed(2)}º ${responsedata.name} ${responsedata.sys.country}`;
 document.getElementById('weather__temp').innerHTML = `${(responsedata.main.temp.toFixed(2)-273.15).toFixed(2)}º`
 document.getElementById('weather__description').innerHTML = `${responsedata.weather[0].main}`
 document.getElementById('weather__icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
 document.getElementById('input__text').value = ''
 
}

// Getting Date information
function getDayName(){
  let date = new Date();
  if (date.getDay()===1) {
    let day = 'Monday'
    return day;
  } else if(date.getDay()===2){
    let day = 'Tuesday'
    return day;
  } else if(date.getDay()===3){
    let day = 'Wednesday'
    return day;
  } else if(date.getDay()===4){
    let day = 'Thursday'
    return day
  } else if(date.getDay()===5){
    let day = 'Friday'
    return day
  } else if(date.getDay()===6){
    let day = 'Saturday'
    return day
  } else if(date.getDay()===7){
    let day = 'Sunday'
    return day
  }
  return date;
}

function getMonthName(mm) {
  if(mm==1){
    return 'Jan'
  } else if(mm==2){
    return 'Feb'
  } else if(mm==3){
    return 'Mar'
  } else if(mm==4){
    return 'Apr'
  } else if(mm==5){
    return 'May'
  } else if(mm==6){
    return 'Jun'
  } else if(mm==7){
    return 'Jul'
  } else if(mm==8){
    return 'Aug'
  } else if(mm==9){
    return 'Sep'
  } else if(mm==10){
    return 'Oct'
  } else if(mm==11){
    return 'Nov'
  } else if(mm==12){
    return 'Dic'
  }
}

const day = getDayName();
document.getElementById('date__dayname').innerHTML = day

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let yyyy = today.getFullYear();

let date_today = dd + ' ' + getMonthName(mm) + ' ' + yyyy;

document.getElementById('date__largedate').innerHTML = date_today

const form = document.getElementById('input__form')

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const city = document.getElementById('input__text')
  getWeatherInfo(city.value);
})





