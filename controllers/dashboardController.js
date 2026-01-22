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
    LIMIT 5
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
    LIMIT 5
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
    LIMIT 5
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
    LIMIT 5
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

//6 tampilan profit penjualan bulanan di tahun sebelumnya untuk setiap produk
export const getMonthlySalesPreviousYearPerProduct = (req, res) => {
  const sql = `
    SELECT 
      p.product_name,
      SUM(CASE WHEN MONTH(o.order_date) = 1  THEN od.qty * od.price ELSE 0 END) AS January,
      SUM(CASE WHEN MONTH(o.order_date) = 2  THEN od.qty * od.price ELSE 0 END) AS February,
      SUM(CASE WHEN MONTH(o.order_date) = 3  THEN od.qty * od.price ELSE 0 END) AS March,
      SUM(CASE WHEN MONTH(o.order_date) = 4  THEN od.qty * od.price ELSE 0 END) AS April,
      SUM(CASE WHEN MONTH(o.order_date) = 5  THEN od.qty * od.price ELSE 0 END) AS May,
      SUM(CASE WHEN MONTH(o.order_date) = 6  THEN od.qty * od.price ELSE 0 END) AS June,
      SUM(CASE WHEN MONTH(o.order_date) = 7  THEN od.qty * od.price ELSE 0 END) AS July,
      SUM(CASE WHEN MONTH(o.order_date) = 8  THEN od.qty * od.price ELSE 0 END) AS August,
      SUM(CASE WHEN MONTH(o.order_date) = 9  THEN od.qty * od.price ELSE 0 END) AS September,
      SUM(CASE WHEN MONTH(o.order_date) = 10 THEN od.qty * od.price ELSE 0 END) AS October,
      SUM(CASE WHEN MONTH(o.order_date) = 11 THEN od.qty * od.price ELSE 0 END) AS November,
      SUM(CASE WHEN MONTH(o.order_date) = 12 THEN od.qty * od.price ELSE 0 END) AS December
    FROM order_details od
    JOIN orders o   ON od.order_id = o.order_id
    JOIN products p ON od.product_id = p.product_id
    WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
    GROUP BY p.product_name
    ORDER BY p.product_name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};


// 7. Menampilkan jumlah penjualan pada tahun sebelumnya untuk setiap produk
export const getMonthlyProductSalesQtyPreviousYear = (req, res) => {
  const sql = `
    SELECT 
      p.product_name,
      SUM(CASE WHEN MONTH(o.order_date) = 1  THEN od.qty ELSE 0 END) AS Januari,
      SUM(CASE WHEN MONTH(o.order_date) = 2  THEN od.qty ELSE 0 END) AS Februari,
      SUM(CASE WHEN MONTH(o.order_date) = 3  THEN od.qty ELSE 0 END) AS Maret,
      SUM(CASE WHEN MONTH(o.order_date) = 4  THEN od.qty ELSE 0 END) AS April,
      SUM(CASE WHEN MONTH(o.order_date) = 5  THEN od.qty ELSE 0 END) AS Mei,
      SUM(CASE WHEN MONTH(o.order_date) = 6  THEN od.qty ELSE 0 END) AS Juni,
      SUM(CASE WHEN MONTH(o.order_date) = 7  THEN od.qty ELSE 0 END) AS Juli,
      SUM(CASE WHEN MONTH(o.order_date) = 8  THEN od.qty ELSE 0 END) AS Agustus,
      SUM(CASE WHEN MONTH(o.order_date) = 9  THEN od.qty ELSE 0 END) AS September,
      SUM(CASE WHEN MONTH(o.order_date) = 10 THEN od.qty ELSE 0 END) AS Oktober,
      SUM(CASE WHEN MONTH(o.order_date) = 11 THEN od.qty ELSE 0 END) AS November,
      SUM(CASE WHEN MONTH(o.order_date) = 12 THEN od.qty ELSE 0 END) AS Desember
    FROM order_details od
    JOIN orders o   ON od.order_id = o.order_id
    JOIN products p ON od.product_id = p.product_id
    WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
    GROUP BY p.product_name
    ORDER BY p.product_name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};

// 8. Jumlah order bulanan di tahun sebelumnya untuk setiap customer
export const getMonthlyOrdersPerCustomerPreviousYear = (req, res) => {
  const sql = `
    SELECT
        c.cust_name,
        t.bulan,
        t.jumlah_order
    FROM customers c
    JOIN (
        SELECT
            o.cust_id,
            MONTH(o.order_date) AS bulan_angka,
            MONTHNAME(o.order_date) AS bulan,
            COUNT(o.order_id) AS jumlah_order
        FROM orders o
        WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
        GROUP BY o.cust_id, MONTH(o.order_date)
    ) t ON c.cust_id = t.cust_id
    ORDER BY c.cust_name, t.bulan_angka
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};



// 9. Total nominal order bulanan di tahun sebelumnya untuk setiap customer
export const getMonthlyOrderNominalPerCustomerPreviousYear = (req, res) => {
  const sql = `
    SELECT
        c.cust_name,
        t.bulan,
        t.total_nominal
    FROM customers c
    JOIN (
        SELECT
            o.cust_id,
            MONTH(o.order_date) AS bulan_angka,
            MONTHNAME(o.order_date) AS bulan,
            SUM(od.qty * od.price) AS total_nominal
        FROM orders o
        JOIN order_details od ON o.order_id = od.order_id
        WHERE YEAR(o.order_date) = YEAR(CURDATE()) - 1
        GROUP BY o.cust_id, MONTH(o.order_date)
    ) t ON c.cust_id = t.cust_id
    ORDER BY c.cust_name, t.bulan_angka
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil total nominal order bulanan per customer",
        error: err.message
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil total nominal order bulanan per customer",
      data: results
    });
  });
};


// 10. Jumlah layanan bulanan di tahun sebelumnya
export const getMonthlyServicesPreviousYear = (req, res) => {
  const sql = `
    SELECT
        t.bulan,
        t.jumlah_layanan
    FROM (
        SELECT
            MONTH(o.ORDER_DATE) AS bulan_angka,
            MONTHNAME(o.ORDER_DATE) AS bulan,
            SUM(od.QTY) AS jumlah_layanan
        FROM orders o
        JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY MONTH(o.ORDER_DATE)
    ) t
    ORDER BY t.bulan_angka
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};

