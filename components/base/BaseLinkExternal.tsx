import { Link } from '@nextui-org/react'

interface Props {
  url: string
  className?: string
  /**
   * if not provided, the url is used
   */
  title?: string
}

export default function BaseLinkExternal({ url, className, title }: Props) {
  return (
    <Link href={url} className={className} color="foreground" underline="hover" isExternal showAnchorIcon>
      {(() => {
        if (title)
          return title

        const [_, hostname, pathname] = url.match(/^https?:\/\/([^/]+)(\/.*)?/) ?? []
        if (pathname && pathname !== '/')
          return pathname.slice(1)

        return hostname
      })()}
    </Link>
  )
}
