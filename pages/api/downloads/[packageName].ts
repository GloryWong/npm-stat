import ky from 'ky'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { packageName, period = 'last-week' } = req.query

  try {
    const data = await ky.get(
      `https://api.npmjs.org/downloads/range/${period}/${packageName}`,
    ).json()

    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({ error: `Failed to fetch data. ${error}` })
  }
}
