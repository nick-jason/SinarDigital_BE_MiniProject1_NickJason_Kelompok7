import products from "../products.json" with { type: "json" };
import fs from "fs";

export default class product{
    // GET ALL PRODUCTS
    static getProduct(req, res){
        return res.json(products);
    };
    
    // CREATE PRODUCT
    static createProduct(req, res){
        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, ...req.body };

        products.push(newProduct);

        fs.writeFile("./src/products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).json(err);
            return res.json({ message: "Successfully Created", data: newProduct });
        });
    };

    // EDIT PRODUCT
    static editProduct(req, res){
        const existingId = Number(req.params.id);
        const index = products.findIndex(products => products.id == existingId);

        if (index === -1) return res.status(404).json({ message: "Product not found" });

        products[index] = { id: existingId, ...req.body };

        fs.writeFile('./src/products.json', JSON.stringify(products, null, 2), (err, data) => {
            if(err) return res.json(err);
            return res.json({ Message: "Successfully Edited", data: products[index] });
        });
    };
 
    // DELETE PRODUCT
    static deleteProduct(req, res){
        const existingId = Number(req.params.id);
        const filtered = products.findIndex(products => products.id === existingId);

        if (filtered === -1) return res.status(404).json({ error: "Product not found" });

        const deleted = products.splice(filtered, 1)[0];

        fs.writeFile("./src/products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) return res.json(err);
            return res.json({ message: "Successfully Deleted", deleted });
        });
    };
}