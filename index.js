const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://janushan:1234@cluster0.9xjnekm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duedate:Date,
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', async (req, res) => {
  const { title, description, duedate } = req.body;
  try {
    const newTask = new Task({ title, description, duedate });
    await newTask.save();
    res.status(201).send('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
