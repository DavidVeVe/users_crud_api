const bcrypt = require("bcryptjs");

async function hashPsswd() {
  const myPassword = "admin 123 .123";
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPsswd();
