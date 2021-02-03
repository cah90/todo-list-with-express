const tasks = require("./tasks.json")

const fs = require("fs")
const express = require("express")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended:true }))

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

app.get('/tasks/create', (req,res) => {
  
  let html = `
  <html>
    <head>
      <title>Create a Task</title>
    </head>
      <body>
        <form action="/tasks" method="post">
          <label>Title:</label>
          <input type="text" name="title"/>
          <br/>
          <br/>
        
          <label>Description:</label>
          <input type="text" name="description"/>
          <br/>
          <br/>
        
          <label>Deadline:</label>
          <input type="text" name="deadline"/>
          <br/>
          <br/>
        
          <label>Is it completed?:</label>
          <input type="text" name="completed" />

          <button type="submit">Salvar</button>
        </form> 
      </body>
  </html>     
  `

  res.send(html)
  
  }
)

app.post('/tasks', (req,res) => {
  const data = req.body

  const lastTask = tasks.allTasks[tasks.allTasks.length - 1]
  let id

  if( lastTask ) {
    id = lastTask.id + 1
  } else {
    id = 1
  }

  tasks.allTasks.push({
    id,
    ...data
  })


  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), function(err) {
    if (err) {
      console.log("Write file error.")
    }
  })
  
  //res.send('Your task was recorded!')
  res.redirect('/tasks')
})






//* SERVER

app.listen(port, () => {
  console.log(`Server is working at port ${port}`)
})