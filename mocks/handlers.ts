import { http, HttpResponse } from "msw";
import { downloadDatasets, packageSets } from "./data";
import { Period } from "@/components/DownloadGraph";

export const handlers = [
  http.get('/api/packages/:userName', ({ params }) => {
    return HttpResponse.json(packageSets[params.userName as string] ?? [])
  }),
  http.get('/api/downloads/:packageName', ({ params, request }) => {
    const downloadDataset = downloadDatasets[params.packageName as string]
    const period = new URL(request.url).searchParams.get('period') as Period | null
    
    return period ? HttpResponse.json(downloadDataset[period]) : HttpResponse.json(undefined, { status: 404 })
  })
]
