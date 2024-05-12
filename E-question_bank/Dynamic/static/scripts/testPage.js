$(document).ready(function() {
    $("#submit").hide()
    $("#prev").hide()
    let selectedAnswers = {};
    let csrftoken = $('input[name="csrfmiddlewaretoken"]').val()

    const updateSelectedAnswer = (question, answer) => {
        selectedAnswers[question] = answer;
    };

    function assignID(){
        $('.question').each(function(index) {
            var questionIndex = index + 1;
            $(this).find('.optionSelect').each(function(optionIndex) {
                var optionIndexWithQuestion = optionIndex + 1 + (questionIndex - 1) * 4;
                var optionId = 'option' + optionIndexWithQuestion;
                $(this).attr('id', optionId);
                $(this).closest('.options').find('label').eq(optionIndex).attr('for', optionId);
            });
        });
    }

    assignID()

    $(document).on('click', '.optionSelect', function() {
        var questionID = $(this).closest('.question').find(".questionID").text();
        var selectedOption = $(this);
        selectedOption.prop("checked", true)
        updateSelectedAnswer(questionID, selectedOption.val())
    });

    // Event listener for 'Next' button
    $(document).on("click", "#next", function(){
        var increase = $("#countPage").text();
        increase++;

        $.ajax({
            type: "GET",
            url: `/heritage_students/user/take_test/${increase}`,
            data: "data",
            success: function (response) {
                var questionContent = $(response).find('.questionSection').html();
                $('.questionSection').html(questionContent);

                $.each(selectedAnswers, function(question, answer) {
                    question = question.trim();
                    answer = answer.trim();
                
                    const $question = $(".questionID").filter(function() {
                        return $(this).text().trim() === question;
                    });
                
                    $question.closest('.question').find('.optionSelect').each(function() {
                        if ($(this).val() === answer) {
                            $(this).prop('checked', true);
                        }
                    });
                });

                assignID()
                               
                $("#submit").hide()
                if (increase == $(".totalPage").text()){
                    $("#next").hide()
                    $("#submit").show()
                } else {
                    $("#submit").hide()
                }
            },
            error: function (response) {
                console.log(response)
            }
        });
    });

    // Event listener for 'Previous' button
    $(document).on("click", "#prev", function(){
        var decrease = $("#countPage").text();
        decrease--;
        $("#prev").hide()       
        $.ajax({
            type: "GET",
            url: `/heritage_students/user/take_test/${decrease}`,
            data: "data",
            success: function (response) {
                var questionContent = $(response).find('.questionSection').html();
                $('.questionSection').html(questionContent);
                $.each(selectedAnswers, function(question, answer) {
                    question = question.trim();
                    answer = answer.trim();
                
                    const $question = $(".questionID").filter(function() {
                        return $(this).text().trim() === question;
                    });
                
                    $question.closest('.question').find('.optionSelect').each(function() {
                        if ($(this).val() === answer) {
                            $(this).prop('checked', true);
                        }
                    });
                });

                assignID()

                $("#submit").hide()
                if (decrease == 1){
                    $("#prev").hide()
                }
                               
            },
            error: function (response) {
                console.log(response)
            }
        });
    });

    // Time construct
    let timer = $("#duration").text().split("mins");
    let mins = parseInt(timer[0]);
    let secs = 0;

    const countdown = () => {
        if (mins === 0 && secs === 0) {
            clearInterval(interval);
            return;
        }
        if (secs === 0) {
            mins--;
            secs = 59;
        } else {
            secs--;
        }
        $("#duration").text(`${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs} mins`);
        $("#duration").css("color", "rgba(0, 0, 69)")
        if ((mins <= 5) && (secs === 0)){
            $("#duration").css("color", "red")
        }
    };
    const interval = setInterval(countdown, 1000);

    // Submit event handler
    $(document).on("click", "#submit", function(event){
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/heritage_students/user/take_test/1",
            data: JSON.stringify({
                "quiz": selectedAnswers,
            }),
            contentType: "application/json",
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function (response) {
                const score = response.score;
                $("#numerator").text(score);
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            },
            error: function (response) {
                //console.log(response)
            }
        });
    });
});
