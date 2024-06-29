$(document).ready(function(){
    let generateList = $("#genList");
    let arrayList;
    let courseCode = $("#cCode")
    let loadTask = $("#taskName")
    let scoreSection = $("#scoreSection")

    loadTask.on("change", function(){
        scoreSection.hide()
    })

    let taskList = {
        "CTE323": "assignments/pythonTasks.json",
        "COM122": "assignments/internetTasks.json",
        "EED126": "assignments/entrepreneur.json",
        "ICT102": "assignments/vb.json",
        "COM321": "assignments/osTasks.json",
    }

    function onStudentNameChange(mutations) {
        let studentName = $("#fullName").text().trim();
        if (studentName === "-- Select Reg Number --") {
            $("#score").prop("readonly", true);
        } else {
            $("#score").prop("readonly", false);
            $("#score").attr("placeholder", "Enter score")
        }
    }

    function listStudents(filePath) {
        url = '/heritage_students/user/submitAssessment/ajax/'
        let csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                filePath: filePath
            },
            dataType: "json",
            success: function (response) {
                if (response) {
                    loadTask.empty();
                    loadTask.append(`<option value="" disabled selected>Select Task</option>`);
                    let data = response.dataResponse;
                    $.each(data, function(index, element) {
                        loadTask.append(`<option value="${element}">${element}</option>`);
                    });
                }
            },
            error: function(error) {
                console.log(error)
            }
        });
    }

    function loadTaskList(){
        loadTask.on("change", function(){
            let task = $(this).val()
            if (task) {
                generateList.show()
            } else {
                generateList.hide()
            }
        })
    }

    courseCode.on("change", function(){
        let obtainedCode = $(this).val()
        if (obtainedCode) {
            listStudents(taskList[obtainedCode])
            loadTaskList()
        } else {
            loadTask.empty();
            loadTask.append(`<option value="" disabled selected>Select Target Task</option>`);
            generateList.hide()
        }
    })

    generateList.click(function(event){
        let cTitle = $("#cTitle").val();
        let faculty = $("#faculty").val();
        let department = $("#department").val();
        let level = $("#level").val();
        let semester = $("#semester").val();
        let courseCode = $("#cCode").val();
        event.preventDefault()

        if (cTitle) {
            let csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
            let url = "/staff/scoreBoard/";
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    courseTitle: cTitle,
                    faculty: faculty,
                    department: department,
                    level: level,
                    semester: semester,
                    courseCode: courseCode,
                    task: loadTask.val()
                },
                dataType: "json",
                headers: {
                    'X-CSRFToken': csrftoken
                },
                success: function (response) {
                    let regNoList = $("#regNo");
                    regNoList.empty();
                    regNoList.append(`<option value="" disabled Selected>Select Reg. Number</option>`);
                    let data = response.data;
                    arrayList = data;
                    if (data){
                        $.each(data, function(index, element) {
                            regNoList.append(`<option value="${index}">${index}</option>`);
                        });
                        scoreSection.show();
                        $("#noneRegistered").hide();
                    }

                },
                error: function (error) {
                    $("#noneRegistered").show();
                    scoreSection.hide();
                }
            });
        } else {
            alert("All fields are required")
        }
    });

    let regNoList = $("#regNo");

    regNoList.on("change", function(){
        let regNo = $(this).val();
        let fullName = $("#fullName");
        let url = $("#urlLink");
        let score = $("#score");
        let remark = $("#textArea");
        if (regNo === "Select Reg. Number") {
            fullName.text("-- Select Reg Number --");
            url.attr("href", "#");
            score.val("")
            remark.val("")
        } else {
            let newUrl = arrayList[regNo]["url"];
            url.attr("href", `${newUrl}`);
            score.val(arrayList[regNo]["score"])
            remark.val(arrayList[regNo]["remark"])
            fullName.text(arrayList[regNo]["fullName"]);
        }
    });

    // Create a MutationObserver instance
    const observer = new MutationObserver(onStudentNameChange);
    const config = { childList: true, subtree: true };
    observer.observe(document.getElementById("fullName"), config);
    onStudentNameChange();

    let submitBtn = $("#submitScoreSection")
    let scoreTracker = $("#score");

    let submitscore = $("#submitScore");
    submitBtn.click(function(event){
        event.preventDefault();
        let faculty = $("#faculty").val();
        let department = $("#department").val();
        let level = $("#level").val();
        let semester = $("#semester").val();
        let cCode = $("#cCode").val();
        let taskName = loadTask.val();
        let regNo = $("#regNo").val();
        let score = scoreTracker.val();
        let remark = $("#textArea").val();

        let loadingDots = $("#loadingDots");
        loadingDots.show();
        let dotsCount = 0;
        let dotsInterval = setInterval(function() {
            dotsCount = (dotsCount % 3) + 1;
            loadingDots.text(".".repeat(dotsCount));
        }, 500);

        $.ajax({
            type: "POST",
            url: "/staff/updateScores/",
            data: {
                faculty: faculty,
                department: department,
                level: level,
                semester: semester,
                cCode: cCode,
                taskName: taskName,
                regNo: regNo,
                score: score,
                remark: remark
            },
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
            success: function (response) {
                clearInterval(dotsInterval);
                loadingDots.hide();

                alert("Scores successfully uploaded");

                $("#regNo option:selected").remove();

               if ($("#regNo option").length > 1) {
                    let nextRegNo = $("#regNo").val();
                    let nextName = $("#regNo option:selected").text();
                    let nextUrl = "";

                    $("#regNo").val(nextRegNo).trigger("change");
                    $("#name").val(nextName);
                    $("#url").val(nextUrl);
                    $("#url").attr("title", nextURL)
                } else {
                    $("#regNo").val("Completed");
                    $("#fullName").text("Completed");
                    $("#url").val("#");
                }

                scoreTracker.val(0);
            },
            error: function(xhr, status, error) {
                clearInterval(dotsInterval);
                loadingDots.hide();
                alert("An error occurred while uploading scores");
            }
        });
    });


    scoreTracker.on("input", function(){
        let score = $(this).val();
        if (score < 0 || score > 100) {
            setTimeout(() => {
                submitBtn.hide()
                alert("Score must be between 0 and 100");
            }, 200);
        } else {
            submitBtn.show();
        }
    })

});
