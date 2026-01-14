import db from "../config/db.js";

// menampilkan data
export const getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    // jika ada error
    if (err) {
      return res.status(500).json({ message: err });
    }

    // jika tidak ada error
    res.json(results);
  });
};

// insert data
export const saveCustomers = (req, res) => {
  const {
    cust_id,
    cust_name,
    address,
    place_of_birth,
    date_of_birth,
    contact_number,
    email,
    gender_id,
  } = req.body;

  db.query(
    "INSERT INTO customers (cust_id, cust_name, address, place_of_birth, date_of_birth, contact_number, email, gender_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      cust_id,
      cust_name,
      address,
      place_of_birth,
      date_of_birth,
      contact_number,
      email,
      gender_id,
    ],
    (err, results) => {
      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // jika tidak ada err
      res.status(201).json({
        id: results.insertId,
        cust_id: cust_id,
        cust_name: cust_name,
        address: address,
        place_of_birth: place_of_birth,
        date_of_birth: date_of_birth,
        contact_number: contact_number,
        email: email,
        gender_id: gender_id,
      });
    }
  );
};

//show data by id
//sql? SELECT * FROM customers WHERE cust_id = ?
export const getCustomerById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM customers WHERE cust_id = ?",
    [id],
    (err, results) => {
      // jika ada err
      if (err) {
        return res.status(500).json({ message: err });
      }

      // cek id ada atau tidak
      if (results.length === 0) {
        return res.status(404).json({ message: "Customer tidak ditemukan" });
      }

      // jika tidak ada err
      res.json(results[0]);
    }
  );
};

//update data
//sql? UPDATE users SET name = ?, email = ?, password = ? WHERE id_user = ?
export const updateCustomers = (req, res) => {
  const { cust_id } = req.params;
  const {
    cust_name,
    address,
    place_of_birth,
    contact_number,
    email,
    gender_id,
  } = req.body;

  const sql = `
        UPDATE customers
        SET
            CUST_NAME = ?,
            ADDRESS = ?,
            PLACE_OF_BIRTH = ?,
            CONTACT_NUMBER = ?,
            EMAIL = ?,
            GENDER_ID = ?,
            UPDATED_AT = NOW()
        WHERE CUST_ID = ?
    `;

  db.query(
    sql,
    [
      cust_name,
      address,
      place_of_birth,
      contact_number,
      email,
      gender_id,
      cust_id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Customer tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Data customer berhasil diupdate",
      });
    }
  );
};

//delete data
//sql? DELETE FROM users WHERE id_user = ?
export const deleteCustomers = (req, res) => {
  const { cust_id } = req.params;

  db.query(
    "DELETE FROM customers WHERE CUST_ID = ?",
    [cust_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // cek apakah data benar-benar terhapus
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Customer tidak ditemukan"
        });
      }

      res.status(200).json({
        message: "Data customer berhasil dihapus"
      });
    }
  );
};

