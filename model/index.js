const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross-origin requests
app.use(cors());

// Open database connection
const db = new sqlite3.Database("mydatabase.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the mydatabase database.");
    }
});

// Retrieve collective data
app.get("/collective/:id", (req, res) => {
    const id = req.params.id;
    db.all("SELECT * FROM collective where id=?", [id], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).json(rows);
        }
    });
});

// Update collective data
app.put("/collective", (req, res) => {
    const {
        PRC,
        Indice_panier,
        Prime_caisse,
        RET,
        Indice_salaire_unique,
        allocation_familial,
        id,
    } = req.body;
    db.run(
        "UPDATE collective SET PRC = ?, Indice_panier = ?, Prime_caisse = ?, RET = ?, Indice_salaire_unique = ?,allocation_familial=? WHERE id=?",
        [
            PRC,
            Indice_panier,
            Prime_caisse,
            RET,
            Indice_salaire_unique,
            allocation_familial,
            id,
        ],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            } else {
                res.status(200).send("Successfully updated collective data");
            }
        }
    );
});

app.get("/employees", (req, res) => {
    const searchTerm = req.query.search;
    const id = req.query.id;
    let sql = "SELECT * FROM employees WHERE id=?";
    let params = [id];

    if (searchTerm) {
        sql += " AND (Nom LIKE ? OR Prenom LIKE ?)";
        params = [id, `%${searchTerm}%`, `%${searchTerm}%`];
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        } else {
            res.send(rows);
        }
    });
});

app.get("/employees/:id/:uid", (req, res) => {
    const idlink = req.params.id;
    const id = req.params.uid;
    db.get(
        "SELECT * FROM employees WHERE Matricule = ? AND id = ?",
        [idlink, id],
        (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Internal server error");
            } else if (!row) {
                res.status(404).send("Employee not found");
            } else {
                res.send(row);
            }
        }
    );
});

app.put("/employees/:id", (req, res) => {
    const idlink = req.params.id;
    const {
        Avance,
        Date_naissance,
        Date_recrutement,
        Ech,
        IEP,
        IND_Transport,
        Indice_salaire_unique,
        NSS,
        Nom,
        PRI,
        Poste,
        Prenom,
        Pret,
        Prime_caisse,
        Prime_technicite,
        allocation_familial,
        id,
    } = req.body;
    db.run(
        "UPDATE employees SET Avance=?,Date_naissance=?,Date_recrutement=?,Ech=?,IEP=?,IND_Transport=?,Indice_salaire_unique=?,NSS=?,Nom=?,PRI=?,Poste=?,Prenom=?,Pret=?,Prime_caisse=?,Prime_technicite=?,allocation_familial=? WHERE Matricule = ? AND id = ?",
        [
            Avance,
            Date_naissance,
            Date_recrutement,
            Ech,
            IEP,
            IND_Transport,
            Indice_salaire_unique,
            NSS,
            Nom,
            PRI,
            Poste,
            Prenom,
            Pret,
            Prime_caisse,
            Prime_technicite,
            allocation_familial,
            idlink,
            id,
        ],
        (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Internal server error");
            } else {
                res.send("Employee updated successfully");
            }
        }
    );
});

app.post("/employees/add", (req, res) => {
    const {
        Avance,
        Date_naissance,
        Date_recrutement,
        Ech,
        IEP,
        IND_Transport,
        Indice_salaire_unique,
        NSS,
        Nom,
        PRI,
        Poste,
        Prenom,
        Pret,
        Prime_caisse,
        Prime_technicite,
        allocation_familial,
        id,
    } = req.body;

    const matricule = Math.floor(Math.random() * 1000000);

    db.run(
        "INSERT INTO employees (Matricule, Avance, Date_naissance, Date_recrutement, Ech, IEP, IND_Transport, Indice_salaire_unique, NSS, Nom, PRI, Poste, Prenom, Pret, Prime_caisse, Prime_technicite,allocation_familial, id) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            matricule,
            Avance,
            Date_naissance,
            Date_recrutement,
            Ech,
            IEP,
            IND_Transport,
            Indice_salaire_unique,
            NSS,
            Nom,
            PRI,
            Poste,
            Prenom,
            Pret,
            Prime_caisse,
            Prime_technicite,
            allocation_familial,
            id,
        ],
        (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Internal server error");
            } else {
                res.send("Employee created successfully");
            }
        }
    );
});

app.delete("/employeesDelete/:id/:uid", (req, res) => {
    const id = req.params.uid;
    const idlink = req.params.id;
    // Run a SQL DELETE statement to remove the employee with the given Matricule ID
    db.run(
        "DELETE FROM employees WHERE Matricule = ? AND id = ?",
        [idlink, id],
        (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Internal server error");
            } else {
                res.status(204).send(); // Return a "No Content" response on successful deletion
            }
        }
    );
});

app.get("/salaire/:poste/:ech", (req, res) => {
    const { poste, ech } = req.params;

    db.all(
        `SELECT Cat, Sec FROM nomenclature WHERE Poste = ? LIMIT 1`,
        [poste],
        (error, rows) => {
            if (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
                return;
            }

            const cats = rows.map((row) => row.Cat).join(",");
            const secs = rows.map((row) => row.Sec).join(",");

            db.get(
                `SELECT Ind FROM grille_de_salaire WHERE Ech = ? AND Cat IN (${cats}) AND Sec IN (${secs})`,
                [ech],
                (error, row) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send("Internal Server Error");
                    } else {
                        res.status(200).json(row);
                    }
                }
            );
        }
    );
});

app.get("/irg/:mensuelParam", (req, res) => {
    const { mensuelParam } = req.params;

    const formattedMensuel = Number(mensuelParam).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const query = `SELECT IRG FROM IRG WHERE Mensuel = "${formattedMensuel}"`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        res.status(200).json(rows);
    });
});

app.post("/users", async (req, res) => {
    const { username, password } = req.body;
    const id = Math.floor(Math.random() * 1000);
    const query = `INSERT INTO users (id, username, password) VALUES (?,?,?)`;
    const query2 =
        "INSERT INTO collective (PRC, Indice_panier, Prime_caisse, RET , Indice_salaire_unique, allocation_familial, id) VALUES (10,22,0,400,1000,1000,?)";

    try {
        await db.run("BEGIN");
        await db.run(query, [id, username, password]);
        await db.run(query2, [id]);
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        await db.run("COMMIT");

        res.status(200).json({ id: id, username: username });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/users/login", async (req, res) => {
    const { username, password } = req.query;

    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

    db.all(query, [username, password], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        res.status(200).json(rows);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
