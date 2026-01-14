import db from "../config/db.js";

// Menampilkan data
export const getOrderDetails = (req, res) => {
  db.query("SELECT * FROM order_details", (err, results) => {
    
    // jika ada error
    if (err) {
      return res.status(500).json({ message: err });
    }

    // jika tidak ada error
    res.json(results);
  });
};

// insert data
export const saveOrderDetails = (req, res) => {
  const { qty, price, order_id, product_id } = req.body;
  db.query(
    "INSERT INTO order_details (qty, price, order_id, product_id) VALUES (?, ?, ?, ?)",
    [qty, price, order_id, product_id],
    (err, results) => {

      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // jika tidak ada err
      res.status(201).json({
        order_id: results.insertId,
        qty: qty,
        price: price,
        product_id: product_id,
      });
    }
  );
};

// show data by id
//sql? SELECT * FROM users WHERE id = ?
export const getOrderDetailsById = (req, res) => {
  const { order_id } = req.params;

  db.query(
    "SELECT * FROM order_details WHERE order_id = ?",
    [order_id],
    (err, results) => {
      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // cek id ada atau tidak
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Order Details tidak ditemukan" });
      }

      // jika tidak ada err
      res.json(results[0]);
    }
  );
};

// update data
export const updateOrderDetails = (req, res) => {
  const { order_id, product_id } = req.params;
  const { qty, price} = req.body;

  db.query(
    "UPDATE order_details SET qty = ?, price = ? WHERE order_id = ? AND product_id = ?",
    [qty, price, order_id, product_id],
    (err, results) => {

      // jika ada err
       if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "Order detail tidak ditemukan"
        });
      }
      // jika tidak ada err
      res.json({
        message: "Order Details berhasil diupdate",
      });
    }
);
};

// Delete data
export const deleteOrderDetails = (req, res) => {
  const { order_id, product_id } = req.params;

  db.query(
    "DELETE FROM order_details WHERE order_id = ? AND product_id = ?",
    [order_id, product_id],
    (err, results) => {
      
      // jika ada err
       if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "Order detail tidak ditemukan"
        });
      }

      // jika tidak ada err
      res.json({
        message: "Order Details berhasil dihapus",
      });
    }
  );
};
