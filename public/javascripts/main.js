// Av Lina Petersson

"use strict";

// Save api url in variable
let url = "http://localhost:3000/courses/";

// Get elements from html and save in variables
let resultEl = document.getElementById("result");
let addEl = document.getElementById("add");
let courseIdEl = document.getElementById("courseId");
let courseNameEl = document.getElementById("courseName");
let coursePeriodEl = document.getElementById("coursePeriod");
let messageEl = document.getElementById("message");

// When window loads call function init
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
            resultEl.innerHTML = result;
        } else {
            resultEl.innerHTML = "<tr><td colspan='3'>Inga kurser kunde hittas</td></tr>";
        }
    })
    .catch(error => {
    alert('Error: ' + error);
    });

    // Create event handler to delete course
    resultEl.addEventListener("click", function(e){
        let id = e.target.id;
        fetch(url + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
            })
        .catch(error => {
            alert('Error: '+ error);
        });
    });

    // Add event handler to add course when submitting form
    addEl.addEventListener("click", function(e) {

        // Save input in variables
        let course = {};
        course.courseId = courseIdEl.value;
        course.courseName = courseNameEl.value;
        course.coursePeriod = coursePeriod.value;

        // If input is empty show error message and prevent button from submit
        if(course.courseId == "" || course.courseName == "" || course.coursePeriod == "") {
            messageEl.innerHTML = "Du måste fylla i alla fält korrekt";
            e.preventDefault();
        } else {
            // If input is correct add course to database
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(course), 	
                headers: { 
                    'Content-type': 'application/json; charset=UTF-8'
                } 
            })
            .then(response => response.json())
                .then(data => {
                    location.reload();
                })
            .catch(error => {
                alert('There was an error ' + error);
            });
        }
    })
}