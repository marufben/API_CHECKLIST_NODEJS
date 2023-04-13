require('dotenv').config({path: __dirname + '/.env'})
var express = require('express');
var path = require('path');
const cors = require("cors");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const db = require("./app/models");



app.get('*', function(req, res){
    res.status(400).send({
        message: `Page Not Found`
      });
})

try {
    db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
    
    app.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT}`);
});
} catch (error) {
    console.error(error);
}
module.exports = app;
