let bodyParser = require('body-parser');
let express = require('express');

let app = express();
app.use(bodyParser.json());

app.get("/", function (req, res) {
    return res.send("helooooooooooooo");
});

require("./src/routes/router")(app);

app.listen(9090, function () {
    console.log('listing to port 9090')
});