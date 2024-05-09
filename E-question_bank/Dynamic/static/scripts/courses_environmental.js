$(document).ready(function(){
    var courses_buildingTechnology_ND100_semester1 = [
        
    ]

    var courses_buildingTechnology_ND100_semester2 = [
        
    ]

    var courses_buildingTechnology_ND200_semester1= [
        
    ] 
    
    var courses_buildingTechnology_ND200_semester2 = [
        ["BLD221", "Introduction to Structural Design & Det."],
        ["BLD222", "Building Construction IV"],,
        ["BLD223", "Workshop Practice and Technology IV"],
        ["ICT102", "Introduction to Programming using Visual Basic"],
        ["QUS210", "Tendering and Estimating"],
        ["BLD224", "Maintenance Technology"],
        ["QUS210", "Building Measurement II and Specification"],
        ["BLD225", "Site Management II"],
        ["EED211", "Entrepreneurship Development"],
        ["BLD226", "Project"]
    ]

    var courses_buildingTechnology_HND100_semester1= [
        
    ]

    var courses_buildingTechnology_HND100_semester2 = [
        
    ]

    var courses_buildingTechnology_HND200_semester1= [
        
    ]

    var courses_buildingTechnology_HND200_semester2 = [

    ]

    var courses_quantitySurvey_ND100_semester1= [
        
    ]

    var courses_quantitySurvey_ND100_semester2 = [

    ]

    var courses_quantitySurvey_ND200_semester1= [
        
    ]

    var courses_quantitySurvey_ND200_semester2 = [

    ]

    var courses_quantitySurvey_HND100_semester1 = [

    ]

    var courses_quantitySurvey_HND100_semester2 = [

    ]

    var courses_quantitySurvey_HND200_semester1 = [

    ]

    var courses_quantitySurvey_HND200_semester2 = [

    ]

    let selected_department
    let selected_level
    let selected_semester
    var level = $('#level');
    var semester = $('#semester');
    var option = $('#option');
    var department = $("#department")
    var cCode = $("#cCode")
    var cTitle = $("#cTitle")
    var dept = $("#dept").text()
    var tbodyContent = $("#tableBodyContent")

    level.on("change", function(){
        selected_level = $(this).val();
        updateOption()
    })
    semester.change(function(){
        selected_semester = $(this).val();
        updateOption()
    })
    option.change(function(){
        selected_option = $(this).val();
        updateOption()
    })
    department.change(function(){
        selected_department = $(this).val();
        updateOption()
    })

    let updateTable = function(courses){
        tbodyContent.empty()
        let i = 0
        courses.forEach(element => {
            var row = $('<tr>')
            row.append("<td>" + (i + 1) + "</td>");
            row.append("<td>" + element[0] + "</td>");
            row.append("<td>" + element[1] + "</td>");
            row.append('<td><section class="click"><p class="onOff">off</p></section></td>');
            
            tbodyContent.append(row);
            i++;
        });

        var onOffBtn = $(".onOff")
        var clickBtn = $(".click")
        var countDisplay = $("#onCheck")
        var count = 0

        clickBtn.click(function(){
            $(this).toggleClass("click2")
            $(this).find(onOffBtn).toggleClass("onOff2")
            var newText = $(this).hasClass("click2") ? "ON" : "off";
            $(this).find(onOffBtn).text(newText)
            
            if ($(this).find(onOffBtn).text() === "ON"){
                count += 1
            } else {
                count -= 1
            }
            countDisplay.text(count)
        });

    }

    let callData = function(courseIteration){
        try {
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courseIteration.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courseIteration.length; i++) {
                    if (courseIteration[i][0] === selected_cCode){
                        cTitle.val(courseIteration[i][1])
                    } 
                }
            })
        } catch (error) {
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            console.log(error)
        }
        
    }

    function updateOption(){
        cCode.append('<option disabled selected hidden>-- Course Code --</option>');
        cTitle.val("-- Select Course Code --")
        if ((selected_department === "Building Technology" || dept === 'Building Technology') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_buildingTechnology_ND100_semester1)
            updateTable(courses_buildingTechnology_ND100_semester1)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_buildingTechnology_ND100_semester2)
            updateTable(courses_buildingTechnology_ND100_semester2)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_buildingTechnology_ND200_semester1)
            updateTable(courses_buildingTechnology_ND200_semester1)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_buildingTechnology_ND200_semester2)
           updateTable(courses_buildingTechnology_ND200_semester2)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_buildingTechnology_HND100_semester1)
            updateTable(courses_buildingTechnology_HND100_semester1)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_buildingTechnology_HND100_semester2)
            updateTable(courses_buildingTechnology_HND100_semester2)
        } else if ((selected_department === "Building Technology" || dept === "Building Technology") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_buildingTechnology_HND200_semester1)
            updateTable(courses_buildingTechnology_HND200_semester1)
        } else if ((selected_department == "Building Technology" || dept === "Building Technology") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_buildingTechnology_HND200_semester2)
            updateTable(courses_buildingTechnology_HND200_semester2)
        }
        
        // Electrical Department

        else if ((selected_department === "Quantity Survey" || dept === 'Quantity Survey') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_quantitySurvey_ND100_semester1)
            updateTable(courses_quantitySurvey_ND100_semester1)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_quantitySurvey_ND100_semester2)
            updateTable(courses_quantitySurvey_ND100_semester2)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_quantitySurvey_ND200_semester1)
            updateTable(courses_quantitySurvey_ND200_semester1)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_quantitySurvey_ND200_semester2)
           updateTable(courses_quantitySurvey_ND200_semester2)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_quantitySurvey_HND100_semester1)
            updateTable(courses_quantitySurvey_HND100_semester1)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_quantitySurvey_HND100_semester2)
            updateTable(courses_quantitySurvey_HND100_semester2)
        } else if ((selected_department === "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_quantitySurvey_HND200_semester1)
            updateTable(courses_quantitySurvey_HND200_semester1)
        } else if ((selected_department == "Quantity Survey" || dept === "Quantity Survey") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_quantitySurvey_HND200_semester2)
            updateTable(courses_quantitySurvey_HND200_semester2)
        } 
        
    }

})
