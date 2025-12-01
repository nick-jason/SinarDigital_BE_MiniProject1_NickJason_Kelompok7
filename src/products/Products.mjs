import products from "./../products.json" with { type: "json" };
import fs from "fs";

// CREATE PRODUCT
router.post("/", (req, res) => {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...req.body };

    products.push(newProduct);

    fs.writeFile("./products.json", JSON.stringify(products, null, 2), (err) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Berhasil create", data: newProduct });
    });
});

// GET ALL PRODUCTS
router.get("/", (req, res) => {
    return res.json(products);
});

// UPDATE PRODUCT
router.put("/:id", (req, res) => {
    const existingId = Number(req.params.id);
    const index = products.findIndex(products => products.id == existingId);

    if (index === -1) return res.status(404).json({ message: "Product not found" });

    products[index] = { id: existingId, ...req.body };

    fs.writeFile('./products.json', JSON.stringify(products), (err, data) => {
        if(err) return res.json(err);
        return res.json({ Message: "Berhasil edit", data: products[index] });
    });
});

// DELETE PRODUCT
router.delete("/:id", (req, res) => {
    const existingId = Number(req.params.id);
    const filtered = products.filter((p) => p.id === existingId);

    if (filtered === -1) return res.status(404).json({ message: "Product not found" });

    const deleted = products.splice(filtered, 1, {...req.body})[0];

    fs.writeFile("./products.json", JSON.stringify(products, null, 2), (err) => {
        if (err) return res.json(err);
        return res.json({ message: "Berhasil delete", deleted: deleted[0] });
    });
});

export default router;