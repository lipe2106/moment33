"use strict";

let url = "http://localhost:3000/courses/";

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
        for(let i=0; i < jsonData.length; i++) {
            result += "<td>" + jsonData[i].courseId + "</td><td>" + jsonData[i].courseName +
            "</td><td class='period'>"+jsonData[i].coursePeriod + "</td><td><img src='images/bin.png' alt='Delete course' title='Radera kurs "
            + jsonData[i].courseId + "' id=" + jsonData[i]._id + " /></td></tr>";    
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

    // Create event handler to add course
    document.getElementById("add").addEventListener("click", function(e){
        let course = {};
	    course.courseId = document.getElementById("courseId").value;
        course.courseName = document.getElementById("courseName").value;
        course.coursePeriod = document.getElementById("coursePeriod").value;

        if(course.courseId == "" || course.courseName == "" || course.coursePeriod == "") {
            document.getElementById("message").innerHTML = "Du måste fylla i alla fält korrekt";
            e.preventDefault();
        } else {
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(course), 	
                headers: { 
                    'Content-type': 'application/json; charset=UTF-8'
                } 
            })
            .then(response => response.text())
                .then(data => {
                    location.reload();
                })
            .catch(error => {
                alert('There was an error ' + error);
            });
        }
    })

}; 