import express  from "express";
import mysql from "mysql2";
import cors from "cors";


const app=express()
app.use(express.json({limit :"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port: 3306,
    database:"book"

})
app.get('/',(req,res)=>{

    res.send("From Backend Server");
})

app.post('/Book', (req, res) => {
    const {
        Name,
        Auther,
        Genre,
        PublishedDate
        
    } = req.body;

    const values = [
        Name,
        Auther,
        Genre,
        PublishedDate
    ];

    const sanitizedValues = values.map(val => (val !== undefined ? val : null));

    db.execute(
        'INSERT INTO BookDetails (Name, Auther, Genre , PublishedDate) VALUES (?, ?, ?, ?)',
        sanitizedValues,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).send('Employee Details Added');
        }
    );
});


app.get('/Book',(req,res)=>{
    const sql="SELECT * FROM BookDetails";
    db.query(sql,(err,data)=>{
        if(err) return res.send(err);
        return res.send(data);
    })
})

app.listen(5000,()=>{
    console.log("Server Listening to port 5000");
})