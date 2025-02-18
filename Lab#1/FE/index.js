function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Call the createEmployee function
  createEmployee();
});
// TODO
// add event listener to delete button
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-danger')) {
    const row = event.target.closest('tr');
    const id = row.firstElementChild.textContent.trim();
    console.log(id);
    deleteEmployee(id);
  }
})

// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  console.log("waasalna");
  const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    if (name && id) {
      fetch('http://localhost:3000/api/v1/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name })
      })
        .then(response => response.json())
        .then(() => {
          fetchEmployees();
          document.getElementById("name").value = '';
          document.getElementById("id").value = '';
        })
        .catch(error => console.error(error));
    }
}

// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
  // call fetchEmployees
  console.log("hnms7");
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => fetchEmployees())
    .catch(error => console.error(error));
}

fetchEmployees()
