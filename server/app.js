import express from 'express';
import bodyParser from 'body-parser';
import router from './jsfiles/routes/index';
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));
app.use('/', router);

app.listen(1337, function () {
console.log('listening on port 1337')
});