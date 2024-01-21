$(document).ready(function(){
    var faculty = [
        "Management Science",
        "Engineering",
        "Science and Technology",
        "Environmental Science",
    ]

    var department_managementScience = [
        "Accountancy",
        "Marketing",
        "Public Administration",
        "Business Administration",
        "Mass Communication",
    ]

    var department_engineering = [
        "Computer Engineering",
        "Electrical Engineering",
    ]

    var department_scienceAndTechnology = [
        "Computer Science",
        "Science Laboratory Technology",
    ]

    var department_environmentalScience = [
        "Estates Management",
        "Quantity Surveying",
        "Building Technology",
    ]


    $("#department").empty()
    $("#department").append('<option disabled selected hidden>Choose Department</option>');

    $('#faculty').change(function() {
        var selected = $(this).val();
        var dropdwn = $('#department');
        dropdwn.empty();
        if (selected == "Management Science"){
            dropdwn.append('<option disabled selected hidden>-- Choose Department --</option>');
            department_managementScience.forEach(element => {
                dropdwn.append('<option value="' + element + '">' + element + '</option>')
            });
        } else if (selected == "Engineering"){
            dropdwn.append('<option disabled selected hidden>-- Choose Department --</option>');
            department_engineering.forEach(element => {
                dropdwn.append('<option value="' + element + '">' + element + '</option>')
            });
        } else if (selected == "Science and Technology"){
            dropdwn.append('<option disabled selected hidden>-- Choose Department --</option>');
            department_scienceAndTechnology.forEach(element => {
                dropdwn.append('<option value="' + element + '">' + element + '</option>')
            });
        } else if (selected == "Environmental Science"){
            dropdwn.append('<option disabled selected hidden>-- Choose Department --</option>');
            department_environmentalScience.forEach(element => {
                dropdwn.append('<option value="' + element + '">' + element + '</option>')
            });
        } else {
            dropdwn.append('<option disabled selected hidden>-- Choose Department --</option>');
        }
    })
    

    
})