showList();
function getCity(city) {
    return `<tr>
                <td>${city.id}</td>
                <td><a href="#" onclick="detailCity(${city.id})">${city.name}</a></td>
                <td>${city.national.name}</td>
                <td><button onclick="showDelete(${city.id})">Delete</button></td>
                <td><button onclick="showEdit(${city.id},2)">Update</button></td>
            </tr>`;
}

function showList() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities`,
        success: function (city) {
            let content = "";
            for (let i = 0; i < city.length; i++) {
                content += getCity(city[i]);
            }
            document.getElementById("showAll").innerHTML = content;
        }
    });
}

function showDelete(cityId) {
    $('#formDelete').modal('show');
    $('#formDetails').modal('hide');
    document.getElementById("btn_delete_yes").innerHTML = `<button onclick="DeleteCity(${cityId})" class="btn btn-secondary">Xóa</button>`
    document.getElementById("btn_home").innerHTML = `<button onclick="closeDetailForm()" class="btn btn-secondary">Home</button>`

    event.preventDefault();

}
function DeleteCity(cityId){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/cities/${cityId}`,
        success: function (data) {
            showList();
            $('#formDelete').modal('hide');
        }
    });
    event.preventDefault();
}


function showEdit(cityId,com) {
    if(com === 1){
        $('#formDetails').modal('hide');
    }
    $('#formEdit').modal('show');
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${cityId}`,
        success: function (data) {
            $('#namecity1').val(data.name);
            $('#description1').val(data.description);
            $('#gdp1').val(data.gdp);
            $('#area1').val(data.area);
            $('#population1').val(data.population);
            $('#idcity1').val(data.id);
            $.ajax({
                type: "GET",
                url: `http://localhost:8080/nationals`,
                success: function (data) {
                    let listNational = [];
                    listNational = data;
                    let nationSelect = document.getElementById("national1");
                    if (nationSelect.childNodes.length > 1) {

                    }
                    else {
                        listNational.forEach(function (option) {
                            var opt = document.createElement('option');
                            opt.value = option.id;
                            opt.innerHTML = option.name;
                            nationSelect.appendChild(opt);
                        })
                    }

                }
            })
        }
    })
    event.preventDefault();
}

function updateCity(){
   let name =  $('#namecity1').val();
   let description =  $('#description1').val();
   let gdp =  $('#gdp1').val();
   let population =  $('#population1').val();
   let national_id = $('#national1').val();
   let area = $('#area1').val();
   let idcity = $('#idcity1').val();
   let data = {
       id: idcity,
       name : name,
       description: description,
       area : area,
       gdp: gdp,
       population:population,
       national:{
           id : national_id
       }
   }
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: `http://localhost:8080/cities/` + idcity,
        data: JSON.stringify(data),
        success: function (data) {
            showList();
            $('#formEdit').modal('hide');
        }
    })
    event.preventDefault();
}
function showCreate(){
    $('#formCreate').modal('show');
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/nationals`,
        success: function (data) {
            let listNational = [];
            listNational = data;
            let nationSelect = document.getElementById("national");
            if (nationSelect.childNodes.length > 1) {

            }
            else {
                listNational.forEach(function (option) {
                    var opt = document.createElement('option');
                    opt.value = option.id;
                    opt.innerHTML = option.name;
                    nationSelect.appendChild(opt);
                })
            }
        }
    })
    event.preventDefault();
}
function createCity(){
    let name =  $('#namecity').val();
    let description =  $('#description').val();
    let gdp =  $('#gdp').val();
    let population =  $('#population').val();
    let national_id = $('#national').val();
    let area = $('#area').val();
    let data = {
        name : name,
        description: description,
        area : area,
        gdp: gdp,
        population:population,
        national:{
            id : national_id
        }
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: `http://localhost:8080/cities`,
        data: JSON.stringify(data),
        success: function (data) {
            showList();
            $('#formCreate').modal('hide');
            reset();
        }
    })
    event.preventDefault();
}

function reset(){
    $('#namecity').val("");
    $('#description').val("");
    $('#gdp').val("");
    $('#area').val("");
    $('#population').val("");
    $('#idcity').val("");
}
function detailCity(cityId){
    $('#formDetails').modal('show');
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${cityId}`,
        success: function (data) {
            document.getElementById("titleModal2").innerText = `Thành phố ${data.name}`
            $('#namecity2').val(data.name);
            $('#description2').val(data.description);
            $('#gdp2').val(data.gdp);
            $('#area2').val(data.area);
            $('#population2').val(data.population);
            $('#national2').val(data.national.name);
            document.getElementById("btn_delete").innerHTML = `<button onclick="showDelete(${data.id})" class="btn btn-secondary">Xóa</button>`
            document.getElementById("btn_edit").innerHTML = `<button onclick="showEdit(${data.id},1)" class="btn btn-secondary">Sửa</button>`
        }
    })
}
function closeDetailForm(){
    $('#formDetails').modal('hide');
    $('#formDelete').modal('hide');
}