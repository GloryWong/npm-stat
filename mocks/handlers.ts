import { HttpResponse, http } from 'msw'
import { downloadDatasets, packageBasicSets, packageBasicSetsFlat, packageInfo } from './data'
import type { Period } from '@/types/period'

export const handlers = [
  http.get('/api/packages/:userName', ({ params }) => {
    return HttpResponse.json(packageBasicSets[params.userName as string] ?? [])
  }),
  http.get('/api/downloads/:packageName', ({ params, request }) => {
    const downloadDataset = downloadDatasets[params.packageName as string]
    const period = new URL(request.url).searchParams.get('period') as Period | null

    return period ? HttpResponse.json(downloadDataset[period]) : HttpResponse.json(undefined, { status: 404 })
  }),
  http.get('/api/package/:packageName', ({ params }) => {
    const basic = packageBasicSetsFlat.find(v => v.name === params.packageName)
    if (!basic)
      return HttpResponse.json(undefined, { status: 404 })

    return HttpResponse.json({
      ...basic,
      ...packageInfo,
    })
  }),
]
