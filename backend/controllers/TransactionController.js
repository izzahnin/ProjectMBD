import DetailTrans from "../models/DetailTransModel.js";
import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import Transaction from "../models/TransactionModel.js";

export const getTransactions = async (req, res) => {
  await Transaction.findAll({
    attributes: ["id", "transNumber", "createdAt"],
    include: [
      {
        model: DetailTrans,
        attributes: ["id", "quantity"],
        include: [
          {
            model: Products,
            attributes: ["id", "name", "image", "url", "price", "userId"],
            include: [
              {
                model: Users,
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    ],
  })
    .then(async (result) => {
      if (result.length > 0) {
        const dataTransaction = result.map((item, _index) => {
          console.log("lewat")
          console.log("tes",item)
          const detailItem = item.detailtrans.map((_item, _index) => {
            console.log("bang udah bang", _item, "\n\n")
            return {
              id: _item.id,
              quantity: _item.quantity,
              productId: _item.productId,
              name: _item.products.name,
              price: _item.products.price,
              image: _item.products.image,
              url: _item.products.url,
              userId: _item.products.userId,
            };
          });
          return {
            id: item.id,
            transNumber: item.transNumber,
            createdAt: item.createdAt,
            details: detailItem,
          };
        });

        res.send({
          code: 200,
          msg: "ok",
          data: dataTransaction,
        });
      } else {
        res.status(404), { msg: "No Data Found" };
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};

export const getTransactionById = async (req, res) => {
  const id = req.params.id;

  await Transaction.findOne({
    where: { id: id },
    attributes: ["id", "transNumber", "createdAt"],
    include: [
      {
        model: DetailTrans,
        attributes: ["id", "quantity"],
        include: [
          {
            model: Products,
            attributes: ["id", "name", "image", "url", "price", "userId"],
            include: [
              {
                model: Users,
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    ],
  })
    .then(async (result) => {
      if (result.length > 0) {
        const detailItem = item.DetailTrans
          ? item.DetailTrans.map((_item, _index) => {
              return {
                id: _item.id,
                quantity: _item.quantity,
                productId: _item.productId,
                name: _item.Product.name,
                price: _item.Product.price,
                image: _item.Product.image,
                url: _item.Product.url,
                userId: _item.Product.userId,
              };
            })
          : [];

        res.send({
          code: 200,
          msg: "ok",
          data: {
            id: item.id,
            transNumber: item.transNumber,
            createdAt: item.createdAt,
            details: detailItem,
          },
        });
      } else {
        res.status(404), { msg: "No Data Found" };
      }
    })
    .catch((error) => res.status(500).json({ msg: error.message }));
};

export const updateTransaction = async (req, res) => {};

// import DetailTrans from "../models/DetailTransModel.js";
// import Products from "../models/ProductModel.js";
// import Users from "../models/UserModel.js";
// import Transaction from "../models/TransactionModel.js";

// export const getTransactions = (req, res) => {
//   db.transaksi
//     .findAll({
//       attributes: ["id", "trs_number", "createdAt"],
//       include: [
//         {
//           model: db.transaksi_detail,
//           attributes: ["id", "qty"],
//           include: [
//             {
//               model: db.produk,
//               attributes: ["id", "title", "image", "price", "url"],
//               include: [
//                 {
//                   model: db.kategori,
//                   attributes: ["name"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     })
//     .then(async (result) => {
//       if (result.length > 0) {
//         const dataTransaksi = await result.map((item, index) => {
//           const detailItem = item.transaksi_details.map((_item, _index) => {
//             return {
//               id: _item.id,
//               produk_id: _item.produk_id,
//               title: _item.produk.title,
//               image: _item.produk.image,
//               price: _item.produk.price,
//               url: _item.produk.url,
//               qty: _item.qty,
//               kategori: _item.produk.kategori.name,
//             };
//           });
//           return {
//             id: item.id,
//             trs_number: item.trs_number,
//             createdAt: item.createdAt,
//             details: detailItem,
//           };
//         });
//         res.send({
//           code: 200,
//           message: "OK",
//           data: dataTransaksi,
//         });
//       } else {
//         res.status(404).send({
//           code: 404,
//           message: "Belum ada data transaksi",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         code: 500,
//         message: "Error > " + err,
//       });
//     });
// };

// export const  getTransactionById = async (req, res) => {
//   const id = req.params.id;

//   db.transaksi.findOne({
//     where: {
//       id: id,
//     },
//     attributes: ["id", "trs_number", "createdAt"],
//     include: [
//       {
//         model: db.transaksi_detail,
//         attributes: ["id", "qty"],
//         include: [
//           {
//             model: db.produk,
//             attributes: ["id", "title", "image", "price", "url"],
//             include: [
//               {
//                 model: db.kategori,
//                 attributes: ["name"],
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }).then(async result => {
//     if (result.length !== null){
//       const detailItem = result.transaksi_details.map((_item, _index) => {
//         return {
//           id: _item.id,
//           produk_id: _item.produk_id,
//           title: _item.produk.title,
//           image: _item.produk.image,
//           price: _item.produk.price,
//           url: _item.produk.url,
//           qty: _item.qty,
//           kategori: _item.produk.kategori.name,
//         };
//       });

//       res.send({
//         code: 200,
//         message: "OK",
//         data: {
//           id: result.id,
//           trs_number: result.trs_number,
//           createdAt: result.createdAt,
//           details: detailItem,
//         }
//       })
//     } else {
//       res.status(404).send({
//         code: 404,
//         message: "Data transaksi tidak ditemukan"
//       })
//     }

//   }).catch(err => {
//     res.status(500).send({
//       code: 500,
//       message: "Error > " + err
//     })
//   })
// };
