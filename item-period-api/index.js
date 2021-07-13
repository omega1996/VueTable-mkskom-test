import express from "express";
import sqlite3 from "sqlite3";
import * as path from 'path';
import cors from 'cors';
const sqlite = sqlite3.verbose();
const app = express();

const __dirname = 'C:\\Users\\Omega\\WebstormProjects\\VueTable-mkskom-test\\item-period-api'
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite.Database(db_name, err => {
  if (err) {
      console.log(db_name);
    return console.error(err.message);
  }
  
  console.log("Successful connection to the database 'apptest.db'");
});

app.listen(3000, () => { {
    console.log("Server started (http://localhost:3000/) !");
}});

app.post('/', function (req, res) {
    res.send(req.body)
  })

app.get("/items", (req,res)=>{
  
    const sql = "SELECT * FROM Item;"
    db.all(sql, [], (err, rows) => {
        if (err) {
          return res.send(err.message);
        }
        res.send(rows)
      });
})

app.post("/items", (req, res) => {
    const sql = "INSERT INTO Item (name, description) VALUES (?, ?)"
    const item = [req.body.name, req.body.description]
    db.run(sql, item, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})

app.patch("/items", (req, res) => {
    const sql = "UPDATE Item SET name = ?, description = ? where id = ?"
    const item = [req.body.name, req.body.description, req.body.id]
    db.run(sql, item, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})

app.delete("/items",(req, res) => {
    const sql = "DELETE FROM Item WHERE id = ?";
    const id = req.body.id
    db.run(sql, id, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})

app.get("/periods", (req,res)=>{
    const sql = "SELECT * FROM Period;"
    db.all(sql, [], (err, rows) => {
        if (err) {
          return res.send(err.message);
        }
        res.send(rows)
      });
})

app.post("/periods", (req, res) => {
    const sql = "INSERT INTO Period (name, description) VALUES (?, ?)"
    const period = [req.body.name, req.body.description]
    db.run(sql, period, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})

app.patch("/periods", (req, res) => {
    const sql = "UPDATE Period SET name = ?, description = ? where id = ?"
    const period = [req.body.name, req.body.description, req.body.id]
    db.run(sql, period, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})

app.delete("/periods",(req, res) => {
    const sql = "DELETE FROM Period WHERE id = ?";
    const id = req.body.id
    db.run(sql, id, err=>{
        if (err) {
            return res.send(err.message);
          }
        res.send("ok")
    })
})
