function getFormatTime(date) {
  let dateTime;
  if (date instanceof Date) {
    dateTime = date;
  } else {
    //字符串
    dateTime = new Date(date);
  }
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const secord = dateTime.getSeconds();
  function getDoubleNumber(number) {
    return number.toString().length === 1 ? '0' + number : number;
  }
  return `${year}-${getDoubleNumber(month)}-${getDoubleNumber(day)} ${getDoubleNumber(hour)}:${getDoubleNumber(minute)}:${getDoubleNumber(secord)}`;
}


module.exports = {
  getFormatTime
}