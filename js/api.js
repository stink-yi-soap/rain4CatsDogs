let cityData, myJSON, newJSON, rain, lon, lat;
let rainStat = false;
let rainCity = [];
let count = 1;

let form = document.getElementById('cityForm');
let askLabel = document.getElementById('askLabel');
let box = document.getElementById('city');
let noti = document.getElementById('noti');
let button = document.getElementById('getData');
let refreshBtn = document.getElementById('refresh');
refreshBtn.style.display = "none";
refreshBtn.addEventListener("click", ref);



// initial API request

function apiReq(e) {

    e.preventDefault();
    cityData = form.city.value;
    let aReq = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityData 
    + '&APPID=da5415fda6c60a14d88a04b36441ed5a';

    if (cityData !== null && cityData !== undefined) {

        fetch(aReq)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                myJSON = resp;
                console.log(aReq, myJSON);
                rain = myJSON.weather[0].main;
                lon = myJSON.coord.lon;
                lat = myJSON.coord.lat;
                rainSearch(); 
            })
            .catch (function(response){
                console.log("There was an error");
            });
            
    }

    return cityData, rainStat;
    
}


// second API request: conditional

function rainSearch() {

    if (rain == "Rain") {

        redirect();

    } else {

        let cycleReq = 'https://api.openweathermap.org/data/2.5/find?lat=' + lat + 
        '&lon=' + lon + '&cnt=50&APPID=da5415fda6c60a14d88a04b36441ed5a';
                
        fetch(cycleReq)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                newJSON = resp;
                console.log(cycleReq, newJSON);
                findCity(newJSON, changeBtn);
            })
            .catch (function(response){
                console.log("There was an error");
            });

    }

}



function findCity(obj, callback) {

    for (let i = 0; i < 10; i++) {

        if (obj.list[i].weather[0].main == "Rain") {
            rainCity.push(obj.list[i].name);
        } else {
            console.log("can't find any")
        }
    }
    callback();
    console.log(rainCity);

}



function changeBtn() {

    button.style.display = "none";  
    box.style.display = "none";      

    if (rainCity[0] != null) {

        askLabel.innerHTML =  "Sadly, there is no rain in " + cityData + 
        ". But rain is falling in: "; 

        rainCity.forEach(
            function (cityName) {
                var makeBtn = document.createElement("BUTTON");
                makeBtn.innerHTML = cityName;
                noti.appendChild(makeBtn);
                makeBtn.addEventListener("click", redirect);
            }
        )  

    } else {

        askLabel.innerHTML = "Sadly, " + cityData + " is not raining at the moment. ";
        refreshBtn.style.display = "inline-block";
        refreshBtn.innerHTML = "Maybe another time, another place?";
        count = 2;

    }
}



function redirect() {
    
    rainStat = true;
    form.style.display = "none";
    noti.style.display = "none";
    refreshBtn.style.display = "inline-block";
    refreshBtn.innerHTML = "RAIN! Rush to your Portal!";
    count = 2;

}

// refresh the page

function ref() {
    if (count == 2) {
        window.location.reload();
        count = 1;
    }
}



export {apiReq, rainStat};