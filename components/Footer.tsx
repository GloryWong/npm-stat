import { Link } from '@nextui-org/react'

export default function Footer() {
  return (
    <footer className="flex justify-between text-sm text-gray-500">
      <Link className="text-inherit text-sm" underline="hover" isExternal href="https://github.com/GloryWong/npm-stat">
        NPM Stat
        {' '}
        { process.env.appVersion }
      </Link>
      <div>
        Made with ❤️ by&nbsp;
        <Link className="text-inherit text-sm" underline="hover" isExternal href="https://glorywong.com">Glory Wong</Link>
        {' '}
        ©️
        {' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  )
}
