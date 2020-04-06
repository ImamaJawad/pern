//set up server

const express=require("express");
const app=express();
const cors=require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES//

//create a todo
app.post("/todos", async(req,res) => {
    //await
    try{
        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        //console.log(req.body);
        res.json(newTodo.rows[0]);
    }
    
    catch(err){
        console.error(err,message);
    }

})
//get all toddos
app.get("/todos",async(req,res) => {
    try{
        const {description}=req.body;
        //get back data returning
        const allTodos=await pool.query("SELECT * FROM todo");
        //console.log(req.body);
        res.json(allTodos.rows);
    }
    
    catch(err){
        console.error(err,message);
    }

})
//get a todo
app.get("/todos/:id",async(req,res)=>{
    try{
        console.log(req.params);
        const { id } =req.params;
        const oneTodo=await pool.query("SELECT description FROM todo WHERE todo_id= $1",[id]);
        res.json(oneTodo.rows[0]);
        console.log(oneTodo.rows[0])
    }
    catch(err){
        console.error(err.message);
    }

})
//update todo
app.put("/todos/:id",async(req,res)=>{
    try{
        
        const { id } =req.params;
        const { description } =req.body;
        const updateTodo=await pool.query("update todo SET description=$1 WHERE todo_id= $2",[description, id]);
        res.json("updated");
    }
    catch(err){
        console.error(err.message);
    }

})
//delete todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        
        const { id } =req.params;
        const deleteTodo=await pool.query("delete from todo where todo_id= $1",[id]);
        res.json("deleted");
    }
    catch(err){
        console.error(err.message);
    }

})
app.listen(5000,() => {
    console.log("server has started on port 5000");
});
