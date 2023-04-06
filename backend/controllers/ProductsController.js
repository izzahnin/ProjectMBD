import { response } from "express";
import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//method untuk mengambil single data
export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//method untuk mengambil single data
export const saveProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
  const productName = req.body.productName;
  const price = req.body.price;
  const file = req.files.file;
  const stock = req.body.stock;
  const fileSize = file.data.lenght;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowType = [".jpg", ".jpeg", ".png"];

  if (!allowType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "File type not allowed" });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({ msg: "File must be less than 5MB" });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: "Server error" });
    try {
      await Product.create({
        productName: productName,
        stock: stock,
        image: fileName,
        price: price,
        url: url,
      });
      res.status(201).json({ msg: "Product created successfully image" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

//method untuk create data
// export const createProduct = async (req, res) => {
//   try {
//     await Product.create(req.body);
//     res.status(201).json({ msg: "Product created successfully" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//method untuk update data
export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const productName = req.body.productName;
  const stock = req.body.stock;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Product.update(
      { productName: productName, stock: stock, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

//method untuk delete data
export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// updateProduct
// try {
//   await Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.status(200).json({ msg: "Product updated successfully" });
// } catch (error) {
//   console.log(error.message);
// }
// deleteProduct
// try{
//     await Product.destroy({
//         where:{
//             id: req.params.id
//         }
//     });
//     res.status(200).json({msg:"Product deleted successfully"});
// } catch (error){
//     console.log(error.message);
// }
