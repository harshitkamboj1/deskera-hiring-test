const db = require('../config/db');

const initialize = () => {
    const query = 
    "CREATE TABLE IF NOT EXISTS staff ( \
        id SERIAL PRIMARY KEY NOT NULL, \
        ageInYears INT NOT NULL, \
        ageInMonths INT NOT NULL, \
        birthDate VARCHAR(20) NOT NULL, \
        full_name VARCHAR(400) NOT NULL, \
        first_name VARCHAR(200) NOT NULL, \
        last_name VARCHAR(200) NOT NULL \
    )";

    db.pool.query(query, (error) => {
        if (error) {
            console.error(error);
            return;
        }
    })
}

module.exports = {
    initialize
}