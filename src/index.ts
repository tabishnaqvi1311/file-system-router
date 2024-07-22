import express from 'express';
import fs from 'fs'
import { handleRegularRoutes } from './utils/helpers';

const app = express();
const port = 8181 || process.env.PORT;
const ROOT = '../app/'

app.use([express.json(), express.urlencoded({ extended: true })]);

app.all('/*', async (req, res) => {
    let filePath = (ROOT + req.url).replace('//', '/');

    //TODO: add support for .js, .tsx and .jsx
    const doesFileExist = fs.existsSync(filePath+'.ts');

    if(!doesFileExist){
        filePath += '/index.ts'
    } else {
        filePath += '.ts';
    }

    let data = await handleRegularRoutes(filePath, req, res);

    if(!data) return res.send('route not found')
    return res.json(data);
})

app.listen(port, () => console.log(`server listening at ${port}`));