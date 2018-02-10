const http = require('http')
const App = require('./app')
const config = require('./config')

// start the server
http.createServer(App(config)).listen(config.port, () => {
  console.info('LumenBox listing on port', config.port, 'in', config.env, 'mode')
})
