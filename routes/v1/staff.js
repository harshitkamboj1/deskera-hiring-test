const staff = require('../../queries/staff')
const { check, validationResult } = require('express-validator/check')

module.exports = function(app){
	app.get('/staff', staff.getStaff)
	app.get('/staffgtx', staff.getStaffByAgeGTX)
	app.get('/staff/member/:id', staff.getMemberById)
	app.post('/staff/member', [
	  ], (request, response) => {
		staff.createMember(request, response);
	})
	app.delete('/staff/member/:id', staff.deleteMember)
}