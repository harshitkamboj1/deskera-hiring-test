const db = require('../config/db');

const getStaff = (request, response) => {
    db.pool.query('SELECT * FROM staff ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(400).json("Error!")
            return;
        }
        response.status(200).json(results.rows)
    })
}

const getStaffByAgeGTX = (request, response) => {
    const { X } = request.body
    db.pool.query('SELECT * FROM staff WHERE staff.ageInYears>' + X + ' ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(400).json("Error!")
            return;
        }
        response.status(200).json(results.rows)
    })
}

function parseDate(s) {
    try {
        var months = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };
        var p = s.split('-');
        return new Date(p[2], months[p[1].toLowerCase()], p[0]);
    }
    catch (err) {
        console.error(err);
        response.status(400).json("Error!")
        return;
    }
}

function getAgeInMonths(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age = age * 12 + m;
    return age;
}

function getAgeInYears(birthDate) {
    var diff_ms = Date.now() - birthDate.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const createMember = (request, response) => {
    const { full_name, birth_date } = request.body
    split_name = full_name.split(' ')
    last_name = split_name[split_name.length - 1]
    split_name.pop()
    first_name = split_name.join(" ")
    birth_date_str_obj = parseDate(birth_date)
    ageInYears = getAgeInYears(birth_date_str_obj)
    ageInMonths = getAgeInMonths(birth_date_str_obj)
    isSameEmployeePresent = false;
    db.pool.query('SELECT * FROM staff ORDER BY id ASC', (error, results) => {
        if (error) {
            return "Error!";
        }
        else {
            for (i = 0; i < results.rows.length; i++) {
                if ((results.rows[i])['full_name'] === full_name && (results.rows[i])['birthdate'] === birth_date) {
                    isSameEmployeePresent = true;
                    break;
                }
            }
            if (isSameEmployeePresent) {
                response.status(400).json("Employee with same data already exists!")
                return;
            } else {
                db.pool.query('INSERT INTO staff (first_name, last_name, full_name, ageInYears, ageInMonths, birthDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                    [first_name, last_name, full_name, ageInYears, ageInMonths, birth_date], (error, result) => {
                        if (error) {
                            response.status(400).json("Error!")
                            return;
                        }
                        response.status(200).json({
                            id: result.rows[0].id,
                            first_name: first_name,
                            last_name: last_name,
                            full_name: full_name,
                            birthDate: birth_date,
                            ageInMonths: ageInMonths,
                            ageInYears: ageInYears
                        })
                    })
            }
        }
    })
}

const getMemberById = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query('SELECT * FROM staff WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).json("Error!")
            return;
        }
        response.status(200).json(results.rows)
    })
}

const deleteMember = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query('DELETE FROM staff WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(400).json("Error!")
            return;
        }
        response.status(200).json("Employee with id:" + id + " deleted")
    })
}

module.exports = {
    getStaff,
    createMember,
    getMemberById,
    deleteMember,
    getStaffByAgeGTX
}