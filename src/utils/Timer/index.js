export const msToDuration = (ms) => {
  if (ms <= 1000) {
    return '0m 1s';
  }
  let days = parseInt(ms / (1000 * 60 * 60 * 24));
  if (days === 0) {days = ""} else {days = `${days}j `};
  let hours = parseInt((ms / (1000 * 60 * 60)) % 24);
  if (days === "" && hours === 0) {hours = ""} else {hours = `${hours}h `};
  const minutes = parseInt((ms / (1000 * 60)) % 60);
  const seconds = parseInt((ms / 1000) % 60);
  return `${days}${hours}${minutes}m ${seconds}s`;
};

export const msToDate = (ms) => {
  ms = parseInt(ms);
  const date = new Date(Date.now() + ms);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth()+1)).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `Le ${day}/${month} à ${hour}h${minute}`;
};

export const countdown = (date) => {
  const now = new Date(Date.now());
  const interval = date - now;
  return msToDuration(interval);
}

export const timestampToDate = (timestamp) => {
  timestamp = parseInt(timestamp);
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth()+1)).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return `Le ${day}/${month} à ${hour}h${minute}`;
}
