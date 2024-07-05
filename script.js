//placeholder random select in the textarea input
function placeholderSelect() {
  const placeholders = ["Lounging about in...", "I am currently in...", "Sitting around in...", "Chilling in...", "Kicking it up in...", "Up to no good in...", "Doing time in...", "Living it up in...", "Hiding from the law in...", "Big in...", "Kicking up a storm in...", ]
  return placeholders[Math.floor(Math.random() * placeholders.length)]
}
document.getElementById("cityText").placeholder = placeholderSelect()
//when the page loads, the "see more" buttons get loaded in
document.addEventListener("DOMContentLoaded", () => {
  const seeMoreButtons = document.querySelectorAll(".seeMore");
//now, for each "see more" buttons, we tell them to either hide or show the content
  //for each button we add a click event listener
  seeMoreButtons.forEach(button => {
      button.addEventListener("click", () => {
        //we define a variable moreInfo as an element sibling of the button, it is a div that precedes it
          const moreInfo = button.previousElementSibling;
          //now, if it is not displayed as a block, we tell it to display it as a block and to change the text of the button to "See Less"
          if (moreInfo.style.display !== "block") {
              moreInfo.style.display = "block";
              button.textContent = "See Less ⬆️";
            //otherwise, we tell it to display nothing and to change the text of the button to "See More"
          } else {
              moreInfo.style.display = "none";
              button.textContent = "See More ⬇️";
          }
      });
      
  });
});
//submitCity is our "Hit it!" button, all the things that happen under line 8 take place after the button is clicked      
submitCity.addEventListener("click", function() {
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(document.getElementById("cityText").value)}?unitGroup=metric&key=W9MZL3MDZ3976RTLYTWB47MY5&contentType=json`;
  displayText.textContent = `Displaying weather for ${document.getElementById("cityText").value}`
  //API call using the city the user inputs in the apiURL itself
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    //data is displayed in the console
    .then(data => {
  console.log(data)
  document.querySelectorAll(".seeMore").forEach(button => button.classList.remove("hidden"))
//data goes into the maxTemp and minTemp function to display when the both extremes occur
  function maxTempTime (day) {
    let index = 0
    let temp = data.days[day].hours[0].temp
    data.days[day].hours.forEach((hour, i)=> {
      if (hour.temp > temp) {
        temp = hour.temp
        index = i
      } 
    }         
    )
    return index
  }
  function minTempTime (day) {
    let index = 0
    let temp = data.days[day].hours[0].temp
    data.days[day].hours.forEach((hour, i) => {
      if (hour.temp < temp) {
        temp = hour.temp
        index = i
      }
    }
  )
  return index
  }

function hourFinderGraph (day) {
const indexes = []
for (let i = 0; i < data.days[day].hours.length; i++) {
  indexes.push(i)
}
  return indexes
}

function tempFinderGraph (day) {
  let index = 0
  let array = []
  data.days[day].hours.forEach((hour, i) => {
    array.push(hour.temp)
    index += i
    
  })
  return(array)
}

new Chart("tempChartToday", {
  type: "line",
  data: {
    labels: hourFinderGraph(0),
    datasets: [{
      backgroundColor:"rgba(0, 127, 255)",
      borderColor: "rgba(100,89,77)",
      data: tempFinderGraph(0)
    }]
  },
})
new Chart("tempChartTomorrow", {
  type: "line",
  data: {
    labels: hourFinderGraph(1),
    datasets: [{
      backgroundColor:"rgba(0, 127, 255)",
      borderColor: "rgba(100,89,77)",
      data: tempFinderGraph(1)
    }]
  },
})

  //now displaying the highest temp for both days and the conditions and description etc. - all from the API
  //info disappears and is supplanted by dates
    todayIsP.textContent = ""
    tomorrowWillBeP.textContent = ""
    todayDate.textContent = `Weather for: ${data.days[0].datetime}`
    tomorrowDate.textContent = `Weather for: ${data.days[1].datetime}`
  //conds and description for both days
    todayConds.textContent = `Conditions: ${data.days[0].conditions}`
    todayDesc.textContent = `Description: ${data.days[0].description}`
    tomorrowConds.textContent = `Conditions: ${data.days[1].conditions}`
    tomorrowDesc.textContent = `Description: ${data.days[1].description}`
  //highest and lowest temp for both days
    todayHighestTempP.textContent = `Max Temperature: ${data.days[0].tempmax}°C at ${maxTempTime(0)}:00`;
    tomorrowHighestTempP.textContent = `Max Temperature: ${data.days[1].tempmax} °C at ${maxTempTime(1)}:00`
    todayLowestTempP.textContent = `Minimum Temperature: ${data.days[0].tempmin}°C at ${minTempTime(0)}:00`;
    tomorrowLowestTempP.textContent = `Minimum Temperature: ${data.days[1].tempmin} °C at ${minTempTime(1)}:00`
  //sunrise and sunset both days
    todaySunrise.textContent = `Sunrise: ${data.days[0].sunrise}`
    todaySunset.textContent = `Sunset: ${data.days[0].sunset}`
    tomorrowSunrise.textContent = `Sunrise: ${data.days[1].sunrise}`
    tomorrowSunset.textContent = `Sunset: ${data.days[1].sunset}`
  //now miscellaneous information for both days, to be displayed when "more info" is clicked
    todayWindSpeed.textContent = `Wind Speed: ${data.days[0].windspeed} km/h`
    todayCloudcover.textContent = `Cloud Cover: ${data.days[0].cloudcover}%`
    todayPrecipProb.textContent = `Probability of Precipitation: ${data.days[0].precipprob}%`
    tomorrowWindSpeed.textContent = `Wind Speed: ${data.days[1].windspeed} km/h`
    tomorrowCloudcover.textContent = `Cloud Cover: ${data.days[1].cloudcover}%`
    tomorrowPrecipProb.textContent = `Propability of Precipitation: ${data.days[1].precipprob}%`
    })

    
    .catch(error => {
      console.error('Error:', error);
    });
  });


