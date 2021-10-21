const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000    //port

// We instantiate Nuxt with the options
const config = require('./nuxt.config.js')  //nuxt config file
const nuxt = new Nuxt(config)  
app.use(nuxt.render) 

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build()
}

// Listen the server
server.listen(port,() => {
  consola.ready({message:`Server is listening on port: ${port}`,badge:true})
})
require("./bot/index")