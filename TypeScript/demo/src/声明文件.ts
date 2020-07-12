//全局声明
declare var console:Console
//命名空间
declare namespace console{
    function log(message:string):void
}

declare function setTimeout(handler:()=>void,ms:number):number

//  第三方库添加声明文件
declare module 'lodash'{
    export function chunk (arr:any[],size:number):any[][]
}