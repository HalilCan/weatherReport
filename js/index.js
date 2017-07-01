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
        "url('http://img12.deviantart.net/8e4f/i/2013/159/0/8/clear_day_by_thorero-d68c8ic.jpg')";
      break;
    case "clear-night":
      document.body.style.backgroundImage =
        "url('http://clear-night.com/img/clear-night-placeholder.jpg')";
      break;
    case "rain":
      document.body.style.backgroundImage =
        "url('https://www.caminodesantiago.me/wp-content/uploads/rain1.jpg')";
      break;
    case "snow":
      document.body.style.backgroundImage =
        "url('https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734')";
      break;
    case "sleet":
      document.body.style.backgroundImage =
        "url('')";
      break;
    case "wind":
      document.body.style.backgroundImage =
        "url('https://energy.gov/sites/prod/files/wv_theme1_image.jpg')";
      break;
    case "fog":
      document.body.style.backgroundImage =
        "url('https://www.howitworksdaily.com/wp-content/uploads/2014/08/fog-06.jpg')";
      break;
    case "cloudy":
      document.body.style.backgroundImage =
        "url('http://wallpapercave.com/wp/SNh7WLs.jpg')";
      break;
    case "partly-cloudy-day":
      document.body.className = "partlyCloudyDay";
      document.body.style.backgroundImage =
        "url('http://1.bp.blogspot.com/-Qtl7odNV4zs/UakT687934I/AAAAAAAAGHI/l4s5ix1glco/s1600/IMG_4867.JPG')";
      break;
    case "partly-cloudy-night":
      document.body.style.backgroundImage =
        "url('http://wallpapercave.com/wp/3A7MvXm.jpg')";

      document.body.className = "partlyCloudyNight";
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