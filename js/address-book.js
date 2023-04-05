'use strict';

function loadDoc() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Set the URL for the FillText API
  var url =
    'http://www.filltext.com/?rows=10&fname=%7bfirstName%7d&lname=%7blastName%7d&tel=%7bphone%7Cformat%7d&address=%7bstreetAddress%7d&city=%7bcity%7d&state=%7busState%7Cabbr%7d&zip=%7bzip%7d&pretty=true';
  // Open the connection and send the request
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      const tableBody = document.querySelector('#contacts-table tbody');
      data.forEach((contact) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${contact.fname}</td>
            <td>${contact.lname}</td>
            <td>${contact.address}</td>
            <td>${contact.city}</td>
            <td>${contact.state}</td>
            <td>${contact.zip}</td>
            <td>${contact.tel}</td>
          `;
        tableBody.appendChild(tr);
      });
    } else {
      console.log('Request failed. Returned status of ' + xhr.status);
    }
  };
}
