import { faker } from '@faker-js/faker'
import { timestamp } from 'iso-timestamp'
import type { PackageJson } from 'type-fest'
import type { PackagePanelDownloadData } from '@/components/PackagePanelDownloadGraph'
import { logger } from '@/utils/logger'

import { periods } from '@/constants/periods'
import type { PackageBasic } from '@/types/package'
import type { Period } from '@/types/period'

faker.seed(1234)

function createArrayOf<T>(fn: (index: number) => T, length: number) {
  return Array.from({ length }).map((_, index) => fn(index))
}

function createRandomVersion() {
  return faker.string.numeric(3).split('').join('.')
}

function createRandomPackageName() {
  const len = faker.number.int({ min: 1, max: 3 })
  const scoped = faker.datatype.boolean()

  const name = createArrayOf(() => faker.word.sample(), len).join('-')
  const scope = scoped ? `@${faker.word.sample()}/` : ''
  return `${scope}${name}`
}

function createPackages(pkgNum: number) {
  const packageNames = createArrayOf(() => createRandomPackageName(), pkgNum)

  const packages: PackageBasic[] = createArrayOf(index => ({
    name: packageNames[index],
    version: createRandomVersion(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
  }), packageNames.length)

  return packages
}

function skipDate(startDate: Date, numDays: number) {
  return timestamp(new Date(new Date(startDate).setDate(startDate.getDate() + numDays)), { excludeTime: true, separator: '-' })
}

function createDateRanges(startDate: Date, numDays: number) {
  return createArrayOf(i => skipDate(startDate, i), numDays)
}

function createDownloadData(name: string, start: string, numDays: number): PackagePanelDownloadData {
  return {
    start,
    end: skipDate(new Date(start), numDays),
    package: name,
    downloads: createDateRanges(new Date(start), numDays).map(day => ({
      downloads: faker.number.int({ min: 0, max: faker.number.int({ min: 100, max: 1000000 }) }),
      day,
    })),
  }
}

const periodToNumDays: Record<Period, number> = { 'last-week': 7, 'last-month': 30, 'last-year': 365 }

function createDownloadsDataset(name: string) {
  const startDate = timestamp(faker.date.anytime(), { excludeTime: true, separator: '-' })
  return periods.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: createDownloadData(name, startDate, periodToNumDays[cur]),
    }
  }, {} as Record<Period, PackagePanelDownloadData>)
}

function createUserNames(num: number) {
  return createArrayOf(() => faker.internet.userName(), num)
}

function createUserPackageBasicSets(userNames: string[]) {
  return userNames.reduce((pre, cur) => ({
    ...pre,
    [cur]: createPackages(faker.number.int({ min: 1, max: 20 })),
  }), {} as { [userName: string]: PackageBasic[] })
}

const userNames = createUserNames(3)
logger.info('Created user names', userNames)

const packageBasicSets = createUserPackageBasicSets(userNames)

const downloadDatasets = Object.values(packageBasicSets).flat(2).map(v => v.name).reduce((pre, cur) => {
  return {
    ...pre,
    [cur]: createDownloadsDataset(cur),
  }
}, {} as { [packageName: string]: Record<Period, PackagePanelDownloadData> })

const packageBasicSetsFlat = Object.values(packageBasicSets).flat(2)

function createRandomDeps(num: number) {
  return createArrayOf(() => ({ [faker.word.noun({ length: { min: 3, max: 10 } })]: createRandomVersion() }), num)
    .reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }), {})
}
const packageInfo: PackageJson = {
  type: 'module',
  author: {
    name: 'Author name',
    email: 'authorname@gmail.com',
    url: 'https://authorname.com',
  },
  license: 'MIT',
  homepage: 'https://authorname.com',
  repository: {
    type: 'git',
    url: 'git+https://github.com/authorname/package-name.git',
  },
  keywords: createArrayOf(() => faker.word.noun({ length: { min: 3, max: 10 } }), 10),
  types: 'index.d.ts',
  dependencies: createRandomDeps(5),
  devDependencies: createRandomDeps(10),
}

export { packageBasicSets, downloadDatasets, packageBasicSetsFlat, packageInfo }
