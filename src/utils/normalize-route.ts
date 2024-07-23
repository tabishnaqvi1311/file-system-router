export function normalizeRoute(prevPath: string): string{
    // './src/app/blogs'
    let prevPathArr: string[] = prevPath.split('/');
    let resultArr: string[] = ['..'];
    // [src, app, blogs]
    for(let i = 0; i < prevPathArr.length; i++){
        let curr = prevPathArr[i]
        if(curr !== 'src' && curr !== '.') resultArr.push(curr);
    }
    return resultArr.join('/');
}