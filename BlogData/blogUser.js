const bycript = require("bcryptjs");
const Users = [
   {name: "Paritosh Kashyap", email : "paritoshkashyap25@gmail.com", password : bycript.hashSync("pkblog25@", 10), isUserAdmin : true },
   {name: "Mukesh Kashyap", email : "mk13@gmail.com", password : bycript.hashSync("mkblog13@", 10)},
   {name: "Dolly Kashyap", email : "dk24@gmail.com", password : bycript.hashSync("dkblog24@", 10)}
]

module.exports = Users