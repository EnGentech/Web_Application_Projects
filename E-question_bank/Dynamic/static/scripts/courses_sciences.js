$(document).ready(function(){
    
    var courses_ComputerScience_ND100_semester1 = [
        ["Com111", "Introduction to computing"],
        ["Com112", "Introductiion to Digital Electronics"],       
        ["Com113", "Intoduction to Programming"],
        ["Com114", "Statistics of computing 1"],
        ["Com115", "Computer application packages"],
        ["Mth111", "Logic of linear algebra"],
        ["Gns101", "Use of english 1"],
        ["Gns102", "Citizenship Education 1"],
    ]

    var courses_ComputerScience_ND100_semester2 = [
        ["COM121", "Programming using C Language"],
        ["COM122", "Introduction to Internet"],
        ["COM123", "Programming Language using Java I"],
        ["COM124", "Data Structure and Algorithms"],
        ["COM125", "Introduction to System Analysis and Design"],
        ["COM126", "PC Upgrade & Maintenance"],
        ["GNS128", "Citizenship Education II"],
        ["GNS101", "Communication in English"],
        ["EED126", "Practice of Entrepreneurship"],
        ["GNS228", "Research Methods"]
    ]

    var courses_ComputerScience_ND200_semester1=[
        ["Com211", "Programming language using java"],
        ["Com212", "Introduction to system program"],
        ["Com213", "Unified Modeling Language"],
        ["Com214", "Computer system troubleshooting"],
        ["com215", "Computer application packages II"],
        ["Com216", "Statistics of computing II"],
        ["SIW219", "SIWES"],
        ["Gns201", "Use of  english II"],
        ["EED216", "Practice of entreneurship"],
    ]

    var courses_ComputerScience_ND200_semester2 = [

    ]

    var courses_ComputerScience_HND100_semester1 = [
        ["COM311", "Operating System I"],
        ["COM312", "Database Design I"],       
        ["COM313", "computer Programming using C"],
        ["COM314", "Computer Architecture"],
        ["COM315", "python programmimng language"],
        ["GNS301", "use of  english III"],
        ["STA311", "statistics Theory I"],
        ["STA314", "Operations Research I"],
    ]

    var courses_ComputerScience_HND100_semester2=[
        ["COM321", "Operating System II"],
        ["COM322", "Database Design II"],
        ["COM323", "Assembly language"],
        ["COM324", "intro to software Engineering"],  
        ["COM325", "intro to Human computer interface"],
        ["COM326", "Mobile Application Development"],
        ["COM327", "Intro to Artificial intelligence"],
        ["GNS302", "Communication In English III"],
    ]

    var courses_ComputerScience_HND200_semester1=[
        ["COM411", "Web Development (PHP)"],
        ["COM412", "Project Management"],
        ["COM413", "Compiler Construction"],
        ["COM414", "Data communications and networks"],  
        ["COM415", "Multimedia"],
        ["EED413", "Entrepreneurship Development"],
        ["GNS401", "Communication in english IV"],
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
