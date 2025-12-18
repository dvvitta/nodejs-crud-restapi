import db from '../config/db.js';


// menampilkan data
export const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        // jika ada error
        if (err) {
            return res.status(500).json({ message: err});
        }

        // jika tidak ada error
        res.json(results);
    });
};

// insert data
export const saveUser = (req, res) => {
    const { name, email, password } = req.body;

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err, results) => {

        // jika ada err
        if (err) {
            return  res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.status(201).json({ 
            id: results.insertId,
            name: name,
            email: email,
         });    
        });
    }

//show data by id
//sql? SELECT * FROM users WHERE id = ?
export const getUserById = (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM users WHERE id_user = ?', [id], (err, results) => {
        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }
        
        // cek id ada atau tidak
        if (results.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // jika tidak ada err
        res.json(results[0]);
    });
};

//update data
//sql? UPDATE users SET name = ?, email = ?, password = ? WHERE id_user = ?
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    db.query('UPDATE users SET name = ?, email = ? WHERE id_user = ?', 
    [name, email, id], (err, result) => {
        
        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json({ message: "Data Berhasil Di Update" });
    });
};

//delete data
//sql? DELETE FROM users WHERE id_user = ?
export const deleteUser = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id_user = ?', [id], (err, result) => {

        // jika ada err
        if (err) {
            return res.status(500).json({ message: err });
        }

        // jika tidak ada err
        res.json({message: "Data Berhasil Di Hapus"});
    });
}