const tasks = require("./tasks")

const fs = require("fs")

function writingOnJSONFile(filename, data) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), function(err) {
    if (err) {
      console.log("Write file error.")
    }
  })
}

module.exports = {
  showAll(req,res) {
    res.render('allTaks.html')
  },

  add(req,res) {
    const title = prompt("What is the task's title: ")
    const description = prompt("What is the task's description: ")
    const deadline = prompt("When the task will be completed?: ")
    const completed = prompt("Was the task completed?: ")

    const lastTask = tasks.allTasks[tasks.allTasks.length - 1]
    let id

    if(lastTask) {
      id = lastTask.id + 1
    } else {
      id = 1
    }

    tasks.allTasks.push({
      id,
      title,
      description,
      deadline,
      completed
    })

    writingOnJSONFile("tasks.json", tasks)

    console.log("Your new task was created!")

  },

  post(req,res) {

  },

  edit(req,res) {

  },

  update(req,res) {
    let taskId = prompt("What is the task's id? ")

    // 1. Tranform the id into Number
    taskId = Number(taskId)

    // 2. I need to iterate through tasks.json and find the matching id
    // 3. If find the object (do some logic), if not return a message
    // 4. See what you want to change in that object and see how to change an object property value
    //    Obs: changing values of an object => obj.property = new value

    let foundId = false

    for ( let i = 0; i < tasks.allTasks.length; i++) {
      if (taskId == tasks.allTasks[i].id) {
        foundId = true

        const fieldToUpdate = prompt("Which field you want to update: title, description, deadline, completed: ")

        const newValue = prompt(`Type another ${fieldToUpdate}: `)

        tasks.allTasks[i][fieldToUpdate] = newValue

        console.log("The new value was updated!")


        // PREVIUS CODE
        // if ( fieldToUpdate == "title" ) {
        //   const newValue = prompt("Type another title: ")

        //   tasks.allTasks[i].title = newValue

        // } else if ( fieldToUpdate == "description" ) {
        //   const newValue = prompt("Type another descriptopn: ")

        //   tasks.allTasks[i].description = newValue

        // } else if ( fieldToUpdate == "deadline" ) {
        //   const newValue = prompt("Type another deadline: ")

        //   tasks.allTasks[i].deadline = newValue

        // } else if ( fieldToUpdate == "completed" ) {
        //   const newValue = prompt("Was the task completed? : ")

        //   tasks.allTasks[i].completed = newValue

        // } 
      }
    }

    if (!foundId) {
      console.log("We could not find the requested id task.")
    }

    writingOnJSONFile("tasks.json", tasks)
  },

  delete(req,res) {
    const taskId = prompt("What is the task's id? ")

    for( let i = 0; i < tasks.allTasks.length; i++) {
      if (taskId == tasks.allTasks[i].id) {
        tasks.allTasks.splice(i,1)
      }
    }

    console.log("Your task was successully deleted.")

    writingOnJSONFile("tasks.json", tasks)

  }
}