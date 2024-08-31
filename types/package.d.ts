import type { PackageJson } from 'type-fest'

export interface PackageBasic {
  name: string
  version: string
  description: string
  maintainer: string
  date: string
  npmLink: string
}

export interface PackageInfo {
  packageJson: PackageJson
  maintainers: string[]
  date: string
  npmLink: string
}
