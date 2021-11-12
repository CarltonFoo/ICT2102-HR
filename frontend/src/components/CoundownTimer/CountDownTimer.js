import { Typography } from "antd";

const CountDownTimer = () => {
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
}
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
// Set the date we're counting down to
var countDownDate = new Date(year, month + 1, lastday(year, month) + 1).getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today date and time
  var now = new Date().getTime();
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  // Time calculations for days
  var days = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 60));

  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
  }

  return (days);
}, 1000)




return (
  x
)
}

export default CountDownTimer;

