const api_dev = process.env.REACT_APP_API_ENDPOINT_DEV;

export const _POST = async (payload, id) => {
  const formedURL = `${api_dev}/endpoint/set-career/v1/${id}`;
  const options = {
    method: "POST",
    mode: 'no-cors',
    body: JSON.stringify(payload),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  };
  const response = await fetch(formedURL, options);
  return await response.json();
}

