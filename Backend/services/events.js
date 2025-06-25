import { con } from '../db.js';

export const QueryEventById = (id) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM events WHERE id = ?", [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryListOfEvents = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM events", (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

// export const QueryEventsByClientId = (clientId) => {
//     return new Promise((resolve, reject) => {
//         con.query(
//             "SELECT * FROM events WHERE client1_id = ? OR client2_id = ?",
//             [clientId, clientId],
//             (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     console.log(result);
//                     resolve(result);
//                 }
//             }
//         );
//     });
// };
export const QueryEventsByClientId = (clientId) => {
  return new Promise((resolve, reject) => {
    con.query(
      `
      SELECT events.*, event_types.name AS event_type_name
      FROM events
      JOIN event_types ON events.event_type_id = event_types.id
      WHERE events.client1_id = ? OR events.client2_id = ?
      `,
      [clientId, clientId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
};


export const QueryCreateEvent = (event) => {
    const { client1_id, client2_id, event_type_id, event_date, price } = event;

    return new Promise((resolve, reject) => {
        con.query(
            "INSERT INTO events SET client1_id = ?, client2_id = ?, event_type_id = ?, event_date = ?, price = ?",
            [client1_id, client2_id || null, event_type_id, event_date, price || null],
            (err, result) => {
                if (err) {
                    console.log(err);
                    reject(new Error('An error occurred while creating the event'));
                } else {
                    console.log(result);
                    resolve(result);
                }
            }
        );
    });
};

export const QueryUpdateEvent = (id, event) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM events SET ? WHERE id = ?", [event, id], (err, result) => {
            if (err) {
                reject(new Error('Error updating event: ' + err.message));
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};

export const QueryDeleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE FROM events WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            } else {
                con.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
            }
        });
    });
};
export const QueryGetEventTypes = () => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM event_types",
      (err, rows) => {
        if (err) {
          console.log(err);
          reject(new Error('שגיאה בשליפת סוגי האירועים'));
        } else {
          resolve(rows);
        }
      }
    );
  });
};



export const QueryEventWithClientNames = (id) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM event_details_view WHERE id = ?;`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
};
