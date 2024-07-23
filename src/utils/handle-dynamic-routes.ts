import fs from 'fs';

type handleDynamicRoutesReturn = {
    paramName: string | undefined
    file: string | undefined,
    param: string | number | undefined
}

export async function handleDynamicRoutes(folder: string, param: string | number | undefined): Promise<handleDynamicRoutesReturn | null>{
    const MATCH = /\[[^\]]*\]/i

    try {
        const files = fs.readdirSync(folder);
        const dynamicFile = files.find(fname => MATCH.test(fname))
        return {
            paramName: dynamicFile?.replace('[', '').replace(']', ''), 
            file: dynamicFile+'/index.ts',
            param: param,
        }
    } catch (error) {
        return null;
    }
}