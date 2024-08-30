export function createInternalUrl(searchParams: Record<string, any>, path = '') {
  return `/${path}?${new URLSearchParams({
    ...Object.fromEntries(new URLSearchParams(location.search)),
    ...searchParams,
  }).toString()}`
}
