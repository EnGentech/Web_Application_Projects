$(document).ready(function(){
    var courses_computerEngineering_ND100_semester1 = [
        ["MTH112", "Algebra and Elementary Trigonometry"],
        ["CTE115", "Data Structures"],
        ["CTE114", "Internet and Web Technologies"],
        ["MEC113", "Basic Workshop Technlogy and Practice"]
    ]

    var courses_computerEngineering_ND100_semester2 = [

    ]

    var courses_computerEngineering_ND200_semester1 = [
        ["CTE236", "Introduction to Visual Basic"],
        ["EED216", "Practice of Entrepreneur"],
    ]

    var courses_computerEngineering_ND200_semester2 = [

    ]

    var courses_electricalEngineering_ND100_semester1 = [
        ["MTH112", "Algebra and Elementary Trigonometry"],
        ["MEC113", "Basic Workshop Technlogy and Practice"]   
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

    function updateOption(){
        cCode.append('<option disabled selected hidden>-- Course Code --</option>');
        cTitle.val("-- Select Course Code --")
        if ((selected_department === "Computer Engineering" || dept === 'Computer Engineering') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courses_computerEngineering_ND100_semester1.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courses_computerEngineering_ND100_semester1.length; i++) {
                    if (courses_computerEngineering_ND100_semester1[i][0] === selected_cCode){
                        cTitle.val(courses_computerEngineering_ND100_semester1[i][1])
                    } 
                }
            })
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courses_computerEngineering_ND100_semester2.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courses_computerEngineering_ND100_semester2.length; i++) {
                    if (courses_computerEngineering_ND100_semester2[i][0] === selected_cCode){
                        cTitle.val(courses_computerEngineering_ND100_semester2[i][1])
                    } 
                }
            })
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courses_computerEngineering_ND200_semester1.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courses_computerEngineering_ND200_semester1.length; i++) {
                    if (courses_computerEngineering_ND200_semester1[i][0] === selected_cCode){
                        cTitle.val(courses_computerEngineering_ND200_semester1[i][1])
                    } 
                }
            })
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courses_computerEngineering_ND200_semester2.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courses_computerEngineering_ND200_semester2.length; i++) {
                    if (courses_computerEngineering_ND200_semester2[i][0] === selected_cCode){
                        cTitle.val(courses_computerEngineering_ND200_semester2[i][1])
                    } 
                }
            })
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            cCode.empty()
            cCode.append('<option disabled selected hidden>-- Course Code --</option>');
            courses_electricalEngineering_ND100_semester1.forEach(element => {
                cCode.append('<option value="' + element[0] + '">' + element[0] + '</option>')               
            });
            cCode.change(function(){
                selected_cCode = $(this).val();
                for (let i = 0; i < courses_electricalEngineering_ND100_semester1.length; i++) {
                    if (courses_electricalEngineering_ND100_semester1[i][0] === selected_cCode){
                        cTitle.val(courses_electricalEngineering_ND100_semester1[i][1])
                    } 
                }
            })
        }
    }

   

}) 