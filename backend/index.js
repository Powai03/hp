import express from 'express';
import cors from 'cors';
import router from './router.js';
import bodyParser from 'body-parser';
import ip from 'ip';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
    console.log(`Server is running on http://${ip.address()}:3000`);
})
