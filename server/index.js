var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

var PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));