const crypto = require("crypto");

// Generate a random 256-bit secret key (32 bytes) encoded in hexadecimal
const secret = crypto.randomBytes(32).toString("hex");

console.log("JWT Secret Key:", secret);
