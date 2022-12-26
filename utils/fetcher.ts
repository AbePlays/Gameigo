type FetcherArgs = [string, string];

async function fetcher<T = unknown>([url, token]: FetcherArgs): Promise<T> {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  });

  return res.json();
}

export default fetcher;
