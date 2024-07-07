import express from 'express';

const app = express();

app.use(express.json());

const port = 2000;
let todos = [];
let newId = 1;


app.get('/todos', (req, res) => {
    try{
      if (todos === null || todos.length === 0){
        
          return res.status(204).send();
        
      }else{

       res.status(200).json(todos);
      }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});


app.post('/todos', (req, res) => {
    try{
        if (!req.body.title){
           return res.status(400).json({
             message:"title is required"
          });
    }else{
      const newTodo = {
         id: newId,
         title: req.body.title,
         completed: req.body.completed || false
    };
        todos.push(newTodo);
        newId++;
        res.status(201).json(newTodo);
}
  }catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message})
 }
});

app.get('/todos/:id', (req, res) => {
 try{
     const todo = todos.find(t => t.id === parseInt(req.params.id));
     if (!todo) {
        return res.status(404).json({ message : 'Todo is not found'});
     }else{
       res.status(200).json(todo)
     }
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
});


app.put('/todos/:id', (req, res) => {
  try{
    const todo =todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message : 'Todo is not found'});
     } else{
       todo.title = req.body.title !== undefined ? req.body.title : todo.title;
       todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
       res.status(200).json(todo);
     }
  }catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
}
});


app.delete('/todos/:id', (req, res) => {
  try{
      const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
      if (todoIndex === -1) {
        return res.status(404).json({ message : 'Todo is not found'});
      }else {
       todos.splice(todoIndex, 1);
       res.status(202).send({ message : 'Todo deleted'});

      }
     }catch(error){
       console.log(error.message);
       res.status(500).json({message:error.message});
   }
});


app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
});
