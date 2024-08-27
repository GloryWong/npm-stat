import ky from 'ky'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName } = req.query

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

    res.status(200).json(packages)
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch data. ${error}` })
  }
}
