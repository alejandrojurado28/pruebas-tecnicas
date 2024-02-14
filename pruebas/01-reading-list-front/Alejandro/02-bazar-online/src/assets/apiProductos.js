const express = require('express');
const app = express();
const PORT = 3000;

// JSON de productos
const productsJson = {
  "products":[
    // El JSON completo de productos que has proporcionado
  ],
  "total":100,
  "skip":0,
  "limit":30
};

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
  res.json(productsJson);
});

// Ruta para obtener un producto por su ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsJson.products.find(product => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
