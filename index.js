const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://janushan:1234@cluster0.9xjnekm.mongodb.net/');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duedate:Date,
});

const Task = mongoose.model('Task', taskSchema);

//Add task
app.post('/tasks', async (req, res) => {
  const { title, description, duedate } = req.body;

  try {
    // Convert the string to a Date object
    const parsedDueDate = new Date(duedate);
    console.log(parsedDueDate);

    // Check if the conversion was successful
    if (isNaN(parsedDueDate.getTime())) {
      throw new Error('Invalid date format for duedate');
    }

    const newTask = new Task({ title, description, duedate});
    await newTask.save();
    res.status(201).send('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

//Get all tasks
app.get('/taskslist', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
