import db from "../config/db.js";  

// menampilkan data
export const getCategories = (req, res) => {
    db.query('SELECT * FROM product_categories', (err, results) => {

        // jika ada error
        if (err) {
            return res.status(500).json({message: err});
        }
        
        // jika tidak ada error
        res.json(results);
            
    });
};

// insert data
export const saveCategory = (req, res) => {
  const { category_id, category } = req.body;

  db.query("INSERT INTO product_categories (category_id, category) VALUES (?, ?)", [category_id, category], (err, results) => {

    // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

    // jika tidak ada err
      res.status(201).json({
        id: results.insertId,
        category_id: category_id,
        category: category,
      });
    }
  );
};

// show data by id
//sql? SELECT * FROM users WHERE id = ?
export const getCategoryById = (req, res) => {
    const {category_id} = req.params;

    db.query('SELECT * FROM product_categories WHERE category_id = ?', [category_id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({message: err});
        }

        // cek id ada atau tidak
        if (results.length === 0) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }

        // jika tidak ada err
        res.json(results[0]);
    });
};

// update data
export const updateCategory = (req, res) => {
    const { category_id} = req.params;
    const { category } = req.body;

    db.query("UPDATE product_categories SET category = ? WHERE category_id = ?",
 [category, category_id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json({ message: "Data Berhasil Di Update" });
    });
};

// delete data
export const deleteCategory = (req, res) => {
    const {category_id} = req.params;

    db.query('DELETE FROM product_categories WHERE category_id = ?', [category_id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({message: err});
        }

        // jika tidak ada err
        res.json({message: "Data Berhasil Di Hapus"});
    }); 
}

// show data by category_id
//sql = SELECT * FROM products WHERE category_id = ?
export const productByCategory = (req, res) => {
    db.query("SELECT * FROM products WHERE category_id = ?",
    [req.params.category_id], (err, results) => {

        // jika ada err
        if (err) {
            return  res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json(results);
    });
};
