const express = require('express');
const app = express();
const itemsRoutes = require('./itemsRoutes');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemsRoutes);

app.use((req, res, next) =>{
    return new ExpressError('Invalid page', 404);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    });
});

module.exports = app;