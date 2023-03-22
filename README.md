## MI CRUD Graphiql

mutation crear{
createProducto(datos:{
name: "Espada",
price: 4999,
thumbnail: "https://cdn.shopify.com/s/files/1/0478/9073/products/Excalibur_Full_Finished_455x455.jpg?v=1571269167"
}) {
id
}
}

query todos {
getProductos {
id
name
price
thumbnail
}
}

query getUno {
getProducto(id: "5") {
id
name
price
}
}

mutation updateUno {
updateProducto(id: "8", datos: {name: "Espada", price: 20000}) {
id
name
price
}
}

mutation eliminarUno {
deleteProducto(id: "8") {
id
name
price
}
}
