$(document).ready(function(){
    
    var courses_ComputerScience_ND100_semester1 = [
        ["Com 111", "Introduction to computing"],
        ["Com 112", "Introductiion to Digital Electronics"],       
        ["Com 113", "Intoduction to Programming"],
        ["Com 114", "Statistics of computing 1"],
        ["Com 115", "Computer application packages"],
        ["Mth 111", "Logic of linear algebra"],
        ["Gns 101", "Use of english 1"],
        ["Gns 102", "Citizenship Education 1"],
    ]

    var courses_ComputerScience_ND100_semester2 = [

    ]

    var courses_ComputerScience_ND200_semester1=[
        ["Com 211", "Programming language using java"],
        ["Com 212", "Introduction to system program"],
        ["Com 213", "Unified Modeling Language"],
        ["Com 214", "Computer system troubleshooting"],
        ["com 215", "Computer application packages II"],
        ["Com 216", "Statistics of computing II"],
        ["SIW 219", "SIWES"],
        ["Gns 201", "Use of  english II"],
        ["EED 216", "Practice of entreneurship"],
    ]

    var courses_ComputerScience_ND200_semester2 = [

    ]

    var courses_ComputerScience_HND100_semester1 = [
        ["COM 311", "Operating System I"],
        ["COM 312", "Database Design I"],       
        ["COM 313", "computer Programming using C"],
        ["COM 314", "Computer Architecture"],
        ["COM 315", "python programmimng language"],
        ["GNS 301", "use of  english III"],
        ["STA 311", "statistics Theory I"],
        ["STA 314", "Operations Research I"],
    ]

    var courses_ComputerScience_HND100_semester2=[
        ["COM 321", "Operating System II"],
        ["COM 322", "Database Design II"],
        ["COM 323", "Assembly language"],
        ["COM 324", "intro to software Engineering"],  
        ["COM 325", "intro to Human computer interface"],
        ["COM 326", "Mobile Application Development"],
        ["COM 327", "Intro to Artificial intelligence"],
        ["GNS 302", "Communication In English III"],
    ]

    var courses_ComputerScience_HND200_semester1=[
        ["COM 411", "Web Development (PHP)"],
        ["COM 412", "Project Management"],
        ["COM 413", "Compiler Construction"],
        ["COM 414", "Data communications and networks"],  
        ["COM 415", "Multimedia"],
        ["EED 413", "Entrepreneurship Development"],
        ["GNS 401", "Communication in english IV"],
    ]

    var courses_ComputerScience_HND200_semester2 = [

    ]

    // Science Lab department
    

    var courses_ScienceLaboratoryTechnology_ND100_semester1 = [
        
    ]
    
    var courses_ScienceLaboratoryTechnology_ND100_semester2 = [
        
    ]
    
    var courses_ScienceLaboratoryTechnology_ND200_semester1=[
            
    ]
    
    var courses_ScienceLaboratoryTechnology_ND200_semester2 = [
        
    ]
    
    var courses_ScienceLaboratoryTechnology_HND100_semester1 = [
            
    ]
    
    var courses_ScienceLaboratoryTechnology_HND100_semester2=[
            
    ]
    
    var courses_ScienceLaboratoryTechnology_HND200_semester1=[
          
    ]
    
    var courses_ScienceLaboratoryTechnology_HND200_semester2 = [
        
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
    }

    function updateOption(){
        cCode.append('<option disabled selected hidden>-- Course Code --</option>');
        cTitle.val("-- Select Course Code --")
        
        // Computer Science Department
        if ((selected_department === "Computer Science" || dept === 'Computer Science') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_ComputerScience_ND100_semester1)
            updateTable(courses_ComputerScience_ND100_semester1)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_ComputerScience_ND100_semester2)
            updateTable(courses_ComputerScience_ND100_semester2)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_ComputerScience_ND200_semester1)
            updateTable(courses_ComputerScience_ND200_semester1)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_ComputerScience_ND200_semester2)
           updateTable(courses_ComputerScience_ND200_semester2)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_ComputerScience_HND100_semester1)
            updateTable(courses_ComputerScience_HND100_semester1)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_ComputerScience_HND100_semester2)
            updateTable(courses_ComputerScience_HND100_semester2)
        } else if ((selected_department === "Computer Science" || dept === "Computer Science") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_ComputerScience_HND200_semester1)
            updateTable(courses_ComputerScience_HND200_semester1)
        } else if ((selected_department == "Computer Science" || dept === "Computer Science") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_ComputerScience_HND200_semester2)
            updateTable(courses_ComputerScience_HND200_semester2)
        } 

        // Science Lab Technology
        else if ((selected_department === "Science Laboratory Technology" || dept === 'Science Laboratory Technology') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_ScienceLaboratoryTechnology_ND100_semester1)
            updateTable(courses_ScienceLaboratoryTechnology_ND100_semester1)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_ScienceLaboratoryTechnology_ND100_semester2)
            updateTable(courses_ScienceLaboratoryTechnology_ND100_semester2)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_ScienceLaboratoryTechnology_ND200_semester1)
            updateTable(courses_ScienceLaboratoryTechnology_ND200_semester1)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_ScienceLaboratoryTechnology_ND200_semester2)
           updateTable(courses_ScienceLaboratoryTechnology_ND200_semester2)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_ScienceLaboratoryTechnology_HND100_semester1)
            updateTable(courses_ScienceLaboratoryTechnology_HND100_semester1)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_ScienceLaboratoryTechnology_HND100_semester2)
            updateTable(courses_ScienceLaboratoryTechnology_HND100_semester2)
        } else if ((selected_department === "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_ScienceLaboratoryTechnology_HND200_semester1)
            updateTable(courses_ScienceLaboratoryTechnology_HND200_semester1)
        } else if ((selected_department == "Science Laboratory Technology" || dept === "Science Laboratory Technology") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_ScienceLaboratoryTechnology_HND200_semester2)
            updateTable(courses_ScienceLaboratoryTechnology_HND200_semester2)
        }
    }

})
