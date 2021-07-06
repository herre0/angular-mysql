const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('./dist/Angular10Crud'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./src/app/server/models");
const { nextTick } = require("process");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route

app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Angular10Crud/'}),
);
app.get('/tutorials', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Angular10Crud/'}),
);


require("./src/app/server/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
