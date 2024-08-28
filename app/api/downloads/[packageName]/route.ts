import ky from 'ky'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params: { packageName } }: { params: { packageName: string } }) {
  const searchParams = req.nextUrl.searchParams
  const period = searchParams.get('period') ?? 'last-week'

  try {
    const data = await ky.get(
      `https://api.npmjs.org/downloads/range/${period}/${packageName}`,
    ).json()

    return NextResponse.json(data)
  }
  catch (error) {
    return NextResponse.json({ error: `Failed to fetch data. ${error}` }, { status: 500 })
  }
}
