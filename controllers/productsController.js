import db from '../config/db.js';

// menampilkan data
export const getProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {

        // jika ada error
        if (err) {
            return res.status(500).json({message: err});
        }
        
        // jika tidak ada error
        res.json(results);
            
    });
};

// insert data
export const saveProducts = (req, res) => {
  const { name, price, category_id } = req.body;
  
  db.query("INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)", [name, price, category_id], (err, results) => {

    // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

    // jika tidak ada err
      res.status(201).json({
        id: results.insertId,
        name: name,
        price: price,
        category_id: category_id
      });
    }
  );
};

// show data by id
//sql? SELECT * FROM products WHERE id = ?
export const getProductsById = (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({message: err});
        }

        // cek id ada atau tidak
        if (results.length === 0) {
            return res.status(404).json({ message: "Product tidak ditemukan" });
        }

        // jika tidak ada err
        res.json(results[0]);
    });
};

// update data
export const updateProducts = (req, res) => {
    const { id } = req.params;
    const { name, price, category_id } = req.body;

    db.query("UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?", [name, price, category_id, id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json({"message": "Data Berhasil Diupdate"});    
    });
};

// delete data
export const deleteProducts = (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json({ message: "Data Berhasil Di Hapus" });
    });
};