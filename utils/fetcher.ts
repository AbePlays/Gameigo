const fetcher = async (url: string, uid: string): Promise<unknown> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', uid }),
    credentials: 'same-origin',
  });

  return res.json();
};

export default fetcher;
