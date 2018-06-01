import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import * as db from './utils/DataBaseUtils';
const port = 3001;
const app = express();

db.setUpConnection();

app.use(bodyParser.json());
app.use(cors());

app.get('/office', (req, res) => {
    db.listOffices().then(data => res.send(data));
});

app.post('/office', (req, res) => {
    db.createOffice(req.body).then(data => res.send(data));
});

app.delete('/office/:id', (req, res) => {
    db.deleteOffice(req.params.id).then(data => res.send(data));
});

app.put('/office/:id', (req, res) => {
    db.updateOffice(req.params.id, req.body).then(data => res.send(data));
});

app.listen(port, (error) => {
    if (error) {
        return console.log('Something bad happened', error);
    }

    console.log(`listening on ${port}...`);
});