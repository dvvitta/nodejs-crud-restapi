import db from "../config/db.js";

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = (req, res) => {
  db.query(
    `SELECT 
        product_id,
        product_name,
        price,
        stock,
        image_url,
        description
     FROM products`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
};

/* =========================
   INSERT PRODUCT + IMAGE
========================= */
export const saveProducts = (req, res) => {
  const {
    product_name,
    price,
    category_id,
    stock,
    description,
    created_by
  } = req.body;

  if (!product_name || price == null || !category_id || stock == null) {
    return res.status(400).json({
      message: "product_name, price, category_id, dan stock wajib diisi"
    });
  }

  // ambil URL gambar
  const imageUrl = req.file
    ? `/uploads/products/${req.file.filename}`
    : null;

  const sql = `
    INSERT INTO products
    (
      product_name,
      price,
      category_id,
      stock,
      image_url,
      description,
      created_at,
      updated_at,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)
  `;

  db.query(
    sql,
    [
      product_name,
      price,
      category_id,
      stock,
      imageUrl,
      description ?? null,
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
        image_url: imageUrl
      });
    }
  );
};

/* =========================
   GET PRODUCT BY ID
========================= */
export const getProductsById = (req, res) => {
  const { product_id } = req.params;

  const sql = `
    SELECT 
      p.product_id,
      p.product_name,
      p.price,
      p.stock,
      p.image_url,
      p.description,
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

    res.json(results[0]);
  });
};

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProducts = (req, res) => {
  const { product_id } = req.params;
  const {
    product_name,
    price,
    category_id,
    stock,
    description,
    updated_by
  } = req.body;

  if (!product_name || price == null || !category_id || stock == null) {
    return res.status(400).json({
      message: "product_name, price, category_id, dan stock wajib diisi"
    });
  }

  const imageUrl = req.file
    ? `/uploads/products/${req.file.filename}`
    : null;

  const sql = `
    UPDATE products
    SET
      product_name = ?,
      price = ?,
      category_id = ?,
      stock = ?,
      description = ?,
      image_url = COALESCE(?, image_url),
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
      description ?? null,
      imageUrl,
      updated_by ?? null,
      product_id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // ✅ TIDAK PERLU CEK affectedRows
      res.json({ message: "Produk berhasil diupdate" });
    }
  );
};


/* =========================
   DELETE PRODUCT
========================= */
export const deleteProducts = (req, res) => {
  const { product_id } = req.params;

  db.query(
    "DELETE FROM products WHERE product_id = ?",
    [product_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Produk tidak ditemukan"
        });
      }

      res.json({ message: "Produk berhasil dihapus" });
    }
  );
};
