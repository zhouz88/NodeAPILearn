const express = require("express");
const dotEnv = require("dotenv");
const cors = require('cors');
const dbConnection = require('./database/database.js');
dotEnv.config();
//server
const anExpress = express();

dbConnection();

anExpress.use(cors());
anExpress.use(express.json());
anExpress.use(express.urlencoded({extended: true}));
anExpress.use('/api/v1/product', require('./routes/productRoutes'))
anExpress.use('/api/v1/user', require('./routes/userRoutes'))

anExpress.get("/", (req, res, next) => {
    res.send("Helfasdfasffsadfadfadfadfadfadfaesdfaflo from fadfa Node + 1afdafa");
});

const PORT = process.env.PORT || 9882;


anExpress.listen(PORT, () => {
    console.log("Server listening on port" + PORT);
});

anExpress.use( (err, req, res, next) => {
        console.log(err.stack)
        res.status(500).send(
            {
              status: 500,
              message: err.message,
              body:{}
            }
        )
    }
)
