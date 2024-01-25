$(document).ready(function(){
    let options = $('#option')
    let checkLevel = $("#level")
    let checkdepartment = $("#department")

    checkLevel.change(function(){
        choosen_level = checkLevel.val()
        updateOption()
    })

    checkdepartment.change(function(){
        choosen_department = checkdepartment.val()
        updateOption()
    })


    // Options in different faculty and departments
    // faculty of Engineering
    electricalEngineering_options = [
        "Instrumentation and control",
        "Power and Machines",
        "Telecommunication"
    ]

    scienceLaboratoryTechnology_options = [
        "Biochemistry",
        "Chemistry",
        "Environmental Biology",
        "Microbiology",
        "Physics with Electronics"
    ]

    // Call back function

    let callBackOption = function(courseOption){
        options.prop("disabled", false)
        options.empty()
        options.append('<option disabled selected hidden>-- select Option --</option>');
        courseOption.forEach(element => {
            options.append('<option value="' + element + '">' + element + '</option>')
        });
    }

    // Utilizing Function updateOption
    function updateOption(){
        if (choosen_level === "ND 100" || choosen_level === "ND 200"){
            options.empty()
            options.append('<option disabled selected hidden>No option for ND</option>');
            options.prop("disabled", true)
        } else if ((choosen_level === "HND 100" || choosen_level === "HND 200") && choosen_department === "Electrical Engineering"){
            callBackOption(electricalEngineering_options)
        } else if ((choosen_level === "HND 100" || choosen_level === "HND 200") && choosen_department === "Science Laboratory Technology"){
            callBackOption(scienceLaboratoryTechnology_options)
        }
        else {
            options.empty()
            options.append('<option disabled selected hidden>No option</option>');
            options.prop("disabled", true)
        }
        
       
    }
})