const express = require('express')
const mysql = require('mysql')

//create connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
})


const app = express()

//create db

app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result)=>{
        if (err) throw err;
        consolelog(result)
        res.send('Database created...')
    })
})

app.get('/createposttable', (req, res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Posts table created...')
    })
})

//insert post 1

app.get('/addpost2', (req, res)=>{
   let post = {title: 'Post Two', body: 'This is post number two'};
   let sql = 'INSERT INTO posts SET ?';
   let query = db.query(sql, post, (err, result)=>{
    if(err) throw err;
    console.log(result)
    res.send('Post 2 added...')

   })
})

//select posts

app.get('/getposts', (req, res)=>{
   let sql = 'SELECT * FROM posts';
   let query = db.query(sql, (err, results)=>{
    if(err) throw err;
    console.log(results)
    res.send({status: 'success', data: results})

   })
})
app.listen('3000', () => {
    console.log('Server started on port 3000')
})