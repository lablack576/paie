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
app.get("/collective", (req, res) => {
    db.all("SELECT * FROM collective", (error, rows) => {
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
    } = req.body;
    db.run(
        "UPDATE collective SET PRC = ?, Indice_panier = ?, Prime_caisse = ?, RET = ?, Indice_salaire_unique = ?,allocation_familial=?",
        [
            PRC,
            Indice_panier,
            Prime_caisse,
            RET,
            Indice_salaire_unique,
            allocation_familial,
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
    let sql = "SELECT * FROM employees";
    let params = [];

    if (searchTerm) {
        sql += " WHERE Nom LIKE ? OR Prenom LIKE ?";
        params = [`%${searchTerm}%`, `%${searchTerm}%`];
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

app.get("/employees/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM employees WHERE Matricule = ?", [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        } else if (!row) {
            res.status(404).send("Employee not found");
        } else {
            res.send(row);
        }
    });
});

app.put("/employees/:id", (req, res) => {
    const id = req.params.id;
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
    } = req.body;
    db.run(
        "UPDATE employees SET Avance=?,Date_naissance=?,Date_recrutement=?,Ech=?,IEP=?,IND_Transport=?,Indice_salaire_unique=?,NSS=?,Nom=?,PRI=?,Poste=?,Prenom=?,Pret=?,Prime_caisse=?,Prime_technicite=? WHERE Matricule = ?",
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
    } = req.body;

    const matricule = Math.floor(Math.random() * 1000000);

    db.run(
        "INSERT INTO employees (Matricule, Avance, Date_naissance, Date_recrutement, Ech, IEP, IND_Transport, Indice_salaire_unique, NSS, Nom, PRI, Poste, Prenom, Pret, Prime_caisse, Prime_technicite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    console.log("mensuel:", mensuelParam); // log the value of mensuel

    const formattedMensuel = Number(mensuelParam).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const query = `SELECT IRG FROM IRG WHERE Mensuel = "${formattedMensuel}"`;
    console.log("query:", query); // log the SQL query to the console

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        console.log(rows); // log the result to debug the issue
        res.status(200).json(rows);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
