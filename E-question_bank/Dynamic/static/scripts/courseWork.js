$(document).ready(function() {
    var selectedCourse = $('.regCourses');
    var cCodeSelect = $('#cCodeSelect');
    var cTitleSelect = $('#cTitleSelect');
    let takeTest = $("#takeTest")
    let clone = $("#clone")
    let defense = $("#defense")
    let timerStatus

    function makeAjaxRequest() {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/heritage_students/user/taskNotification/",
            data: {}, 
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
            }
        });
    }

    function updateStatus() {
        $(".allDataSchedule").each(function() {
            var startTime = $(this).find(".startDate").text();
            let endTime = $(this).find(".endDate").text()
            var statusCell = $(this).find(".submitStatus");
            var statusLight = $(this).find(".statusLight");
    
            var currentTime = new Date();
            startTime = startTime.split("/")
            endTime = endTime.split("/")
            var startDate = new Date(startTime[2], startTime[1] - 1, startTime[0], 0, 0, 0);
            var endDate = new Date(endTime[2], endTime[1] - 1, endTime[0], 16);
            
            if (startDate > currentTime) {
                statusCell.text("Pending");
                statusLight.css("background-color", "yellow");
            } else if (startDate <= currentTime && endDate > currentTime) {
                statusCell.text("Active");
                // makeAjaxRequest()
                statusLight.css("background-color", "green");
            } else {
                statusCell.text("Expired");
                statusCell.css("color", "red");
                statusLight.css("background-color", "red");
            }
        });
    }

    function totalGrade() {
        let totalScore = 0;
        count = 0
        let allScores = $('.allDataSchedule').find(".scores")
        allScores.each(function(index, element) {
            count += 1
            let scoreObtained = $(element).text()
            splitScore = scoreObtained.split("%")
            totalScore += parseInt(splitScore[0])
        })
        let average = totalScore/count
        let cumScore = average * 0.3
        return {
            avg: average.toFixed(2),
            score: cumScore.toFixed(1)
        }
    }

    function updateCountdown(startDate, endDate) {
        let verifyDate = $('.startDate').text()
        
        if (verifyDate) {

            var endDateParts = endDate.split("/");
            var endDateTime = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0], 16);

            var startDateParts = startDate.split("/");
            var startDateTime = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0], 0, 0, 0);

            var now = new Date();
        
            if ((endDateTime <= now) || (startDateTime >= now)) {
                $("#countdown").text("Timer:  Time closed");
            } else {
                var timeDifference = endDateTime - now;
                var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                hours = hours.toString().padStart(2, '0');
                minutes = minutes.toString().padStart(2, '0');
                seconds = seconds.toString().padStart(2, '0');
            
                $("#countdown").text("Timer:  " + days + "::" + hours + ":" + minutes + ":" + seconds);         
            
            }

            timerStatus = setTimeout(function() {
                updateCountdown(startDate, endDate);
                updateStatus()
            }, 1000);
        } else {
            $("#countdown").text("Timer:  00::00:00:00");
        }
    }

    var activeModelTitle
    selectedCourse.click(function() {
        var courseTitle = $(this).text()
        var courseIndex = $(this).index('.regCourses');
        var courseCode = $('.regC_code').eq(courseIndex).text();
        
        cCodeSelect.text(courseCode);
        cTitleSelect.text(courseTitle);

        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();

        $.ajax({
            url: '/heritage_students/user/courseWork/',
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                courseTitle: courseTitle,
                courseCode: courseCode
            }, 
            success: function(response) {
                clearTimeout(timerStatus)
                takeTest.hide()
                clone.hide()
                defense.hide()

                if (response.status === "No task") {
                    $("#countdown").text("Timer: 00::00:00:00");
                    let noTaskTable = $(".progressTable .tableView table tbody");
                    noTaskTable.empty();
                    noTaskTable.append("<tr><td colspan='8'><center>No task available at the moment! Enjoy the silence...</center></td></tr>");
                }
                
                let count = 0
                let gradeScore = $("#gradeColor")
                let scoreNumerator = $("#numerator")
                
                var updatedContent = $(response).find('.progressTable').html();
                $('.progressTable').html(updatedContent);
                
                $(response).find('.allDataSchedule').each(function(index, element) {
                    count += 1
                });

                let startDateText = ""
                let startDateCall = $(response).find('.startDate');
                startDateCall.each(function(index, element) {
                    startDateText = $(this).text();
                })

                let endDateText = ""
                let endDateCall = $(response).find('.endDate');
                endDateCall.each(function(index, element) {
                    endDateText = $(element).text();
                })
                
                $('#allTask').text(`All Task: ${count}`);

                updateCountdown(startDateText, endDateText);

                let unitScore = totalGrade();
                if (!isNaN(unitScore.avg) && unitScore.avg !== null && unitScore.avg !== undefined) {
                    gradeScore.text(`${unitScore.avg}%`);
                    if (unitScore.score < 12) {
                        gradeScore.css("color", "red");
                        scoreNumerator.css("color", "red")
                    } else {
                        gradeScore.css("color", "green");
                        scoreNumerator.css("color", "green")
                    }
                    scoreNumerator.text(unitScore.score)
                } else {
                    scoreNumerator.text("0.0");
                    gradeScore.text("0.00%");
                }

                setTimeout(function() {
                    $(".tableView tbody tr").each(function(index) {
                        var taskType = $(this).find("td:eq(2)").text().trim();
                        var status = $(this).find(".submitStatus").text().trim();
                        if (taskType === "Test" && status === "Active") {
                            $(this).find(".clickMe").text("click above").attr('title', "Click the take test above");
                            $(this).find(".clickMe").prop('disabled', true);
                            takeTest.show()
                            activeModelTitle = $(this).find("td:eq(1)").text().trim();
                        } else if (taskType === "Project" && status === "Active"){
                            clone.show()
                        } else if (taskType == "Defense" && status == "Active") {
                            $(this).find(".clickMe").text("click above").attr('title', "Join from link above");
                            $(this).find(".clickMe").prop('disabled', true);
                            defense.show()
                        }
                    });
                }, 1000);
                
            },
            error: function(xhr, status, error) {
                console.error('AJAX request failed:', error);
            },

            
        });
        
    });

    var onBoard = $(".statusBoard")
    var onOffcWorkContainer = $(".cWorkContainer")
    let taskTitle = $("#taskTitle")
    let moduleNumber = $("#moduleNumber")

    
    $(document).on('click', '.clickMe', function() {
        var clickedRow = $(this).closest('.allDataSchedule');
        let checkStatus = clickedRow.find(".submitStatus").text()
        var sNo = clickedRow.find('td:nth-child(1)').text();
        var moduleName = clickedRow.find('td:nth-child(2)').text();
        var moduleID = `Module ${sNo}`;
        let courseTitle = $("#cTitleSelect").text()
        $('#noClick').text(courseTitle);
        
        taskTitle.text(moduleName);
        moduleNumber.text(moduleID);

        if (checkStatus === "Expired") {
            alert("Task has expired");
        } else if (checkStatus === "Pending") {
            alert("Task is still pending");
        } else {
            let courseCode = $("#cCodeSelect").text()
            let moduleTitle = $("#taskTitle").text()

            $.ajax({
                url: "/heritage_students/user/validateAssessment/ajax/",
                data: {
                    courseCode: courseCode,
                    moduleTitle: moduleTitle,
                },
                
                success: function (response) {
                    if (response.status === 1) {
                        $(".lightBox").css("background-color", "green");
                        $("#taskRemark").text("Completed")
                        $("#hideIfSubmitted").hide()
                        $("#submitAssessment").hide();
                        $("#hideRemark").css("color", "brown")
                        $("#hideRemark").show()
                    }
                }
            });
            onOffcWorkContainer.hide();
            onBoard.show();
        }
    });

    $(".closeButton").click(function(){
        $("#offInstructions").hide()
        $("body").css("backdrop-filter", "brightness(1)")
    })

    takeTest.click(function(){
        $("#offInstructions").show()
        $("body").css("overflow-x", "hidden")
        $("#filter").css("backdrop-filter", "brightness(0.2)")
    })

    $(".proceedButton").click(function(){
        $("#spinnerSection").show();
        
        var dataToSend = {
            courseCode: $("#cCodeSelect").text(),
            courseTitle: $("#cTitleSelect").text(),
            moduleTitle: activeModelTitle,   
            regNumber: $("#regNo").text()
        };
    
        var params = new URLSearchParams(dataToSend).toString();
    
        var url = "/heritage_students/user/take_test/1?" + params;
    
        setTimeout(function() {
            window.location.href = url;
        }, 3000);
    });
    

});

