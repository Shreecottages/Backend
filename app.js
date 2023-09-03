const express = require("express");
const router = require("./routes/web");
const connectDb = require('./db/connectdb');
const path = require('path');
var cors = require('cors');

const app = express();
const PORT = 8000;

connectDb();

app.use(cors())

app.use('/img', express.static(path.join(process.cwd(), "images")))


// app.use(csrfProtection);

// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use(express.json());
app.use(router);

// app.use((error, req, res, next) => {
//     console.log(error);
//     res.status(500).render('500', {
//         pageTitle: 'Error!',
//         path: '/500'
//     });
// })

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data
    res.status(status).json({ message: message, data: data });
});

app.listen(PORT, () => {
    console.log('Connection Successfully.', PORT)
})
