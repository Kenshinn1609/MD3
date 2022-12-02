const http = require('http');
const PORT = 8000;
const url = require('url');
const studentController = require('./Controller/student.controller')
const StudentContrller = new studentController()
const server = http.createServer((req, res) => {

    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case'/':
            StudentContrller.showUser(req,res);
            break;
        case'/delete/student':
            StudentContrller.deleteStudent(req,res);
            break;
        case'/edit/student':
            StudentContrller.editStudent(req,res);
            break;
        case'/add/student':
            StudentContrller.addStudent(req,res);
            break;
        case'/info/student':
            StudentContrller.infoUser(req,res);
            break;
    }
})
    server.listen(PORT, 'localhost', () => {
        console.log('Server running on port ' + PORT)
    })