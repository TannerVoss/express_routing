const express = require("express"); // import express from express

const { join } = require("path"); // use join method. __dirname will access absolute path.

const app = express(); // call express and assign instance
const port = 3001;

// need 3 routes "home" "about" "newsletter" 

app.get("/", (req, res, next) => { // 6. "GET" route 1 to index
    try {
        res.sendFile(join(__dirname, "src/index.html"));
    } catch (err) {
        next(err);
    }
});

app.get("/about", (req, res, next) => { // 6. "GET" route 2 to "about"
    try {
        res.sendFile(join(__dirname, "src/about.html"));
    } catch (err) {
        next(err);
    }
});

app.get("/contact", (req, res, next) => { // 6. "GET" route 3 to "contact"
    try {
        res.sendFile(join(__dirname, "src/contact.html"));
    } catch (err) {
        next(err);
    }
});

app.use((req, res, next) => { // 7. Account for server errors with a custom error handler--- 404 handler. If it gets to this handler, it never matched a route or there was an error.
    try {
        res.status(404).sendFile(join(__dirname, "src/notFound.html"));
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => { // error handler
    res.status(err.status || 500).json({
        name: err.name || "Unknown",
        msg: err.message || "An unexpected error has occurred."
    }); // if error.status is undefined, pass in 500, return as json the name of hte error, if there is no name it will be "unknown" with message of either error message or "An unexpected error has occurred."
});


app.listen(port, () => console.log(`server listening on port: ${port}`)); // listen on specified port from above