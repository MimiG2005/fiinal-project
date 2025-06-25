import { con } from '../db.js';

export const QueryListOfServiceTypes = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM service_types", (err, result) => {
            if (err) return reject(err);
            console.log(result);
            resolve(result);
        });
    });
};

export const QueryServiceTypeById = (id) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM service_types WHERE id = ?", [id], (err, result) => {
            if (err) return reject(err);
            console.log(result);
            resolve(result);
        });
    });
};

export const QueryCreateServiceType = ({ name }) => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO service_types (name) VALUES (?)", [name], (err, result) => {
            if (err) {
                console.error(err);
                return reject(new Error('Failed to create service type'));
            }
            console.log(result);
            resolve(result);
        });
    });
};

export const QueryUpdateServiceType = (id, { name }) => {
    return new Promise((resolve, reject) => {
        con.query("UPDATE service_types SET name = ? WHERE id = ?", [name, id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(new Error('Failed to update service type'));
            }
            console.log(result);
            resolve(result);
        });
    });
};

export const QueryDeleteServiceType = (id) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM service_types WHERE id = ?", [id], (err, result) => {
            if (err) return reject(err);
            console.log(result);
            resolve(result);
        });
    });
};
