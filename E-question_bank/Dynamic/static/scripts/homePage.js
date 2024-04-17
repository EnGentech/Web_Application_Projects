$(document).ready(function(){
    
    // Upload Nav bar logics
    var uploadNav = $("#uploadNav")
    var navDisplay = $(".uploadNavElements")

    navDisplay.mouseleave(function(){
        navDisplay.slideUp();
    });
    
    uploadNav.click(function(){
        navDisplay.slideDown();
    });

    function printFunction() {
        var $table = $('#print-table');
        var $newBody = $('<body>');
        var $newWindow = window.open('', '_blank');
        var $title = $('<h2>').text('Score Sheet').css('text-align', 'center');
        $newBody.append($title).append($table.clone());
        $newWindow.document.body.appendChild($newBody[0]);
    
        // Adjust the width of the table to 80% for printing
        var style = document.createElement('style');
        style.innerHTML = '@media print { #print-table { width: 90%; } }';
        $newWindow.document.head.appendChild(style);
    
        $newWindow.print();
        $newWindow.close();
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
        let csrftoken = $('input[name="csrfmiddlewaretoken"]').val()

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
    
                    $.each(dataArray, function(index, value) {
                        var newRow = $("<tr></tr>");
                        newRow.html('');
                        newRow.append(`<td>${index + 1}</td>`);
                        newRow.append(`<td>${value.fullName}</td>`);
                        newRow.append(`<td>${value.regNumber}</td>`);
                        newRow.append(`<td>${value.totalScore}</td>`);
                
                        // Append the new row after the <thead> section
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
    
})