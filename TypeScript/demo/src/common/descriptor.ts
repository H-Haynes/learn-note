// export function printObj(obj:any){
//     if(obj.$classDescription){
//         console.log("类描述:",obj.$classDescription);
//     }else{
//         console.log("类描述:",obj.prototype.constructor.name)
//     }

//     if(!obj.$propDescriptions){
//         obj.$propDescriptions = []
//     }

//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             const prop = obj.$propDescriptions.find((ele:any)=>ele.propName === key);
//             if(prop){
//                 console.log(`\t${prop.desc}:${obj[key]}`)
//             }else{
//                 console.log(`\t${key}:${obj[key]}`)
//             }
            
//         }
//     }

//     console.log("属性描述",obj.$propDescriptions);
// }


// //属性描述装饰器工厂
// export function propDescriptor(desc:string){
//     return function (target:any,propName:string){
//         //将描述作为数组放到原型
//         if(target.$propDescriptions){
//             target.$propDescriptions.push({
//                 propName,
//                 desc
//             })
//         }else{
//             target.$propDescriptions = []
//         }


        
//     }
// }


// //类描述装饰器工厂
// export function classDescriptor(desc:string){
//     return function (target:Function){
//         target.prototype.$classDescription = desc;
//     }
// }


import "reflect-metadata"

const key=Symbol.for("descriptor")
export function printObj(obj:any){
    const cons = Object.getPrototypeOf(obj);
    if(Reflect.hasMetadata(key,cons)){
        console.log("类描述:",Reflect.getMetadata(key,cons));
    }else{
        console.log("类描述:",cons.constructor.name)
    }

   

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if(Reflect.hasMetadata(key,cons,prop)){
                console.log(`\t${Reflect.getMetadata(key,cons,prop)}:${obj[prop]}`)
            }else{
                console.log(`\t${prop}:${obj[prop]}`)
            }
            
        }
    }
}


// export function propDescriptor(desc:string){
//     return Reflect.metadata(key,desc)
// }


// export function classDescriptor(desc:string){
//     return Reflect.metadata(key,desc)
// }

export function descriptor(desc:string){
    return Reflect.metadata(key,desc)
}
