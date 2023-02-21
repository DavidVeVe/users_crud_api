const bcrypt = require("bcryptjs");

async function verifyPsswd() {
  const myPassword = "admin 123 .123";
  const hash = "$2a$10$lZH.r0faH./6Cd92l2.XleQVacCHjJnAE7Or3PYpCyB1xtLVpdZVa";
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPsswd();
