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

// Execute SELECT statement
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json(rows);
        }
    });
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
    const { PRC, Indice_panier, Prime_caisse, RET, Indice_salaire_unique } =
        req.body;
    db.run(
        "UPDATE collective SET PRC = ?, Indice_panier = ?, Prime_caisse = ?, RET = ?, Indice_salaire_unique = ?",
        [PRC, Indice_panier, Prime_caisse, RET, Indice_salaire_unique],
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
