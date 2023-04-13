require('dotenv').config({path: __dirname + '/.env'})
var express = require('express');
var path = require('path');
const cors = require("cors");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
    res.status(400).send({
        message: `Page Not Found`
      });
})

try {
    app.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT}`);
});
} catch (error) {
    console.error(error);
}
module.exports = app;
