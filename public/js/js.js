const url = 'http://127.0.0.1:3000/edit'

const edit = (e) => {
    if(confirm('Are you sure?')) {
        var DoB = document.getElementById('DoB').value.split('-');
        var data = {
            _id : document.getElementById('id').value,
            Fname : document.getElementById('Fname').value,
            Lname : document.getElementById('Lname').value,
            Age : document.getElementById('Age').value,
            DoB : DoB[2]+'/'+DoB[1]+'/'+DoB[0],
            DoB_Format : document.getElementById('DoB').value
        }
        FetchAPI(url,'PUT', data, 'Saved!');
    }
    e.preventDefault();
}

const Delete = (e) => {
    if(confirm('Are you sure to delete?')){
        var data = {
            _id : document.getElementById('id').value
        }
        FetchAPI(url,'DELETE', data, 'Delete!')
    }
    e.preventDefault();
}


function FetchAPI(apiurl,method, data, text_succ) {
    fetch(apiurl, {
        method: method, // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        alert(text_succ)
        history.back();
    })
    .catch((error) => {
        alert('Error: ',error)
        history.back();
    });
}