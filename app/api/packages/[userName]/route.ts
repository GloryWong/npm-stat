import ky from 'ky'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params: { userName } }: { params: { userName: string } }) {
  try {
    // https://registry.npmjs.org/-/v1/search?text=author:gloxy
    const data = await ky.get<any>(
      `https://registry.npmjs.org/-/v1/search?text=author:${userName}`,
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
