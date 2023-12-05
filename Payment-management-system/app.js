const bodyparser = require('body-parser');
const routing = require('./server/routes/auth')
const path = require('path')
const cookieParser = require('cookie-parser');
const { OnlyAuthUser } = require('./server/middleware/auth')
const { router } = require('./server/routes/routes');
const { connecting } = require('./server/config/config')
const express = require('express');
const app = express();

//console.log(__filename + "this is dir")
//need authentication 
//clients side 
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//connection
connecting("mongodb://localhost:27017/payments");

app.use('/', routing.router);
// Use the routes defined in routing.router
app.use('/show/public', OnlyAuthUser, express.static(path.join(__dirname, 'client')));
app.use('/allow', OnlyAuthUser, router)


//errors are globally handled 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send("Something went wrong");
});

//listen to the port
app.listen(5000, () => {
    console.log("Server running on port http://localhost:5000");
    console.log("starting point at signup at http://localhost:5000/signup")
    console.log("already signup the http://localhost:5000/signin")
});



