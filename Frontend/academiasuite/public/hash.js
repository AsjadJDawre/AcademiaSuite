const bcrypt = require('bcrypt');
const password = "12345";
const saltRounds = 1;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) {
      console.log("hasing error");
    } else {
      console.log(hash);
    }
  })

const hashPassword = "$2b$10$N2gD2H1MdUbP53AIOm8mYu1zm.fuUg0V5ca5q0OjhthbYHJY.4hb2";