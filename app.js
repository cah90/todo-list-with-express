const tasks = require("./tasks.json")

const express = require("express")
const app = express()
const port = 3000


app.get('/', (req,res) => {
  res.send("Hello World!")
})

app.get('/tasks', (req,res) => {
  
  let html = '<html><head><title>All Tasks</title></head><body><ul>'
  
  for (task of tasks.allTasks) {
    html += `<li>${task.title}</li>`
  }
  
  html += '</ul></body></html>'
  
  res.send(html)
})




app.listen(port, () => {
  console.log(`Server is working at port ${port}`)
})