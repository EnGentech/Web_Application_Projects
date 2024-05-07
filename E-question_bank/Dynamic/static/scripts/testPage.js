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
});
