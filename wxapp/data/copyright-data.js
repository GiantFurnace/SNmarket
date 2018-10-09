function formatTime(date){
  var year = date.getFullYear();
  return year;
}

function getCurrentTime(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  
  return currentTime;
}

module.exports ={
  formatTime:formatTime,
  currentTime:getCurrentTime
}