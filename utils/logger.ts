import { createLogger, enableLogger } from '@gloxy/logger'

export const logger = createLogger('npm-stat')
enableLogger('npm-stat:*')
