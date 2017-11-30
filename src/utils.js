export function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

export function parseFetch(response) {
  return response.json().then(({ status, data, msg }) => {
    if (!status === 'success') throw new Error(msg);
    return data;
  });
}
