import ky from 'ky'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params: { packageName } }: { params: { packageName: string } }) {
  try {
    const data = await ky.get<Record<string, any>>(
      `https://registry.npmjs.org/${packageName}/latest`,
    ).json()

    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('_') || ['githead', 'dist'].includes(key))
        continue
      result[key] = value
    }

    return NextResponse.json(result)
  }
  catch (error) {
    return NextResponse.json({ error: `Failed to fetch data. ${error}` }, { status: 500 })
  }
}
