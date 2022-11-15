"use strict";

let url = "http://localhost:3000/courses/";

window.onload = init();

function init() {
    // Get courses from api and publish all 
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        let jsonData = JSON.parse(data);
        let result = "<tr>";
        for(let i=0; i < jsonData.length; i++){
            result += "<td>"+jsonData[i]._id + "</td><td>"+jsonData[i].courseId + "</td><td>"+jsonData[i].courseName +
            "</td><td class='period'>"+jsonData[i].coursePeriod +"</td><td><img src='images/bin.png' alt='Delete course' title='Radera kurs " + jsonData[i]._id + "' id=" + jsonData[i]._id + " /></td></tr>";    
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