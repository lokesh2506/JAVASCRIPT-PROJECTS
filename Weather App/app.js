const valueSearch=document.getElementById('valueSearch');
const city=document.getElementById('city');
const temperature=document.getElementById('temperature');
const description=document.querySelector('.description');
const clouds=document.getElementById('clouds');
const humidity=document.getElementById('humidity');
const pressure=document.getElementById('pressure');
let form = document.querySelector("form");
const image=document.querySelector('.image');

let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=9505fd1df737e20152fbd78cdb289b6a&q=';

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(valueSearch.value!=""){
        searchWeather();
    }
})


const searchWeather=()=>{
    fetch(url+valueSearch.value)
    .then(response=>response.json()).then(data=>{
        if(data.cod==200){
            city.querySelector('figcaption').innerText=data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            image.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            console.log(data.weather[0].icon);
            temperature.querySelector('span').innerText=data.main.temp;
            description.innerText=data.weather[0].description;
            clouds.innerText=`${data.clouds.all}%`;
            humidity.innerText=`${data.main.humidity}%`;
            pressure.innerText=`${data.main.pressure}%`;           
        }
        else{
            main.classList.add('error');
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
        }
        valueSearch.value = '';
    })
}

const initApp = () => {
    valueSearch.value = 'Washington';
    searchWeather();
}
initApp();