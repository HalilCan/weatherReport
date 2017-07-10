var latitude;
var longitude;
var icon;
var temperature;
var umbrellaNeed;
var temp;
var units;
var unitType = document.getElementById("unitType");
var x = document.getElementById("report");
var umb = document.getElementById("reportUmbrella");
var tempRep = document.getElementById("reportTemperature");

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    report.innerHTML = "Geolocation is not supported by this browser";
  }
  callback();
}

function setPosition(position) {
  if (position != undefined) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  }
  /*x.innerHTML =
    "Latitude: " +
    latitude +
    "<br>Longitude: " +
    longitude;
    */
}

function printWeather(callback) {
  if (latitude != undefined) {
    $.ajax({
      url: "https://api.darksky.net/forecast/dc8489df61fab8e3f6c94b33a42c5b78/" +
        latitude +
        ", " +
        longitude,
      /*jsonp:"callback",*/
      dataType: "jsonp",
      success: function(response) {
        /*alert("a");*/
        var precipProbability = response.currently["precipProbability"];
        temp = response.currently["temperature"];
        unitType = response.flags["units"];
        if (precipProbability > 0.5) {
          umbrellaNeed = "might need an";
        } else {
          umbrellaNeed = "can leave your";
        }
        umb.innerHTML = umbrellaNeed;
        var tempWords;
        /*use direct if comparisons for speed*/
        if (temp < 10.0) {
          tempWords = "Deathly Cold";
        } else if (temp < 20.0) {
          tempWords = "Extremely Cold";
        } else if (temp < 30.0) {
          tempWords = "Very Cold";
        } else if (temp < 40.0) {
          tempWords = "Definitely Cold";
        } else if (temp < 50.0) {
          tempWords = "Cold";
        } else if (temp < 60.0) {
          tempWords = "Nicely Chilly";
        } else if (temp < 70.0) {
          tempWords = "Mild Weather";
        } else if (temp < 80.0) {
          tempWords = "Getting Hot";
        } else if (temp < 90.0) {
          tempWords = "Hot";
        } else if (temp < 100.0) {
          tempWords = "Very Hot";
        } else if (temp > 100.0) {
          tempWords = "SUPERHOT";
        }
        tempRep.innerHTML = tempWords;
        icon = response.currently["icon"];
        callback();
        x.innerHTML = response.currently["summary"];
      }
    });
  }
}

function setIcon() {
  a = icon;
  switch (a) {
    case "clear-day":
      document.body.style.backgroundImage =
        "url('https://www.goodfreephotos.com/albums/other-landscapes/clear-da-landscape-by-the-seaside.jpg')"
      break;
    case "clear-night":
      document.body.style.backgroundImage =
        "url('http://ww2.kqed.org/news/wp-content/uploads/sites/10/2014/05/176451971.jpg')";
      break;
    case "rain":
      document.body.style.backgroundImage =
        "url('https://wallpaperscraft.com/image/rain_drops_splashes_heavy_rain_dullness_bad_weather_60638_3840x2400.jpg')";
      break;
    case "snow":
      document.body.style.backgroundImage =
        "url('https://www.walldevil.com/wallpapers/a85/3789-forest-tree-snow-winter.jpg')";
      break;
    case "sleet":
      document.body.style.backgroundImage =
        "url('https://www.disclosurenewsonline.com/wp-content/uploads/2013/02/sleet-1.jpeg')";
      break;
    case "wind":
      document.body.style.backgroundImage =
        "url('https://cleantechnica.com/files/2016/07/9457907529_9cff96fa90_o.jpg')";
      break;
    case "fog":
      document.body.style.backgroundImage =
        "url('https://static.pexels.com/photos/104907/pexels-photo-104907.jpeg')";
      break;
    case "cloudy":
      document.body.style.backgroundImage =
        "url('https://static.pexels.com/photos/2083/city-clouds-cloudy-ray-of-sunshine.jpg')";
      break;
    case "partly-cloudy-day":
      document.body.style.backgroundImage =
        "url('http://retouchthesky.com/wp-content/uploads/2014/08/IMG_4952.jpg')";
      break;
    case "partly-cloudy-night":
      document.body.style.backgroundImage =
        "url('https://s-media-cache-ak0.pinimg.com/originals/e5/71/99/e57199164150cbe225a1b6c95367c7ca.jpg')";
      break;
    default:
      break;
  }
}

$("#anan").on("click", function(e) {
  e.preventDefault();
  display();
});

function display() {
  getLocation(function() {
    printWeather(function() {
      setIcon();
    });
  });
}

if (latitude == undefined) {
  setTimeout(function() {
    display();
  }, 50);
  if (latitude == undefined) {
    setTimeout(function() {
      display();
    }, 500);
    if (latitude == undefined) {
      setTimeout(function() {
        display();
      }, 2000);
      if (latitude == undefined) {
        setTimeout(function() {
          display();
        }, 5000);
      }
    }
  }
}