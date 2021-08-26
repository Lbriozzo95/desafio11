import express = require("express");
let __path = require('path');
import { Archivo } from '../clases'

//console.log(__path.resolve(__dirname+'/../public/index.html'))

const router = express.Router();




router.get('/productos/vista', (req: express.Request, res: express.Response) => {
    let products = new Archivo("productos.txt");

    res.render('vistaProducts', {
        productos: products.readFile()
    })
})

router.get('/productos/add', (req: express.Request, res: express.Response) => {
    //cargar producto con formulario hecho en handlebars
    res.render('form',{});
})

router.put('/productos/actualizar/:id',(req: express.Request, res: express.Response)=>{
    
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    let prod_to_update = {
        "title":req.body.title,
        "price":req.body.price,
        "thumbnail":req.body.thumbnail
    }
    
    res.json({datos:products.upDateProduct(id_search,prod_to_update)})
})

router.get('/productos/cargar',(req: express.Request, res: express.Response)=>{
    let obj_to_add = {
        "title":req.query.title as string,
        "price":parseInt(req.query.price as string),
        "thumbnail":req.query.img as string
    }
    let products = new Archivo("productos.txt");
    products.saveFile(obj_to_add)
    res.redirect('/api/productos/add');
})

router.delete('/productos/borrar/:id',(req: express.Request, res: express.Response)=>{
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    res.json({data:products.deletedProduct(id_search)})
})

//otros
router.get("/productos/listar/:id", (req: express.Request, res: express.Response) => {
    
    let id_search = parseInt(req.params.id)
    let products = new Archivo("productos.txt");
    let product_wanted = products.searchProductId(id_search)
    if (product_wanted) {
        return res.json(product_wanted)
    } else {
        return res.json({error:'Producto no encontrado'})
    }
});

router.get("/productos/listar", (req: express.Request, res: express.Response) => {
    let products = new Archivo("productos.txt");
    if (!products.readFile().length) {
        //Esta vacio
        res.json({error:`No hay productos disponibles`})
    } else {
        res.json({items:products.readFile()})
    }
});

router.post("/productos/guardar", (req: express.Request, res: express.Response) => {
    let products = new Archivo("productos.txt");
    let product_to_save = req.body
    products.saveFile(product_to_save)
    
    return res.json({ msg: "Producto guardado con exito" });
});

module.exports = router
