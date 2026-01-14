import db from "../config/db.js";

// Menampilkan data
export const getOrders = (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    // jika ada error
    if (err) {
      return res.status(500).json({ message: err });
    }

    // jika tidak ada error
    res.json(results);
  });
};

// Insert data
export const saveOrder = (req, res) => {
  const {
    cust_id,
    user_id,
    total,
    method_id,
    bank_trans,
    receipt_number,
  } = req.body;
  db.query(
    "INSERT INTO orders (order_date, cust_id, user_id, total, method_id, bank_trans, receipt_number) VALUES (NOW(), ?, ?, ?, ?, ?, ?)",
    [
      cust_id,
      user_id,
      total,
      method_id,
      bank_trans,
      receipt_number,
    ],
    (err, results) => {

      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // jika tidak ada err
      res.status(201).json({
        order_id: results.insertId,
        cust_id: cust_id,
        user_id: user_id,
        total: total,
        method_id: method_id,
        bank_trans: bank_trans,
        receipt_number: receipt_number,
      });
    }
  );
};

// Show data by id
export const getOrderById = (req, res) => {
  const { order_id } = req.params;

  db.query(
    "SELECT * FROM orders WHERE order_id = ?",
    [order_id],
    (err, results) => {

      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // cek id ada atau tidak
      if (results.length === 0) {
        return res.status(404).json({ message: "Order tidak ditemukan" });
      }

      // jika tidak ada err
      res.json(results[0]);
    }
  );
};

// Update data
export const updateOrder = (req, res) => {
  const { order_id } = req.params;
  const {
    cust_id,
    user_id,
    total,
    method_id,
    bank_trans,
    receipt_number,
  } = req.body;

  db.query(
    "UPDATE orders SET cust_id = ?, user_id = ?, total = ?, method_id = ?, bank_trans = ?, receipt_number = ? WHERE order_id = ?",
    [
      cust_id,
      user_id,
      total,
      method_id,
      bank_trans,
      receipt_number,
      order_id,
    ],
    (err, results) => {

      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // jika tidak ada err
      res.json({
        message: "Order berhasil diupdate",
      });
    }
  );
};

// Delete data
export const deleteOrder = (req, res) => {
  const { order_id } = req.params;

  db.query(
    "DELETE FROM orders WHERE order_id = ?",
    [order_id],
    (err, results) => {

      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // jika tidak ada err
      res.json({ message: "Order berhasil dihapus" });
    }
  );
};
