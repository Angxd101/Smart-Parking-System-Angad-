const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://mohnish:1234@cluster0.tsbaxfy.mongodb.net/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error(err);
});

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phno = req.body.phno;
    const password = req.body.password;

    const data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    };

    db.collection('users').insertOne(data, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Record Inserted Successfully");
            prompt("Record Inserted Successfully");
        }
    });

    return res.redirect('index.html');

});

app.post('/login', (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;

        const user = db.collection('users').findOne({ name });
        if (!user) {
            res.status(500).json({ message: 'Internal server error' });
        }
        else if (user.password != password) {
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            //write your page that u need to redirect ;sdjakgfiauvf'
            res.sendFile('suck.html');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");