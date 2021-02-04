const tasks = require("./tasks.json")

const fs = require("fs")
const express = require("express")
const app = express()
const methodOverride = require('method-override')

const port = 3000

app.use(express.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.get('/tasks', (req, res) => {

  let html = `
    <a href="/tasks/create"><strong>Add a new task</strong></a>

    <html><head><title>All Tasks</title></head><body><ul>
    `

  for (task of tasks.allTasks) {
    html += `
      <li>${task.title}</li>
      <a href="/tasks/edit/${task.id}">Edit</a> 
      <a href="/tasks/delete/${task.id}">Delete</a> 
    `
  }

  html += '</ul></body></html>'

  res.send(html)
})

app.get('/tasks/create', (req, res) => {

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

          <button type="submit">Save</button>
        </form> 
      </body>
  </html>     
  `

  res.send(html)

})

app.post('/tasks', (req, res) => {
  const data = req.body

  const lastTask = tasks.allTasks[tasks.allTasks.length - 1]
  let id

  if (lastTask) {
    id = lastTask.id + 1
  } else {
    id = 1
  }

  tasks.allTasks.push({
    id,
    ...data
  })


  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), function (err) {
    if (err) {
      console.log("Write file error.")
    }
  })

  //res.send('Your task was recorded!')
  res.redirect('/tasks')
})

app.get('/tasks/edit/:id', (req, res) => {
  let html
  const {
    id
  } = req.params

  for (task of tasks.allTasks) {

    if (task.id == id) {

      html = `
          <html>
            <head>
              <title>Create a Task</title>
            </head>
              <body>
                <form action="/tasks?_method=PUT" method="post">
                <input type="hidden" name="id" value="${task.id}">

                  <label>Title:</label>
                  <input type="text" name="title" value="${task.title}"/>
                  <br/>
                  <br/>
                
                  <label>Description:</label>
                  <input type="text" name="description" value="${task.description}"/>
                  <br/>
                  <br/>
                
                  <label>Deadline:</label>
                  <input type="text" name="deadline" value="${task.deadline}"/>
                  <br/>
                  <br/>
                
                  <label>Is it completed?:</label>
                  <input type="text" name="completed" value="${task.completed}"/>

                  <br/>
                  <br/>

                  <button type="submit">Edit</button>
                </form> 

                <form action="/tasks/delete?_method=DELETE" method="post">
                  <input type="hidden" name="id" value="${task.id}"/>
                  <button type="submit">Delete</button>
                </form>
              </body>
          </html>     
          `
    }
  }

  res.send(html)
})

app.put('/tasks', (req, res) => {
  let data = req.body
  data.id = Number(data.id)


  for (let i = 0; i < tasks.allTasks.length; i++) {

    if (tasks.allTasks[i].id == Number(data.id)) {
      tasks.allTasks[i] = data
    }
  }

  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), function (err) {
    if (err) {
      console.log("Write file error.")
    }
  })

  res.redirect('/tasks')
})

app.delete('/tasks/delete', (req, res) => {
  const id = req.body.id

  for (let i = 0; i < tasks.allTasks.length; i++) {

    if (tasks.allTasks[i].id == id) {
      tasks.allTasks.splice(i, 1)
    }
  }

  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), function (err) {
    if (err) {
      console.log("Write file error.")
    }
  })

  //res.send("Your task was deleted.")
  res.redirect("/tasks")
})

app.get('/tasks/delete/:id', (req, res) => {
  const id = req.params.id

  for (let i = 0; i < tasks.allTasks.length; i++) {

    if (tasks.allTasks[i].id == id) {
      tasks.allTasks.splice(i, 1)
    }
  }

  fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), function (err) {
    if (err) {
      console.log("Write file error.")
    }
  })

  //res.send("Your task was deleted.")
  res.redirect("/tasks")

})






//* SERVER

app.listen(port, () => {
  console.log(`Server is working at port ${port}`)
})