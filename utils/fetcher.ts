export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok)
    throw new Error(`status: ${res.status}. Info: ${JSON.stringify(await res.json())}`);

  return res.json();
};
