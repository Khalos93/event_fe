function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedDate =
    formattedDay +
    '-' +
    formattedMonth +
    '-' +
    year +
    ' ' +
    formattedHours +
    ':' +
    formattedMinutes;

  return formattedDate;
}

export default formatDate;
