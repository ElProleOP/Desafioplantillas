import fs from "fs";

export default class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  save = async (product) => {
    try {
      const allProducts = await this.read();

      const lastProductId = allProducts[allProducts.length - 1].id;

      const newProduct = {
        id: lastProductId + 1,
        ...product,
      };

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify([...allProducts, newProduct])
      );

      return newProduct.id;
    } catch (error) {
      throw new Error(error);
    }
  };

  read = async () => {
    try {
      const data = await fs.promises.readFile(this.filename, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  getbyid = async (number) => {
    try {
      const allProducts = await this.read();
      if (number > allProducts.length && number < 1) {
        return null;
      }else{
      let i = 0;
      while (i < allProducts.length && number != allProducts[i].id ) {
          i++;
        } 
      return allProducts[i];
      }
    }catch (error) {
      throw new Error(error);
    }
  };

  getAll = async () =>{
    try {
      const allProducts = await this.read();
      return allProducts;
    } catch (error){
      throw new Error(error);
    }
  };

  deleteById = async (number) => {
    try {
      const allProducts = await this.read();
      if (number > allProducts.length && number < 1) {
        return null;
      }else{
      let i = 0;
      while (i < allProducts.length && number != allProducts[i].id ) {
          i++;
      }
      allProducts.splice(i,1);
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(allProducts)
      );
      return null;
    }
    }catch (error){
      throw new Error(error);
    }
  };

  /*deleteAll = async () => {
    try {
      let vacio = [];
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(vacio)
      );
      return null;
    }catch (error) {
      throw new Error(error);
    }
  };*/
  deleteAll = async () => {
    try {
      const allProducts = await this.read();

      allProducts.splice(0, allProducts.length);

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(allProducts)
      );

    }catch (error){
      throw new Error(error)
    }
  };

}


// const productos = new Contenedor("./products.json");




/*productos.save({
  title: "testing",
  price: 100,
  thumbnail: "http://http2.mlstatic.com/D_875724-MLA31116238699_062019-O.jpg",
});*/

//productos.getbyid();
//productos.getAll();
//productos.deleteById();
//productos.deleteAll();
