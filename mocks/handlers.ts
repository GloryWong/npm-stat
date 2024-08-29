import { HttpResponse, http } from 'msw'
import Fuse from 'fuse.js'
import { downloadDatasets, packageBasicSets, packageBasicSetsAll, packageInfos } from './data'
import type { Period } from '@/types/period'
import type { SearchType } from '@/types/search-type'

export const handlers = [
  http.get('/api/packages/:text', ({ params, request }) => {
    const searchType = new URL(request.url).searchParams.get('type') as SearchType | null ?? 'text'
    const text = params.text as string
    if (searchType === 'text') {
      const fuse = new Fuse(packageBasicSetsAll, {
        keys: ['name', 'description'],
        threshold: 0.5,
      })
      return HttpResponse.json(fuse.search(text, { limit: 20 }).map(v => v.item))
    }
    else {
      return HttpResponse.json(packageBasicSets[params.text as string] ?? [])
    }
  }),
  http.get('/api/downloads/:packageName', ({ params, request }) => {
    const downloadDataset = downloadDatasets[params.packageName as string]
    const period = new URL(request.url).searchParams.get('period') as Period | null

    return period ? HttpResponse.json(downloadDataset[period]) : HttpResponse.json(undefined, { status: 404 })
  }),
  http.get('/api/package/:packageName', ({ params }) => {
    const packageInfo = packageInfos.find(v => v.name === params.packageName)

    return packageInfo ? HttpResponse.json(packageInfo) : HttpResponse.json(undefined, { status: 404 })
  }),
]
