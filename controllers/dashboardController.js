import db from "../config/db.js";

// 1. Produk yang paling banyak dibeli beserta jumlahnya pada tahun sebelumnya
export const getTopProductsPreviousYear = (req, res) => {
  const sql = `
    SELECT
        p.product_id,
        p.product_name,
        t.total_terjual
    FROM products p
    JOIN (
        SELECT
            od.product_id,
            SUM(od.qty) AS total_terjual
        FROM order_details od
        JOIN orders o ON od.order_id = o.order_id
        WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
        GROUP BY od.product_id
    ) t ON p.product_id = t.product_id
    ORDER BY t.total_terjual DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal mengambil data produk terlaris tahun sebelumnya",
        error: err
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil data produk terlaris tahun sebelumnya",
      data: results
    });
  });
};

// 2. Siapa aja yang paling banyak melakukan order beserta jumlahnya pada tahun sebelumnya
export const getTopCustomersPreviousYear = (req, res) => {
  const sql = `
    SELECT
        c.CUST_ID,
        c.cust_name,
        t.total_order
    FROM customers c
    JOIN (
        SELECT
            o.CUST_ID,
            COUNT(o.ORDER_ID) AS total_order
        FROM orders o
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY o.CUST_ID
    ) t ON c.CUST_ID = t.CUST_ID
    ORDER BY t.total_order DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data customer teraktif tahun sebelumnya",
        error: err
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data customer teraktif tahun sebelumnya",
      data: results
    });
  });
};

// 3. Siapa saja yang paling besar nilai ordernya beserta nominalnya pada tahun sebelumnya
export const getTopCustomersByOrderValuePreviousYear = (req, res) => {
  const sql = `
    SELECT
        c.CUST_ID,
        c.cust_name,
        t.total_belanja
    FROM customers c
    JOIN (
        SELECT
            o.CUST_ID,
            SUM(o.TOTAL) AS total_belanja
        FROM orders o
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY o.CUST_ID
    ) t ON c.CUST_ID = t.CUST_ID
    ORDER BY t.total_belanja DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data customer dengan nilai order terbesar",
        error: err
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data customer dengan nilai order terbesar tahun sebelumnya",
      data: results
    });
  });
};

// 4. Siapa aja yang jumlah item produk ordernya paling banyak beserta jumlahnya pada tahun sebelumnya
export const getTopCustomersByItemPreviousYear = (req, res) => {
  const sql = `
    SELECT
        c.CUST_ID,
        c.cust_name,
        t.total_item
    FROM customers c
    JOIN (
        SELECT
            o.CUST_ID,
            SUM(od.qty) AS total_item
        FROM orders o
        JOIN order_details od ON o.ORDER_ID = od.order_id
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY o.CUST_ID
    ) t ON c.CUST_ID = t.CUST_ID
    ORDER BY t.total_item DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data customer dengan item terbanyak",
        error: err
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data customer dengan item terbanyak tahun sebelumnya",
      data: results
    });
  });
};

// 5. 10 produk terlaris beserta jumlahnya pada tahun sebelumnya
export const getTop10ProductsPreviousYear = (req, res) => {
  const sql = `
    SELECT
        p.product_id,
        p.product_name,
        t.total_terjual
    FROM products p
    JOIN (
        SELECT
            od.product_id,
            SUM(od.qty) AS total_terjual
        FROM order_details od
        JOIN orders o ON od.order_id = o.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.product_id
    ) t ON p.product_id = t.product_id
    ORDER BY t.total_terjual DESC
    LIMIT 10
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data 10 produk terlaris tahun sebelumnya",
        error: err
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data 10 produk terlaris tahun sebelumnya",
      data: results
    });
  });
};

// 6. 