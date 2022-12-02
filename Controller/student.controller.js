const _handle = require("../handle/handle");
const connection = require("../model/DBconnect");
const BaseController = require("./base.controller");
const url = require("url");
const qs = require("qs");

class StudentController extends BaseController {
    async showUser(req, res) {
        const sql = 'SELECT * FROM students';
        let orders = await this.querySQL(sql);

        let html = "";

        orders.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index+1}</td>`;
            html += `<td>${student.name}</td>`;
            html += `<td>${student.class}</td>`;
            html += `<td>${student.evaluate}</td>`;

            html += `<td> <a href="/delete/student?id=${student.id}" onclick="return confirm('Xoá học viên ?')" <button class="btn btn-danger">Delete</button></a> </td>`;
            html += `<td> <a href="/edit/student?id=${student.id}"  <button class="btn btn-info">Edit</button></a> </td>`;
            html += `<td> <a href="/info/student?id=${student.id}"  <button class="btn btn-info">Chi tiết</button></a> </td>`;

            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/showUser.html')
        data = data.replace('{list-student}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
    async deleteStudent(req,res){

        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        let id=+index.id;
        const sql = `delete from students where id = ${id}`;
        await this.querySQL(sql);
        res.writeHead(301,{Location:'/'});
        res.end();

    }
    async editStudent(req,res) {
        console.log(req)
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        let id = +index.id;
        let urlPath = req.method
        if (urlPath === 'GET') {
            let sqlpro = `select * from students where id = ${id}`
            let student = await this.querySQL(sqlpro);
            console.log(student)
            let dataEdit = await _handle.getTemplate('./view/editStudent.html')
            dataEdit =dataEdit.replace('{input-name}', `<input width="100px" type="text" value="${student[0].name}" class="form-control" placlassNameder="Name " name="name">`);
            dataEdit = dataEdit.replace('{input-class}',`<input  type="text" value="${student[0].class}" class="form-control" placeholder="Class" name="class" >`);
            dataEdit =dataEdit.replace('{input-point_theory}',`<input  type="text" value="${student[0].point_theory}" class="form-control" placeholder="Point_theory" name="point_theory" >`);
            dataEdit = dataEdit.replace('{input-evaluate}',`<input  type="text" value="${student[0].evaluate}"  class="form-control" placeholder="Evaluate" name="evaluate" >`);
            dataEdit = dataEdit.replace('{input-point_practice}',` <input  type="text" value="${student[0].point_practice}" class="form-control" placeholder="Point_practice" name="point_practice" >`)
            dataEdit = dataEdit.replace('{input-describe_student}',` <input  type="text" value="${student[0].describe_student}" class="form-control" placeholder="Describe_Student" name="describe_student" >`)
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataEdit);
            res.end();
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataInfo = qs.parse(data);
                let name = dataInfo.name;
                let classs = dataInfo.class;
                let point_theory = dataInfo.point_theory;
                let evaluate = dataInfo.evaluate;
                let point_practice = dataInfo.point_practice;
                let describe_student =dataInfo.describe_student;
                let sql = `update students set name = '${name}',class = '${classs}', evaluate = '${evaluate}',point_theory = ${point_theory}, point_practice= '${point_practice}', describe_student = '${describe_student}' where id = ${id}`;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/'})
                res.end();
            })
        }
    }
    async addStudent(req, res) {
        let urlPath = req.method
        if (urlPath === 'GET') {
            let dataRegister = await _handle.getTemplate('./view/addStudent.html')
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataRegister);
            res.end();
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataInfo = qs.parse(data);
                let name = dataInfo.name;
                let classs = dataInfo.class;
                let point_theory = dataInfo.point_theory;
                let evaluate = dataInfo.evaluate;
                let point_practice = dataInfo.point_practice;
                let describe = dataInfo.describe;

                let sql = `Insert into students(name,class,point_theory,evaluate,point_practice,describe_student) value ('${name}', '${classs}',${point_theory},'${evaluate}','${point_practice}','${describe}')`;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/'})
                res.end();
            })
        }
    }
    async infoUser(req , res) {
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        console.log(index)
        let id=+index.id;
        let sql = `SELECT * FROM students where id = ${id}`;

        let student = await this.querySQL(sql);

        let html = "";

        student.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td>${student.name}</td>`;
            html += `<td>${student.class}</td>`;
            html += `<td>${student.evaluate}</td>`;
            html += `<td>${student.point_theory}</td>`;
            html += `<td>${student.point_practice}</td>`;
            html += `<td>${student.describe_student}</td>`;
            html += `<td> <a href="/edit/student?id=${student.id}"  <button class="btn btn-info">Edit</button></a> </td>`;
        })
        let data = await _handle.getTemplate('./view/infoUser.html')
        data = data.replace('{list-student}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
}



module.exports=StudentController