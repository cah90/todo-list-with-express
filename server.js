const express = require("express")
const routes = require("./routes")
const methodOverride = require("method-override")
const port = 3000

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.listen(port, () => {
  console.log(`Server on at port ${port}`)
})