import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { productosMap, Producto } from "./productos.js";

const schema = buildSchema(`
  type Producto {
    id: ID!
    name: String,
    price: Int,
    thumbnail: String
  }
  input ProductoInput {
    name: String,
    price: Int
    thumbnail: String
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);

const app = express();

function getProductos({ campo, valor }) {
  const productos = Object.values(productosMap);
  if (campo && valor) {
    return productos.filter((p) => p[campo] == valor);
  } else {
    return productos;
  }
}

function getProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found.");
  }
  return productosMap[id];
}

function createProducto({ datos }) {
  let id;

  if (!productosMap || !productosMap.length) {
    id = 0;
  } else {
    productosMap.forEach((o) => {
      id = o.id;
    });

    id = id + 1;
  }

  const newProduct = new Producto(id, datos);
  productosMap[id] = newProduct;
  return newProduct;
}

function updateProducto({ id, datos }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoActualizado = new Producto(id, datos);
  productosMap[id] = productoActualizado;
  return productoActualizado;
}

function deleteProducto({ id }) {
  if (!productosMap[id]) {
    throw new Error("Producto not found");
  }
  const productoBorrado = productosMap[id];
  delete productosMap[id];
  return productoBorrado;
}

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProductos,
      getProducto,
      createProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: http://localhost:${PORT}`;
  console.log(msg);
});
