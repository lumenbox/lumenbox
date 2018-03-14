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
    port: process.env.DB_PORT || 5432,
    ssl: false,
    max: 20, // set pool max size to 20
    min: 4, // set min pool size to 4
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
  },
  supportEmailAddress: 'contact@lumenbox.org',
  mail: {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 465,
    secure: true, // use TLS
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASSWORD || ''
    }
  },
  rateLimit: {
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      delayMs: 0 // disabled
    },
    newUser: {
      windowMs: 60 * 60 * 1000, // 1 hour window
      delayAfter: 1, // begin slowing down responses after the first request
      delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request
      max: 5, // start blocking after 5 requests
      message: 'Too many accounts created from this IP, please try again later'
    },
    login: {
      windowMs: 60 * 60 * 1000, // window
      delayAfter: 5, // begin slowing down responses after
      delayMs: 6 * 1000, // slow down subsequent responses
      max: 10, // start blocking after
      message: 'Too many login attempts from this IP, please try again later'
    },
    resetPassword: {
      windowMs: 60 * 60 * 1000, // window
      delayAfter: 5, // begin slowing down responses after
      delayMs: 6 * 1000, // slow down subsequent responses
      max: 10, // start blocking after
      message: 'Too many login attempts from this IP, please try again later'
    }
  }
}
