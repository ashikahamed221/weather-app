let weatherform = document.querySelector('.weatherform');
let cityinput = document.querySelector('.cityname');
let display = document.querySelector('.display');
let apikey = "c32df85eadc73fd424064640dba25cdf";

weatherform.addEventListener("click", async event =>{
    event.preventDefault();
    
    let city = cityinput.value

    if(city){
        try{
            let a = await weatherdata(city)
            weatherinfo(a)
        }
        catch(error){
            console.error(error);
            displayeror(error);
        }
    }
    else{
        displayeror("please enter your city")
    }
})
async function weatherdata(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metrices`
    let response = await fetch(api)

    if(!response.ok){
        throw new error("could not find weather");
    }
    return await response.json()
}
function weatherinfo(data){
      const {name:city,main:{humidity,temp},weather:[{description,id}]} = data;
      console.log(data)

      display.textContent=""
      display.style.display= "flex"

      const cityname = document.createElement("h1")
      const hum = document.createElement("p")
      const temperature = document.createElement("p")
      const descp = document.createElement("p")
      const weatheremoji = document.createElement("p")

      cityname.textContent = city;
      hum.textContent = `Humudity ${humidity}%`;
      temperature.textContent = `${(temp-273.15).toFixed(1)}°C`
      descp.textContent = description;
      weatheremoji.textContent=getweatheremoji(id)

      cityname.classList.add("city")
      hum.classList.add("humudity")
      temperature.classList.add("tempdisplay")
      descp.classList.add("descdisplay")
      weatheremoji.classList.add("weatheremoji")

      display.appendChild(cityname)
      display.appendChild(hum)
      display.appendChild(temperature)
      display.appendChild(descp)
      display.appendChild(weatheremoji)
        
}
function getweatheremoji(weatherid){
    switch(true){
        case(weatherid>=200 && weatherid<300):
           return "🌩️"
        case(weatherid>=300 && weatherid<400):
           return "🌧️"
        case(weatherid>=500 && weatherid<600):
           return "🌧️"
        case(weatherid>=600 && weatherid<700):
           return "❄️"
        case(weatherid>=700 && weatherid<800):
           return "🌫"
        case(weatherid===800):
           return "☀️"
        case(weatherid>=801 && weatherid<801):
           return "☁️"
        default:
            return "-";
       }
}
function displayeror(message){
      const errordisplay = document.createElement("p")
      errordisplay.textContent = message;
      errordisplay.classList.add("errordisplay")

      display.textContent="";
      display.style.display="flex";
      display.appendChild(errordisplay)
}