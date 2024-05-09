$(document).ready(function() {
    $('.question').each(function(index) {
        var questionIndex = index + 1;
        $(this).find('.optionSelect').each(function(optionIndex) {
            var optionIndexWithQuestion = optionIndex + 1 + (questionIndex - 1) * 4;
            var optionId = 'option' + optionIndexWithQuestion;
            $(this).attr('id', optionId);
            $(this).closest('.options').find('label').eq(optionIndex).attr('for', optionId);
        });
    });
    
    $(document).on("click", "#next", function(){
        var increase = $("#countPage").text()
        increase++;
        $.ajax({
            type: "GET",
            url: `/heritage_students/user/take_test/${increase}`,
            data: "data",
            success: function (response) {
                var questionContent = $(response).find('.questionSection').html();
                $('.questionSection').html(questionContent);
            },
            error: function (response) {
                console.log(response)
            }
        });
    });

    
    $(document).on("click", "#prev", function(){
        var decrease = $("#countPage").text()
        decrease--;
        $.ajax({
            type: "GET",
            url: `/heritage_students/user/take_test/${decrease}`,
            data: "data",
            success: function (response) {
                var questionContent = $(response).find('.questionSection').html();
                $('.questionSection').html(questionContent);
            },
            error: function (response) {
                console.log(response)
            }
        });
    });
    
});
