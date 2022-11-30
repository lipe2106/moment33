"use strict";

let url = "http://localhost:3000/courses";

window.onload = init();

function init() {
    // Get courses from db and publish all 
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        let jsonData = JSON.parse(data);
        let result = "<tr>";
        for(let i=0; i < jsonData.length; i++){
            result += "</td><td>"+jsonData[i].code + "</td><td>" + jsonData[i].name +
            "</td><td><a href='" + jsonData[i].syllabus + "'>Länk</td><td>"+jsonData[i].progression + "</td><td class='period'>" + 
            jsonData[i].term + "</td><td><img src='images/bin.png' alt='Delete course' title='Radera kurs " + 
            jsonData[i]._id + "' id=" + jsonData[i]._id + " /></td></tr>";    
        }
        
        if(jsonData.length > 0) {
            document.getElementById("result").innerHTML = result;
        } else {
            document.getElementById("result").innerHTML = "<tr><td colspan='3'>Inga kurser kunde hittas</td></tr>";
        }
    })
    .catch(error => {
    alert('Error: ' + error);
    });

    // Create event handler to delete course
    document.getElementById("result").addEventListener("click", function(e){
        let id = e.target.id;
        fetch(url + id, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            location.reload();
            })
        .catch(error => {
            alert('Error: '+ error);
        });
    });

}; 