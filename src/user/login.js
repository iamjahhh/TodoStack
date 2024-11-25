const { getUserByUsername } = require("../database/database.js");
const bcrypt = require("bcrypt");

async function performLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await getUserByUsername(username);

    if (!await getUserByUsername(username)) {
      return res.status(404).json({ message: "Username does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.cookie("user", user.username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Cookie expires in 1 day
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}

function checkLogin(req, res) {
  const username = req.cookies.user;
  if (username) {
    return res.status(200).json({ message: username });
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }
}

module.exports = { performLogin, checkLogin };