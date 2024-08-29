import ky from 'ky'
import { type NextRequest, NextResponse } from 'next/server'
import type { SearchType } from '@/types/search-type'

export async function GET(request: NextRequest, { params: { text } }: { params: { text: string } }) {
  try {
    const searchType = (request.nextUrl.searchParams.get('type')) as SearchType | null ?? 'text'

    // https://registry.npmjs.org/-/v1/search?text=author:gloxy
    const data = await ky.get<any>(
      `https://registry.npmjs.org/-/v1/search?text=${searchType === 'text' ? '' : `${searchType}:`}${encodeURIComponent(text)}`,
    ).json()

    const packages = data.objects.map((v: any) => {
      const pkg = v.package
      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
      }
    })

    return NextResponse.json(packages)
  }
  catch (error) {
    return NextResponse.json({ error: `Failed to fetch data. ${error}` }, { status: 500 })
  }
}
