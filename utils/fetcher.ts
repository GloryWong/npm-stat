import memoizee from 'memoizee'

export const fetcher = memoizee(async (url: string) => {
  const res = await fetch(url)

  if (!res.ok)
    throw new Error(`status: ${res.status}. Info: ${JSON.stringify(await res.json())}`)

  return res.json()
}, {
  maxAge: 300000,
})
