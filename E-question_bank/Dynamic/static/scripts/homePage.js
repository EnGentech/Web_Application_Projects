$(document).ready(function(){
    
    // Upload Nav bar logics
    var uploadNav = $("#uploadNav")
    var navDisplay = $(".uploadNavElements")
    let csrftoken = $('input[name="csrfmiddlewaretoken"]').val()

    navDisplay.mouseleave(function(){
        navDisplay.slideUp();
    });
    
    uploadNav.click(function(){
        navDisplay.slideDown();
    });

    function printFunction() {
        var $table = $('#print-table');
        var $newWindow = window.open('', '_blank');
    
        var $newBody = $('<body>');
        var $title = $('<h2>').text('Score Sheet').css('text-align', 'center');
        $newBody.append($title).append($table.clone());
    
        $($newWindow.document.body).append($newBody);
    
        // Add custom styles for the table
        var style = $('<style>').text(`
            @media print { 
                #print-table { 
                    width: 90%; 
                    margin: auto;
                }
                #print-table thead {
                    text-align: left;
                }
            }
        `);
        $($newWindow.document.head).append(style);
    
        // Copy existing stylesheets to the new window
        $('link[rel="stylesheet"]').each(function() {
            $($newWindow.document.head).append($(this).clone());
        });
    
        $newWindow.print();
        setTimeout(function() {
            $newWindow.close();
        }, 100); 
    }    
    

    let printBtn = $("#printScoreList")
    printBtn.click(function(){
        printFunction();
    })

    let generate = $("#genList")
    generate.click(function(){
    let faculty = $("#faculty").val() 
    let department = $("#department").val()
    let level = $("#level").val()
    let semester = $("#semester").val()
    let courseCode = $("#cCode").val()

    if (courseCode){
        $.ajax({
            url: "/heritage_students/user/ReturnScores/",
            type: "POST",
            data: {
                faculty: faculty,
                department: department,
                level: level,
                semester: semester,
                cCode: courseCode
            },
            dataType: "json",
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function(data){
                var dataArray = data.response;
                if (data.status === 501){
                    $('#allscores table tbody tr').remove();
                    var newRow = $("<tr></tr>");
                    newRow.append(`<td colspan="4" style="text-align: center">${data.response}</td>`);
                    $('#allscores table tbody').append(newRow);
                    printBtn.hide();
                    return
                } else {
                    printBtn.show();
                }

                $('#allscores table tbody tr').remove();

                // Sort dataArray by regNumber
                dataArray.sort((a, b) => {
                    if (a.regNumber < b.regNumber) return -1;
                    if (a.regNumber > b.regNumber) return 1;
                    return 0;
                });

                $.each(dataArray, function(index, value) {
                    var newRow = $("<tr></tr>");
                    newRow.html('');
                    newRow.append(`<td>${index + 1}</td>`);
                    newRow.append(`<td>${value.fullName}</td>`);
                    newRow.append(`<td>${value.regNumber}</td>`);
                    newRow.append(`<td>${value.totalScore}</td>`);
            
                    $('#allscores table tbody').append(newRow);
                })
            },
            error: function(error){
                console.log(error)
            }
        })
    } else {
        alert("All fields are required!")
    }
})


    // Generating class list logic
    let generateClassList = $("#genRegs")
    generateClassList.click(function(){
        let faculty = $("#faculty").val() 
        let department = $("#department").val()
        if (department) {
            $.ajax({
                type: "POST",
                url: "/heritage_students/user/generateClassList/",
                data: {
                    faculty: faculty,
                    department: department
                },
                headers: {
                    'X-CSRFToken': csrftoken
                },
                dataType: "json",
                success: function (response) {
                    let len = response.regList.length
                    if (len === 0){
                        alert("No registered student from the selected department")
                        return
                    }
                    let selectList = $("#genRegList")
                    selectList.empty()
                    selectList.append('<option value="" disabled selected style="display:none">Select Reg. Number</option>')
                    response.regList.sort();
                    $.each(response.regList, function(index, value){
                        selectList.append($('<option>', {
                            value: value,
                            text: value
                        }));
                    })
                }
            });
        } else {
            alert("You must select faculty and department")
        }
    })

    let generator = $("#idGenerator")
    generator.click(function(){
        let selectedReg = $("#genRegList").val()
        if (selectedReg){
            let reg = parseInt(selectedReg)
            $.ajax({
                type: "POST",
                url: `/heritage_students/user/genReg/${reg}/`,
                data: "data",
                dataType: "json",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                success: function (response) {
                    let yourReg = $("#yourRef")
                    yourReg.text(response.ref)
                }
            });
        } else {
            alert("Generate and select user Reg Number")
        }
    })

    const announcement = $("#announcementBtn")
    announcement.click(function(){
        $("#updateInfo").toggle();
    });

    $("#submitUpdate").click(function(){
        $("#updateInfo").hide();
    })
    
    
})