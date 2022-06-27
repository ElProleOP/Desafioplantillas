import express from "express";
const app = express();
import Contenedor from "./index.js";
import { engine } from "express-handlebars";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.set("views", "./views");
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

const productos = new Contenedor("./products.json")

app.get("/productos", (req, res) => {
  const arr = productos.getAll();
  console.log(arr);
  res.render("productos", {array : arr});
}); 
/*
app.get("/api/productos/:id", (req, res) => {
  const id = req.params.id;
  res.send(`${productos.getbyid(id)}`);
});
*/ 
app.post("/productos", (req,res) =>{
  const prodNuevo = req.body;
  productos.save(prodNuevo);
  res.redirect("/");
});
/*
app.put("api/productos/:id", (req,res) =>{
  const id = req.params.id;
  const prod = productos.getbyid(id);
  const prodreemplazo = Object.assign(prod, req.body.prod);
  res.json({productoanterior: prod, productonuevo : prodreemplazo})
})

app.delete("api/productos/:id", (req,res)=>{
  const id = req.params.id;
  productos.deleteById(id);
  res.json({result: "Eliminado"})
});
*/
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto 8080`);
});
