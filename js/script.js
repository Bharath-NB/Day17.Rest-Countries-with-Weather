async function myFunc(){
    let response = await fetch('https://restcountries.com/v3.1/all');
    if(response.ok){
        let countriesData = await response.json();
        let flexDiv = document.createElement('div');
        flexDiv.className = 'flex-container';
        for(let ind = 0 ; ind < countriesData.length; ind++)
        {
            let newDiv = document.createElement('div');
            let flagImg = document.createElement('img');
            let newP = document.createElement('p');
            let countryName = document.createElement('p'); 
            countryName.innerText = countriesData[ind].name.common; 
            countryName.style.color = 'white'; 
            countryName.style.background = 'black'; 
            countryName.style.padding = '5px';
            countryName.style.margin = '5px'; 
            newP.innerHTML = `
                <strong>Capital:</strong> ${countriesData[ind].capital ? countriesData[ind].capital[0] : 'Not Available'}<br>
                <strong>Region:</strong> ${countriesData[ind].region}<br>
                <strong>Latitude:</strong> ${countriesData[ind].latlng ? countriesData[ind].latlng.join(', ') : 'Not Available'}<br>
                <strong>Country Code:</strong> ${countriesData[ind].cca2}<br>
            `;
            flagImg.src = countriesData[ind].flags.png;
            flagImg.alt = countriesData[ind].name.common + ' flag';
            newDiv.appendChild(countryName); 
            newDiv.appendChild(flagImg);
            newDiv.appendChild(newP);
            newDiv.setAttribute('onclick','getWeather(\''+(countriesData[ind].capital ? countriesData[ind].capital[0] : '')+'\',\''+countriesData[ind].cca2+'\')');
            flexDiv.appendChild(newDiv);
        }
        document.getElementsByTagName('body')[0].append(flexDiv);
        flexDiv.style.background = 'linear-gradient(to bottom right, #f0f0f0, #ffffff)';
    }
}

async function getWeather(city, code){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=00113f369758fba0ae4ee18b5c4f35ea`);
    if(response.ok){
        let weatherData = await response.json();
        Swal.fire({
            title: 'Weather Information',
            html: `
                <strong>Temperature:</strong> ${weatherData.main.temp_min}°C <= ${weatherData.main.temp}°C <= ${weatherData.main.temp_max}°C<br>
                <strong>Description:</strong> ${weatherData.weather[0].description}<br>
                <strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s
            `,
            confirmButtonText: 'Close'
        });
    }
    if(response.status == 404){
        let responseJson = await response.json();
        Swal.fire(responseJson.message);
    }
}


window.onload = myFunc;
