$(document).ready(function(){
    var courses_computerEngineering_ND100_semester1 = [
        ["CTE111", "Introduction to Computer and Information Technology"],
        ["CTE115", "Data Structure"],
        ["MEC133", "Basic Workshop Practice"],
        ["CTE113", "Computer Application Packages"],
        ["MEC101", "Technical Drawing"],
        ["MTH112", "Algebra and Elementary Trigonometry"],
        ["EEC115", "Electrical Circuit Science"],
        ["CTE112", "Electrical Workshop Practices and Technology"],
        ["CTE114", "Internet and Web Technologies"],
        ["GNS101", "Use of English"]
    ]

    var courses_computerEngineering_ND100_semester2 = [
        ["GNS102", "Communication in English 1"],
        ["MTH211", "Calculus"],
        ["MEC102", "Machine Tool Technology and Practice"],
        ["EED126", "Introduction to Entrepreneurship"],
        ["EEC124", "Electronics1"],
        ["EEC125", "Electrical Engineering Science II"],
        ["CTE121", "Digital Computer Fundamental"],
        ["CTE122", "Electrical Measurement and Instrumentaion"],
        ["CTE123", "Comp/Electronic Maintenance $ Repairs"],
        ["CTE124", "Technical Report Writing"]
    ]

    var courses_computerEngineering_ND200_semester1= [
        ["CTE231", "Micro Computer Fundamentals"],
        ["CTE232", "Computer Workshop Practices I"],
        ["EEC234", "Electronic II"],
        ["CTE233", "Digital Computer Fundamentals II"],
        ["EEC239", "Electrical Circuit Theory I"],
        ["MTH202", "Logic and Linear Algebra"],
        ["EED216", "Practice of Entrepreneurship"],
        ["CTE234", "Computer Architecture I"],
        ["CTE235", "Electrical Measurement and Instrumentation II"],
        ["GNS201", "Use of English II"],
        ["CTE236", "Introduction to Visual Basic Programming"],
        ["CTE237", "SIWES"]
    ] 
    
    var courses_computerEngineering_ND200_semester2 = [

    ]

    var courses_computerEngineering_HND100_semester1= [
        ["GNS311", "Engineering in Society"],
        ["CTE314", "Operating System"],
        ["EEC315", "Electronic III"],
        ["CTE316", "Computer Insatllation and Maintenance"],
        ["EEC313", "Electrical Circuit Theory I"],
        ["MTH311", "Advanced Algebra"],
        ["EEE316", "Telecommunication II"],
        ["CTE313", "Computer Programming"],
        ["EEC314", "Electrical Measurement and Instrumentation III"],
        ["CTE315", "Electronic Design and Prototyping"]
    ]

    var courses_computerEngineering_HND100_semester2 = [
        ["CTE323", "Python Programming Language"],
        ["GNS302", "Communication in English III"],
        ["GNS421", "Industrial Management"],
        ["MTH312", "Advanced Calculus"],
        ["EEC323", "Electrical Circuit Theory IV"],
        ["EEC324", "Control Engineering"],
        ["EEE325", "Electronics IV"],
        ["EEC328", "Testing Method and Reliability"],
        ["CTE321", "Computer Hardware System Design"],
        ["CTE322", "Mobile and Wireless Communication"]
    ]

    var courses_computerEngineering_HND200_semester1= [
        ["CTE431", "Computer Technology"],
        ["CTE432", "Data Communication and Computer Network"],
        ["EEE315", "Electronic III"],
        ["CTE434", "Microprocessor and Embedded System"],
        ["EEC433", "Control Engineering"],
        ["MTH321", "Numerical Methods"],
        ["EED413", "Entrepreneurship Development"],
        ["CTE433", "Computer Architecture II"],
        ["CTE435", "Computer Graphics and Animation"],
        ["CTE436", "Seminar"]
    ]

    var courses_computerEngineering_HND200_semester2 = [

    ]

    var courses_electricalEngineering_ND100_semester1= [
        ["EED201", "Business Entrepreneurship"],
        ["MEC112", "Basic Workshop Technology and Practice"],
        ["EEC117", "Computer Hardware"],
        ["EEC112", "Introduction to Computer Software"],
        ["MEC111", "Technical Drawing"],
        ["MTH112", "Algebra and Elementary Trigonometry"],
        ["EEC115", "Electrical Engineering Science I"],
        ["EEC114", "Report Writing"],
        ["GNS101", "Use of English"],
        ["EEC111", "Electrical Graphics"]
    ]

    var courses_electricalEngineering_ND100_semester2 = [

    ]

    var courses_electricalEngineering_ND200_semester1= [
        ["EEC232", "Electical Power System II"],
        ["EEC233", "Electrical Machines II"],
        ["EEC238", "Telecommunication II"],
        ["EEC236", "Electrical\Electronic Insrumentation II"],
        ["EEC234", "Electronics II"],
        ["MTH202", "Logic and Linear Algebra"],
        ["GNS111", "Citizenship Education"],
        ["EEC239", "Electrical Circuit Theory"]
    ]

    var courses_electricalEngineering_ND200_semester2 = [

    ]

    var courses_electricalEngineering_HND100_semester1 = [

    ]

    var courses_electricalEngineering_HND100_semester2 = [

    ]

    var courses_electricalEngineering_HND200_semester1 = [

    ]

    var courses_electricalEngineering_HND200_semester2 = [

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
        if ((selected_department === "Computer Engineering" || dept === 'Computer Engineering') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_computerEngineering_ND100_semester1)
            updateTable(courses_computerEngineering_ND100_semester1)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_computerEngineering_ND100_semester2)
            updateTable(courses_computerEngineering_ND100_semester2)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_computerEngineering_ND200_semester1)
            updateTable(courses_computerEngineering_ND200_semester1)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_computerEngineering_ND200_semester2)
           updateTable(courses_computerEngineering_ND200_semester2)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_computerEngineering_HND100_semester1)
            updateTable(courses_computerEngineering_HND100_semester1)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_computerEngineering_HND100_semester2)
            updateTable(courses_computerEngineering_HND100_semester2)
        } else if ((selected_department === "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_computerEngineering_HND200_semester1)
            updateTable(courses_computerEngineering_HND200_semester1)
        } else if ((selected_department == "Computer Engineering" || dept === "Computer Engineering") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_computerEngineering_HND200_semester2)
            updateTable(courses_computerEngineering_HND200_semester2)
        }
        
        // Electrical Department

        else if ((selected_department === "Electrical Engineering" || dept === 'Electrical Engineering') && (selected_level === "ND 100") && (selected_semester === "Semester 1")){
            callData(courses_electricalEngineering_ND100_semester1)
            updateTable(courses_electricalEngineering_ND100_semester1)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "ND 100") && (selected_semester === "Semester 2")){
            callData(courses_electricalEngineering_ND100_semester2)
            updateTable(courses_electricalEngineering_ND100_semester2)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 1")){
            callData(courses_electricalEngineering_ND200_semester1)
            updateTable(courses_electricalEngineering_ND200_semester1)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "ND 200") && (selected_semester === "Semester 2")){
           callData(courses_electricalEngineering_ND200_semester2)
           updateTable(courses_electricalEngineering_ND200_semester2)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "HND 100") && (selected_semester === "Semester 1")){
            callData(courses_electricalEngineering_HND100_semester1)
            updateTable(courses_electricalEngineering_HND100_semester1)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "HND 100") && (selected_semester === "Semester 2")){
            callData(courses_electricalEngineering_HND100_semester2)
            updateTable(courses_electricalEngineering_HND100_semester2)
        } else if ((selected_department === "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "HND 200") && (selected_semester === "Semester 1")){
            callData(courses_electricalEngineering_HND200_semester1)
            updateTable(courses_electricalEngineering_HND200_semester1)
        } else if ((selected_department == "Electrical Engineering" || dept === "Electrical Engineering") && (selected_level === "HND 200") && (selected_semester === "Semester 2")){
            callData(courses_electricalEngineering_HND200_semester2)
            updateTable(courses_electricalEngineering_HND200_semester2)
        } 
        
    }

})
