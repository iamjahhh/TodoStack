const { createAccount, getUserByUsername } = require("../database/database.js");

async function performRegister(req, res) {
    const { username, password, passwordVerify } = req.body;

    if (await getUserByUsername(username)) 
        return res.status(404).json({ message: "Username already exists, think for a new one?" });

    if (username.length < 3 || username.length > 15)
        return res.status(404).json({ message: "Username must be between 3 and 15 characters." });

    if (!/^[a-zA-Z0-9_]+$/.test(username))
        return res.status(404).json({ message: "Username can only contain letters, numbers, and underscores." });

    if (password.length < 8 || password.length > 15)
        return res.status(404).json({ message: "Password must be between 3 and 15 characters." });

    if (/\s/.test(password))
        return res.status(404).json({ message: "Password cannot contain spaces." });

    if (password != passwordVerify)
        return res.status(404).json({ message: "Passwords do not match." });

    await createAccount(username, password, "")
    .then(result => {
        res.cookie("user", username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Cookie expires  in 1 day
        res.status(200).json({ message: username });
    })
    .catch(error => {
        res.status(200).json({ message: `Error creating account: ${error}` });
    });
}

module.exports = { performRegister };
