const path = require('path')

const env = process.env.NODE_ENV || 'development'

export default {
  port: process.env.PORT || 3000,
  env,
  isProduction: env === 'production',
  isTest: env === 'test',
  isDevelopment: env === 'development',
  staticPath: '',
  sessionKey: '7a98281f6b1641fd921310f030e5817f',
  sessionTimeout: 30 * 24 * 60 * 60 * 1000, // 30 days
  db: {
    database: process.env.DB_NAME || 'lumenbox',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    port: 5432,
    ssl: true,
    max: 20, // set pool max size to 20
    min: 4, // set min pool size to 4
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
  }
}
