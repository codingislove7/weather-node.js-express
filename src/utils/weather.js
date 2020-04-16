const request = require("request");
const weather = (address = "dubai", callback) => {
  const url =
    "https://api.weatherbit.io/v2.0/current?key=e057d488da8a4a3b916a074965521ff8&city=" +
    address;

  request({ url: url }, (error, response) => {
    const datas = JSON.parse(response.body);
    const array = datas.data;

    if (error) {
      callback("cant access to wearher service!", undefined);
    }
    //  else if (error) {
    //   callback("unable to find address", undefined); //weaterbit api can't handel this part beacuse if api cant find location it dosent back {}
    // }s
    else {
      let data;
      for (arr of array) {
        data = arr;
      }
      callback(undefined, {
        timezone: data.timezone,
        cityname: data.city_name,
        temp: data.temp,
        description: data.weather.description,
        rain: data.precip,
      });
    }
  });
};

module.exports = weather;
