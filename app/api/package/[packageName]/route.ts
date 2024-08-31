import ky from 'ky'
import { type NextRequest, NextResponse } from 'next/server'
import type { PackageInfo } from '@/types/package'

export async function GET(_: NextRequest, { params: { packageName } }: { params: { packageName: string } }) {
  try {
    const [data1, data2] = await Promise.all([
      ky.get<Record<string, any>>(
        `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`,
      ).json(),
      ky.get<Record<string, any>>(
        `https://registry.npmjs.org/-/v1/search?size=1&&text=${encodeURIComponent(packageName)}`,
      ).json(),
    ])

    const packageJson: Record<string, any> = {}
    for (const [key, value] of Object.entries(data1)) {
      if (key.startsWith('_') || ['githead', 'dist'].includes(key))
        continue
      packageJson[key] = value
    }

    const publishInfo = data2.objects[0]?.package
    if (!publishInfo)
      throw new Error('Publish info is not found')

    return NextResponse.json<PackageInfo>({
      packageJson,
      maintainers: publishInfo.maintainers.map((v: any) => v.username),
      date: publishInfo.date,
      npmLink: publishInfo.links.npm,
    })
  }
  catch (error) {
    return NextResponse.json({ error: `Failed to fetch data. ${error}` }, { status: 500 })
  }
}
