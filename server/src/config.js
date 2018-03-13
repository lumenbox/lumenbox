const env = process.env.NODE_ENV || 'development'

module.exports = {
  port: process.env.PORT || 3001,
  env,
  isProduction: env === 'production',
  isTest: env === 'test',
  isDevelopment: env === 'development',
  staticPath: '../../client-web/build',
  sessionKey: '7a98281f6b1641fd921310f030e5817f',
  sessionTimeout: 30 * 24 * 60 * 60 * 1000, // 30 days
  db: {
    database: process.env.DB_NAME || 'lumenbox',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    ssl: false,
    max: 20, // set pool max size to 20
    min: 4, // set min pool size to 4
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
  }
}
