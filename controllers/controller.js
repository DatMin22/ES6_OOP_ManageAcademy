import Customer from "../models/Customer.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";

// ***============= CALL API ===============***
const renderTable = (listPerson) => {
    let listStudent
    let listEmployee
    let listCustomer

    //========================= DANH SÁCH SING VIÊN ================================
    listStudent = listPerson.filter(person => person.role == 'ST')
    if (listStudent.length !== 0) {
        var content = "";
        for (var i = 0; i < listStudent.length; i++) {
            var p = listStudent[i];
            var contentTr = `
    <tr>
        <td scope="col">${p.id}</td>
        <td scope="col">${p.name}</td>
        <td scope="col">${p.address}</td>

        <td scope="col">${p.email}</td>
        <td scope="col">${((+p.mathScore + +p.physicsScore + +p.chemistryScore) / 3).toFixed(1)}</td>
        <td scope="col" class='d-flex justify-content-center '>
            <button class="btn btn-primary mx-2" onclick="editPerson(${p.id})">Sửa</button>
            <button class="btn btn-danger btn-delete" onclick="deletePerson(${p.id})">Xóa</button>
        </td>
    </tr>
    `;
            content += contentTr;
        }
        //in danh sách ra giao diện.
        document.querySelector("#tbody-listStudents").innerHTML = content;
    }



    //========================= DANH SÁCH NHÂN VIÊN ================================
    listEmployee = listPerson.filter(person => person.role == 'EM')
    if (listEmployee.length > 0) {
        var content = "";
        for (var i = 0; i < listEmployee.length; i++) {
            var p = listEmployee[i];
            var contentTr = `
<tr>
    <td scope="col">${p.id}</td>
    <td scope="col">${p.name}</td>
    <td scope="col">${p.address}</td>

    <td scope="col">${p.email}</td>
    <td scope="col">${parseInt(p.workDays * p.dailySalary)}</td>
    
    <td scope="col" class='d-flex justify-content-center '>
        <button class="btn btn-primary mx-2" onclick="editPerson(${p.id})">Sửa</button>
        <button class="btn btn-danger btn-delete" onclick="deletePerson(${p.id})">Xóa</button>
    </td>
</tr>
`;

            content += contentTr;
            //in danh sách ra giao diện.
            document.querySelector("#tbody-listEmployees").innerHTML = content;
        }
    }


    //========================= DANH SÁCH KHÁCH HÀNG ================================
    listCustomer = listPerson.filter(person => person.role == 'CUS')
    if (listCustomer.length > 0) {
        var content = "";
        for (var i = 0; i < listCustomer.length; i++) {
            var p = listCustomer[i];
            var contentTr = `
<tr>
    <td scope="col">${p.id}</td>
    <td scope="col">${p.name}</td>
    <td scope="col">${p.address}</td>

    <td scope="col">${p.email}</td>
    <td scope="col">${p.companyName}</td>
    <td scope="col">${p.orderValue}</td>
    <td scope="col">${p.rating}</td>
    
    <td scope="col" class='d-flex justify-content-center '>
        <button class="btn btn-primary mx-2" onclick="editPerson(${p.id})">Sửa</button>
        <button class="btn btn-danger btn-delete" onclick="deletePerson(${p.id})">Xóa</button>
    </td>
</tr>
`;

            content += contentTr;
            //in danh sách ra giao diện.
            document.querySelector("#tbody-listCustomers").innerHTML = content;
        }
    }


}

// get dữ liệu
const GetData = () => {
    return axios({
        method: 'GET',
        url: 'https://65152a4fdc3282a6a3cdf18c.mockapi.io/api/datmin/User'
    }).then((result) => {
        // show dữ liệu lên giao diện
        renderTable(result.data)
    })

        // get data thất bại
        .catch((error) => {
            console.log('error: ', error);

        });

}
GetData();
// post dữ liệu
const postData = (person) => {
    return axios({
        method: 'POST',
        url: 'https://65152a4fdc3282a6a3cdf18c.mockapi.io/api/datmin/User',
        data: person
    })
        .then((result) => {
            GetData()
            console.log('p mới add: ', result.data);
            // GetData()
            // show dữ liệu lên giao diện

        })

        // get data thất bại
        .catch((error) => {
            console.log('error: ', error);

        });
}
const deleteData = ( id) => {
    return axios({
        method: 'DELETE',
        url: `https://65152a4fdc3282a6a3cdf18c.mockapi.io/api/datmin/User/${id}`,
    
    })
        .then((result) => {
            GetData()
            console.log('p mới Xóa: ', result.data);
        })
        // get data thất bại
        .catch((error) => {
            console.log('error: ', error);

        });
}
const putData = (person, id) => {
    return axios({
        method: 'PUT',
        url: `https://65152a4fdc3282a6a3cdf18c.mockapi.io/api/datmin/User/${id}`,
        data: person
    })
        .then((result) => {
            GetData()
            console.log('p mới update: ', result.data);
        })
        // get data thất bại
        .catch((error) => {
            console.log('error: ', error);

        });
}


const getInfo = () => {

    // lấy giá trị từ tất cả input
    let id = document.querySelector('#id').value;
    let selectRole = document.querySelector('#role').value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    if (selectRole == 'ST') {
        let mathScore = document.getElementById("mathScore").value
        let physicsScore = document.getElementById("physicsScore").value
        let chemistryScore = document.getElementById("chemistryScore").value
        return new Student(
            id,
            name,
            address,
            email,
            selectRole,
            mathScore,
            physicsScore,
            chemistryScore
        )
    }

    if (selectRole == 'EM') {


        let workDays = document.getElementById("workDays").value
        let dailySalary = document.getElementById("dailySalary").value
        return new Employee(
            id,
            name,
            address,
            email,
            selectRole,
            workDays,
            dailySalary
        )
    }

    if (selectRole == 'CUS') {



        let companyName = document.getElementById("companyName").value
        let orderValue = document.getElementById("orderValue").value
        let rating = document.getElementById("rating").value
        return new Customer(
            id,
            name,
            address,
            email,
            selectRole,
            companyName,
            orderValue,
            rating
        )
    }


}

window.addPerson = () => {
    let person = getInfo()
    postData(person)
    // GetData()
}

document.getElementById('role').addEventListener("change", () => {
    let selectRole = document.querySelector('#role').value;

    let html = ''
    if (selectRole == 'ST') {
        html =
            `
                    <div class="form-group">
                                    <label>Math score</label>
                                    <input id="mathScore" class="form-control" placeholder="" />
                                    
    
                                </div>
                                <div class="form-group">
                                    <label>Physic score</label>
                                    <input id="physicsScore" class="form-control" placeholder="" />
                                    
    
                                </div>
                                <div class="form-group">
                                    <label>Chemistry Score</label>
                                    <input id="chemistryScore" class="form-control" placeholder="" />
                                    
                                </div>
            `

        document.querySelector('.extraInfo').innerHTML = html
    }
    if (selectRole == 'EM') {
        html =
            `
                <div class="form-group">
                                <label>Day of work</label>
                                <input id="workDays" class="form-control" placeholder="" />
                                

                            </div>
                            <div class="form-group">
                                <label>Daily salary</label>
                                <input id="dailySalary" class="form-control" placeholder="" />
                                

                            </div>
        `

        document.querySelector('.extraInfo').innerHTML = html
    }
    if (selectRole == 'CUS') {
        html =
            `
            <div class="form-group">
                            <label>Company Name</label>
                            <input id="companyName" class="form-control" placeholder="" />
                            

                        </div>
                        <div class="form-group">
                            <label>Order Value</label>
                            <input id="orderValue" class="form-control" placeholder="" />
                            

                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <input id="rating" class="form-control" placeholder="" />
                            

                        </div>
    `

        document.querySelector('.extraInfo').innerHTML = html
    }
})

window.updatePerson = () => {
    let person = getInfo()
    putData(person, person.id)

}
window.editPerson = (id) => {
    return axios({
        method: 'GET',
        url: `https://65152a4fdc3282a6a3cdf18c.mockapi.io/api/datmin/User/${id}`
    }).then((result) => {
        // show dữ liệu lên giao diện
        let person = result.data
        console.log('person.role: ', person.role);
        if (person.role == 'ST') {
            // show lên UI
            document.getElementById('id').value = person.id;
            document.getElementById('name').value = person.name;
            document.getElementById('email').value = person.email;
            document.getElementById('address').value = person.address;
            document.getElementById('ST').selected = true;
            // document.getElementById('role').onchange;
            let html =
                `
                    <div class="form-group">
                                    <label>Math score</label>
                                    <input id="mathScore" class="form-control" placeholder="" />
                                    
    
                                </div>
                                <div class="form-group">
                                    <label>Physic score</label>
                                    <input id="physicsScore" class="form-control" placeholder="" />
                                    
    
                                </div>
                                <div class="form-group">
                                    <label>Chemistry Score</label>
                                    <input id="chemistryScore" class="form-control" placeholder="" />
                                    
                                </div>
            `

            document.querySelector('.extraInfo').innerHTML = html
            document.getElementById('mathScore').value = person.mathScore
            document.getElementById('physicsScore').value = person.physicsScore
            document.getElementById('chemistryScore').value = person.chemistryScore
            $("#myModal").modal("show");
        }
        if (person.role == 'EM') {
            // show lên UI
            document.getElementById('id').value = person.id;
            document.getElementById('name').value = person.name;
            document.getElementById('email').value = person.email;
            document.getElementById('address').value = person.address;
            document.getElementById('EM').selected = true;

            // document.getElementById('role').onchange;
            let html =
                `
                <div class="form-group">
                                <label>Day of work</label>
                                <input id="workDays" class="form-control" placeholder="" />
                                

                            </div>
                            <div class="form-group">
                                <label>Daily salary</label>
                                <input id="dailySalary" class="form-control" placeholder="" />
                                

                            </div>
        `

            document.querySelector('.extraInfo').innerHTML = html
            document.getElementById('workDays').value = person.workDays;
            document.getElementById('dailySalary').value = person.dailySalary;
            $("#myModal").modal("show");
        }
        if (person.role == 'CUS') {
            // show lên UI
            document.getElementById('id').value = person.id;
            document.getElementById('name').value = person.name;
            document.getElementById('email').value = person.email;
            document.getElementById('address').value = person.address;
            document.getElementById('CUS').selected = true;


            // document.getElementById('role').onchange;
            let html =
                `
            <div class="form-group">
                            <label>Company Name</label>
                            <input id="companyName" class="form-control" placeholder="" />
                            

                        </div>
                        <div class="form-group">
                            <label>Order Value</label>
                            <input id="orderValue" class="form-control" placeholder="" />
                            

                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <input id="rating" class="form-control" placeholder="" />
                            

                        </div>
    `

            document.querySelector('.extraInfo').innerHTML = html
            document.getElementById('companyName').value = person.companyName;
            document.getElementById('orderValue').value = person.orderValue;
            document.getElementById('rating').value = person.rating;
            $("#myModal").modal("show");
        }


    })

        // get data thất bại
        .catch((error) => {
            console.log('error: ', error);

        });

}

window.deletePerson = (id) => {
    deleteData(id)
}
//LÀM ĐẠI ĐẠI CHO XONG NÊN PERFORMANCE HƠI CÙI NHA ANH:)))
