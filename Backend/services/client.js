import { con } from '../db.js';

export const QueryClientById = (id) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM clients WHERE id = ?", [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryClientByCondition = (condition = '1=1') => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM clients WHERE ${condition}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryListOfClients = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM clients", (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryCreateClient = (client) => {
    const { full_name, email, password, address, phone } = client;
    return new Promise((resolve, reject) => {
        con.query(
            "INSERT INTO clients SET full_name = ?, email = ?, password = ?, address = ?, phone = ?",
            [full_name, email, password, address, phone],
            (err, result) => {
                if (err) {
                    console.log(err);
                    reject(new Error('An error occurred while creating the client'));
                } else {
                    console.log(result);
                    resolve(result);
                }
            }
        );
    });
};

export const QueryUpdateClient = (id, client) => {
    return new Promise((resolve, reject) => {
        con.query("UPDATE clients SET ? WHERE id = ?", [client, id], (err, result) => {
            if (err) {
                reject(new Error('Error updating client: ' + err.message));
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryDeleteClient = (id) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM clients WHERE id = ?", [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};
