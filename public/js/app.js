console.log("client side javascript file is loaded");
const err = document.querySelector(".error");
const res = document.querySelector(".result");
const logAddress = (address = "dubai") => {
  fetch("http://localhost:8080/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        err.innerHTML = data.error;
        res.innerHTML = "";
      } else {
        err.innerHTML = "";
        res.innerHTML =
          "in " +
          data.cityname +
          " temperature is " +
          data.temp +
          " °C degree" +
          ".There is " +
          data.rain +
          " mm / hr rain" +
          " and we have " +
          data.description;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  logAddress(location.toString());
});
