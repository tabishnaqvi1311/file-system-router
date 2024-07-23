import express from 'express';
import fs from 'fs'
import { handleRegularRoutes } from './utils/handle-regular-routes';
import { handleDynamicRoutes } from './utils/handle-dynamic-routes';
import { logError } from './utils/log-error';
import { normalizeRoute} from './utils/normalize-route';


const app = express();
const port = 8181 || process.env.PORT;
const ROOT = '../app/'

app.use([express.json(), express.urlencoded({ extended: true })]);

app.all('/*', async (req, res) => {
    let filePath: string = (ROOT + req.url).replace('//', '/');

    //TODO: add support for .js
    const doesFileExist = fs.existsSync(filePath+'.ts') || fs.existsSync(filePath + '.js');

    if(!doesFileExist){
        filePath += '/index.ts'
    } else {
        filePath += '.ts';
    }

    let data = await handleRegularRoutes(filePath, req, res);

    if(!data) {
        let path = ('./src/app/' + req.url).replace('//', '/');

        let pathParts = path.split('/')
        let param = pathParts.pop();
        let prevPath = pathParts.join('/');

        let dynamicHandler = await handleDynamicRoutes(prevPath, param)
        if(!dynamicHandler){
            res.statusCode = 404;
            logError(req.method, res.statusCode, filePath);
            return res.send('route not found');
        }
        // //console.log(dynamicHandler)

        req.params = {
            ...req.params, 
            [String(dynamicHandler.paramName)]: param
        }

        let normalizedRoute = normalizeRoute(prevPath);
        //console.log(normalizedRoute)

        let newRoute = [normalizedRoute, dynamicHandler.file].join('/');

        data = await handleRegularRoutes(newRoute, req, res);
        return res.json(data);
    }
    return res.json(data);
})

app.listen(port, () => console.log(`server listening at ${port}`));