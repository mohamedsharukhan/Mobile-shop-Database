const mysql_pool = require("../mysqlPool/mysqlPool").mysql_pool;
const jwt = require('jsonwebtoken');

exports.getCategory = (req, res) => {
  let str = "select * from category";
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          // console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};

exports.getBrands = (req, res) => {
  let categoryId = req.query.categoryId;
  // console.log(categoryId);
  let str = `select * from brands where category_id=${categoryId}`;
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          // console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};

exports.getList = (req, res) => {
  let brandName = req.query.brand_name;
  // console.log(brandName);
  let str = `select * from product_list where brand_name='${brandName}' `;
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          // console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};

exports.getDetails = (req, res) => {
  let listId  = req.query.list_id;
  console.log(listId);
  let str = `select * from product_list where list_id=${listId}`;
  mysql_pool.getConnection((err, con) => {
    if (err) {
      console.log(chsyu);
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          // console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};

exports.postDetails = (req, res) => {
  console.log(req.filePath);
  let img=req.filePath
  console.log(img);
  let str = `INSERT INTO product_list(brand_name,title,ram,rating,price,color,description,img) VALUES ('${req.body.brand_name}','${req.body.title}','${req.body.ram}','${req.body.rating}',${req.body.price},'${req.body.color}','${req.body.description}','[${img}]')`;
console.log(str);
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};

exports.postSinginDetails = (req, res) => {
  
  console.log(req.body);
  const {email,password,remember}=req.body
  let str = `INSERT INTO signin( email, password, remember) VALUES ('${email}','${password}','${remember}')`;
console.log(str);
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          console.log(results);
          const payload = {
            email: email,
            password: password,
            // exp: Math.floor(Date.now() / 1000) + (60 * 60)
          };
          const secret = 'hfhsiuheaiuhvure';
          const token = jwt.sign(payload, secret, { expiresIn: '1h' });
          
          console.log(token);
           const decoded = jwt.verify(token, secret);
          
          console.log(decoded);
          // res.send(results);
          res.send(token);
        }
      });
    }
  });
};

exports.getSingupDetails = (req, res) => { 
  let str = `select * from signup`;
console.log(str);
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          console.log(results);
          res.send(results);

        }
      });
    }
  });
};

exports.postSingupDetails = (req, res) => {
  
  console.log(req.body);
  const {fullName,email,password,repeatPassword,phoneNumber,remember}=req.body
  let str = `INSERT INTO signup( full_name,email, password,phone_number,remember) VALUES ('${fullName}','${email}','${password}','${phoneNumber}','${remember}')`;
console.log(str);
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          console.log(results);
          // res.status(200).json(results)
          res.send(results);
        }
      });
    }
  });
};


// exports.postOrderDetails = (req, res) => {
//   const order_item=JSON.stringify(req.body.order_item)
//   console.log(order_item);
//   const {email, full_name, state, city, address, mobile_number, pincode, card_number, expiry_date, cvv,}=req.body
//   let str = `INSERT INTO order_detaitls( email, full_name, state, city, address, mobile_number, pincode, card_number, expiry_date, cvv, order_item)  VALUES ('${email}, ${full_name},${ state},${ city}, ${address}, ${mobile_number}, ${pincode},${ card_number},${ expiry_date}, ${cvv}, ${order_item})`;
// // console.log(str);
//   mysql_pool.getConnection((err, con) => {
//     if (err) {
//       err.sendErrorObj(
//         res,
//         err.con_err,
//         "got error in connection pool in samplePost: " + err
//       );
//     } else {
//       con.query(str, (err, results, fields) => {
//         con.release(); //release the connection to the pool immediately
//         if (err) {
//           err.sendErrorObj(
//             res,
//             err.query_err,
//             "got error in executing query in samplePost: " + err
//           );
//         } else {
//           console.log(results);
//           // res.status(200).json(results)
//           res.send(results);
//         }
//       });
//     }
//   });
// }

exports.postOrderDetails = (req, res) => {
  const order_item = JSON.stringify(req.body.order_item);
  console.log(order_item);
  const { email, full_name, state, city, address, mobile_number, pincode, card_number, expiry_date, cvv,tota_price,total_quantity } = req.body;

  let str = `INSERT INTO order_detaitls( email, full_name, state, city, address, mobile_number, pincode, card_number, expiry_date, cvv, order_item,	tota_price,total_quantity)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

  mysql_pool.getConnection((err, con) => {
    if (err) {
      console.error("Connection error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      con.query(
        str,
        [
          email,
          full_name,
          state,
          city,
          address,
          mobile_number,
          pincode,
          card_number,
          expiry_date,
          cvv,
          order_item,
          tota_price,
          total_quantity
        ],
        (err, results, fields) => {
          con.release(); // release the connection to the pool immediately
          if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log(results);
            res.send(results);
          }
        }
      );
    }
  });
};

exports.getOrderDetails= (req, res) => { 
  let str = `select * from order_detaitls`;
console.log(str);
  mysql_pool.getConnection((err, con) => {
    if (err) {
      err.sendErrorObj(
        res,
        err.con_err,
        "got error in connection pool in samplePost: " + err
      );
    } else {
      con.query(str, (err, results, fields) => {
        con.release(); //release the connection to the pool immediately
        if (err) {
          err.sendErrorObj(
            res,
            err.query_err,
            "got error in executing query in samplePost: " + err
          );
        } else {
          console.log(results);
          res.send(results);

        }
      });
    }
  });
};



