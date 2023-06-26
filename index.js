const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
//for dynamic pages
const exphbs = require('express-handlebars');
// const engine = exphbs.create({ extname: '.handlebars', defaultLayout: 'main' });
app.engine('.handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//for post methods to get data from forms
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//for static html and css
app.use(express.static(path.join(__dirname, 'public')));

//db connection
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arshad",
    database: "juhosi"
});
connection.connect((error) => {
    if (error) console.error('Error connecting to the database:', error);
    else console.log("db connnected");
});

app.get("/", (req, res) => {
    res.render("index", { message: '', style: "style.css" });
});

app.post('/submit', (req, res) => {

    const { username, password } = req.body;
    connection.query('SELECT user_name, user_password FROM auth WHERE user_name = ? and user_password = ?', [username, password], (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length === 0) {
            res.render('index', { message: 'Invalid username or password', style: 'style.css' });
        }
        else {
            if (username == "admin") res.redirect('admin');
            else res.redirect('customer');
        }
    });
});

app.get('/customer', (req, res) => {
    res.render("customer", { style: "style2.css", script: "script.js" })
});

app.post('/customer', (req, res) => {
    const { date, company, owner, item, quantity, weight, req_for_shipment, trackingid, shipment_size, box_count, specifications, checklist_quantity } = req.body;
    const query = "insert into customer values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    connection.query(query, [date, company, owner, item, quantity, weight, req_for_shipment, trackingid, shipment_size, box_count, specifications, checklist_quantity], (err, rows) => {
        if (err) console.error('Error inserting data into MySQL:', err);
        else console.log('Data inserted successfully');
    });

    res.render("customer", { style: "style2.css", script: "script.js", message: "Submitted successfully!!" });
})

app.get('/admin', (req, res) => {
    const query = 'SELECT quantity, weight, box_count FROM customer';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return;
        }

        let quantity = 0;
        let weight = 0;
        let box_count = 0;

        results.forEach((row) => {
            quantity += row.quantity;
            weight += row.weight;
            box_count += row.box_count;
        });

        res.render("admin", { style: "style3.css", data: results, quantity: quantity, weight: weight, box_count: box_count });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});