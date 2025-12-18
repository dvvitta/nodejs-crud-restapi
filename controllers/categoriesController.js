import db from "../config/db.js";  

// menampilkan data
export const getCategories = (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {

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
  const { name } = req.body;

  db.query("INSERT INTO categories (name) VALUES (?)", [name], (err, results) => {

    // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

    // jika tidak ada err
      res.status(201).json({
        id: results.insertId,
        name: name
      });
    }
  );
};

// show data by id
//sql? SELECT * FROM users WHERE id = ?
export const getCategoryById = (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {

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
    const { id } = req.params;
    const { name } = req.body;

    db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err, results) => {

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
    const {id} = req.params;

    db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {

        // jika ada err
        if (err) {
            return res.status(500).json({message: err});
        }

        // jika tidak ada err
        res.json({message: "Data Berhasil Di Hapus"});
    }); 
}