import db from "../config/db.js";

// menampilkan data
export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    
    // jika ada error
    if (err) {
      return res.status(500).json({ message: err });
    }

    // jika tidak ada error
    res.json(results);
  });
};

// insert data
export const saveProducts = (req, res) => {
  const {
    product_name,
    price,
    category_id,
    stock,
    created_by
  } = req.body;

  // validasi WAJIB
  if (!product_name || price == null || !category_id || stock == null) {
    return res.status(400).json({
      message: "product_name, price, category_id, dan stock wajib diisi"
    });
  }

  const sql = `
    INSERT INTO products
    (product_name, price, category_id, stock, created_at, updated_at, created_by, updated_by)
    VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)
  `;

  db.query(
    sql,
    [
      product_name,
      price,
      category_id,
      stock,
      created_by ?? null,
      created_by ?? null
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({
        message: "Produk berhasil ditambahkan",
        product_id: results.insertId,
        product_name,
        price,
        category_id,
        stock
      });
    }
  );
};


// show data by id
//sql? SELECT * FROM products WHERE id = ?
export const getProductsById = (req, res) => {
  const { product_id } = req.params;

  const sql = `
    SELECT 
      p.product_id,
      p.product_name,
      p.price,
      p.stock,
      c.category
    FROM products p
    LEFT JOIN product_categories c 
      ON p.category_id = c.category_id
    WHERE p.product_id = ?
  `;

  db.query(sql, [product_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(results[0]);
  });
};

// update data
export const updateProducts = (req, res) => {
  const { product_id } = req.params;
  const { product_name, price, category_id, stock, updated_by } = req.body;

  // validasi minimal
  if (!product_name || price == null || !category_id || stock == null) {
    return res.status(400).json({
      message: "product_name, price, category_id, dan stock wajib diisi"
    });
  }

  const sql = `
    UPDATE products
    SET
      product_name = ?,
      price = ?,
      category_id = ?,
      stock = ?,
      updated_at = NOW(),
      updated_by = ?
    WHERE product_id = ?
  `;

  db.query(
    sql,
    [
      product_name,
      price,
      category_id,
      stock,
      updated_by ?? null,
      product_id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Produk tidak ditemukan"
        });
      }

      res.status(200).json({
        message: "Produk berhasil diupdate"
      });
    }
  );
};


// delete data
export const deleteProducts = (req, res) => {
  const { product_id } = req.params;

  db.query(
    "DELETE FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // cek apakah data benar-benar terhapus
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Produk tidak ditemukan"
        });
      }

      res.status(200).json({
        message: "Produk berhasil dihapus"
      });
    }
  );
};

