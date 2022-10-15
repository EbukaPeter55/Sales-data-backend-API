const express = require('express');
// const bodyParser = require('body-parser')

const cors = require('cors');

var pool = require('./db_connect');

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // New
// Parse application/json
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200' //Allow request from this URL
}));

// Add sales
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO sales SET ?', params, (err, rows) => {
        connection.release() // return the connection to connect
        if (!err) {
            res.send(`Sales Item added successfully.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from sales table are:11 \n', rows)

        })
    })
});

// Get all sales data
app.get('/sales', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from sales', (err, rows) => {
            connection.release() // return the connection to connect

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from sales table are: \n', rows)
        })
    })
})



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))