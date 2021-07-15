const express = require("express");
const fs = require("fs");
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"))

//routing
//HTML
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

//API
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        console.log(JSON.parse(data))
        res.json(JSON.parse(data))
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbArr = JSON.parse(data)
        dbArr.push(req.body)

        fs.writeFileSync("./db/db.json", JSON.stringify(dbArr))
        res.json(dbArr)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, ()=> {
    console.log('we are alive')
})