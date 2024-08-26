import { DownloadData, Period } from "@/components/DownloadGraph";
import { Package } from "@/components/PackageList";

import { faker } from "@faker-js/faker";
import { periods } from "@/components/DownloadGraphs";
import { timestamp } from "iso-timestamp";

faker.seed(123)

function createArrayOf<T>(fn: (index: number) => T, length: number) {
  return Array.from({ length }).map((_, index) => fn(index))
}

function createPackages(pkgNum: number) {
  const packageNames = createArrayOf(() => faker.word.sample(), pkgNum)
  
  const packages: Package[] = createArrayOf((index) => ({
      name: packageNames[index],
      version: faker.string.numeric(3).split('').join('.'),
      description: faker.lorem.paragraph({ min: 1, max: 3 })
    }), packageNames.length)

  return packages
}

function skipDate(startDate: Date, numDays: number) {
  return timestamp(new Date(new Date(startDate).setDate(startDate.getDate() + numDays)), { excludeTime: true, separator: '-' })
}

function createDateRanges(startDate: Date, numDays: number) {
  return createArrayOf((i) => skipDate(startDate, i), numDays)
}

function createDownloadData(name: string, start: string, numDays: number): DownloadData {
  return {
    start,
    end: skipDate(new Date(start), numDays),
    package: name,
    downloads: createDateRanges(new Date(start), numDays).map((day) => ({
      downloads: faker.number.int({ min: 0, max: 100 }),
      day
    }))
  }
}

const periodToNumDays: Record<Period, number> = { 'last-week': 7, 'last-month': 30, 'last-year': 365 }

function createDownloadsDataset(name: string) {
  const startDate = timestamp(faker.date.anytime(), { excludeTime: true, separator: '-' })
  return periods.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: createDownloadData(name, startDate, periodToNumDays[cur])
    }
  }, {} as Record<Period, DownloadData>)
}

function createUserNames(num: number) {
  return createArrayOf(() => faker.word.noun(5), num)
}

function createUserPackageSets(userNames: string[]) {
  return userNames.reduce((pre, cur) => ({
    ...pre,
    [cur]: createPackages(faker.number.int({ min: 1, max: 20 }))
  }), {} as Record<string, Package[]>)
}

const userNames = createUserNames(3)
console.log('Created user names', userNames)
const packageSets = createUserPackageSets(userNames)

const downloadDatasets = Object.values(packageSets).flat(2).map(v => v.name).reduce((pre, cur) => {
  return {
    ...pre,
    [cur]: createDownloadsDataset(cur)
  }
}, {} as Record<string, Record<Period, DownloadData>>)

export { packageSets, downloadDatasets }
