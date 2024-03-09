const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    {id: 1, name: `Labial Mac`, precio: 20000, categoria: `maquillaje`}, 
    {id: 2, name: `Rubor Avon`, precio: 20000, categoria: `maquillaje`},
    {id: 3, name: `Pestañina `, precio: 20000, categoria: `maquillaje`},
];


app.get('/', (req, res) => {
    res.send(`Despierta la esencia de tu belleza interior`); 
});

app.get('/api/productos', (req, res) => {
    res.send(productos);
});

app.get('/api/productos/:id', (req, res) => {
    const product = productos.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send(`Producto no encontrado`);
    else res.send(product);
})

app.post('/api/productos', (req, res) => {
    const product = {
        id: productos.length + 1,
        name: req.body.name,
        precio: parseInt(req.body.precio),
        categoria: req.body.categoria
    };

    productos.push(product);
    res.send(product);
});

app.delete('/api/productos/:id', (req, res) => {
    const product = productos.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send(`Producto no encontrado`);

    const index = productos.indexOf(productos);
    productos.splice(index, 1);
    res.send(product);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));

