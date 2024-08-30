import type { PackageJson } from 'type-fest'

export interface PackageBasic {
  name: string
  version: string
  description: string
  publisher: string
  date: string
  npmLink: string
}

export interface PackageInfo {
  packageJson: PackageJson
  publisher: string
  date: string
  npmLink: string
}
