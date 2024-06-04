const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();
const port = 2000;


app.use(bodyParser.json());

let todos = [];
let newId = 1;


app.get('/todos', (req, res) => {
    res.json(todos);
});


app.post('/todos', (req, res) => {
    const newTodo = {
         id: newId++,
         title: req.body.title,
         completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message : 'Todo is not found'});
    }
    res.json(todo)
});


app.put('/todos/:id', (req, res) => {
    const todo =todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message : 'Todo is not found'});
    }
    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});


app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ message : 'Todo is not found'});
    }
    todos.splice(todoIndex, 1);
    res.json({ message : 'Todo deleted'});
});


app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
});