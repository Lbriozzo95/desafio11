interface Producto {
    title: string,
    price: Number,
    thumbnail: string
}


export class Archivo {
    private filePath: string;
    private fs = require('fs');

    constructor(path: string = '') {
        this.filePath = path;
    }

    private obtenerCantidadProductos = () => {
        //Obtiene la cantidad de productos del archivo para generar el id automatico
        let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8')
        return JSON.parse(contenido).length
    }

    readFile =  () => {
        
        
        try {
            let contenido = this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8');
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }
        
    }

    saveFile = (obj: Producto) => {
        
        let objSave = { ...obj, id: this.obtenerCantidadProductos() + 1 }
        let products = JSON.parse(this.fs.readFileSync(__dirname + `/../assets/${this.filePath}`, 'utf-8'));
        products.push(objSave)
        this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
        return objSave
    }
    deleteFile = (): void => {
        
        this.fs.unlink(__dirname + `/${'./text.txt'}`, (error: any) => {
            if (error) {
                console.log(error)

            } else {
                console.log("Deleted")
            }
        })

    }

    
    searchProductId = (num:number) => {
        let products_Aux = this.readFile();
        if (!products_Aux) {  
            return undefined
        } else {
            return products_Aux.find((e:any)=>e.id==num)
        }
    }

    upDateProduct = (id_produc:number,new_product:Producto) => {
        let prod_to_update = this.searchProductId(id_produc);
        if (prod_to_update){
            prod_to_update = {...prod_to_update, title:new_product.title,price:new_product.price,id:id_produc,thumbnail:new_product.thumbnail}
            
            let products = this.readFile();
            products = products.map((p:any)=>{
                if(p.id === id_produc){
                    p = prod_to_update
                }
                return p
            })
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return prod_to_update
        }else{
            return undefined
        }
    }

    deletedProduct = (id_produc:number)=>{
        let existe = this.searchProductId(id_produc)
        if(existe){
            let products = this.readFile();
            let index_deleted:number;
            //products.splice(,1)
            //console.log(products.findIndex((p:any)=>{p.id = id_produc}))
            for (let index = 0; index < products.length; index++) {
                if (products[index].id === id_produc) {
                    index_deleted = index
                } 
            }
 
            products.splice(index_deleted,1) 
            this.fs.writeFileSync(__dirname + `/../assets/${this.filePath}`, JSON.stringify(products, null, '\t'))
            return existe
        }else{
            return 'no existe el id'
        }
    }

}
