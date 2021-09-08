const api_dev = process.env.REACT_APP_API_ENDPOINT_DEV;

export const _POST = async (payload, id) => {
  const formedURL = `${api_dev}/set-career/v1/${id}`;
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(formedURL, options);
  return await response.json();
}

export const _POST_CREATE_NEW = async (payload) => {
  const formedURL = `${api_dev}/new-set-career/v1`;
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(formedURL, options);
  return await response.json();
}

export const _DELETE = async (id) => {
  const formedURL = `${api_dev}/delete-set-career/v1/${id}`;
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(formedURL, options);
  return await response.json();
};

