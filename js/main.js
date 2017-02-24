/**
 * Created by Biko on 14.02.2017.
 */

var jsonData, evaluated, percent = {
    "ceo": 0,
    "maxCeo": 0,
    "fin": 0,
    "maxFin": 0,
    "tec": 0,
    "maxTec": 0,
    "questionsAnswered": 0
};

function initQuestions() {

    var questionsCode = "";

    $.getJSON("resources/data/questions.json", function (data) {
        console.log("iniQ");
        self.jsonData = data;
        questionsCode += "<div class='container'>" + "<div class='panel-group'>";
        $.each(shuffle(data), function (key, question) {
            questionsCode +=
                "<div class='panel panel-default panel-relative' >" +
                "<div class='panel-heading'>" + question.question + "</div>" +
                "<div class='panel-body'>" + "<h3 class='question-answered-text'>Question answered!...</h3>" +
                "<div class='form-group question-form' id='question-form-" + (key + 1) + "'>";
            $.each(shuffle(question.answers), function (answerKey, answer) {
                questionsCode += "<div class='radio'>"
                    + "<label><input " + (answer.ceo ? "data-ceo='" + answer.ceo + "'" : "") + (answer.fin ? "data-fin='" + answer.fin + "'" : "") + (answer.tec ? "data-tec='" + answer.tec + "'" : "") + "type='radio' name='question-" + (key + 1) + "'>" + answer.text + "</label>"
                    + "</div>";


            });
            questionsCode += "<button onclick='lockChoice(this)' type='button' class='btn btn-primary'>Lock choice</button>" +
                "</div></div></div>";
        });

        $(".questions-form").append(questionsCode);

    });

}
initQuestions();

function lockChoice(scope) {
    var questionIndex = $(scope).parent().attr("id").split("-")[2];
    var selectedAnswer = $("form input[name=question-" + questionIndex + "]:checked")[0];
    if (selectedAnswer) {


        console.debug("lockedChoice:", scope, "selectedAnswer:", $(selectedAnswer), "questionIndex:", questionIndex);

        //lock question
        $("#question-form-" + questionIndex).addClass("question-answered").fadeIn(250);
        $("#question-form-" + questionIndex).siblings(".question-answered-text").fadeIn(250);
        self.percent.ceo += ($(selectedAnswer).attr("data-ceo") ? parseInt($(selectedAnswer).attr("data-ceo"), 10) : 0);
        self.percent.fin += ($(selectedAnswer).attr("data-fin") ? parseInt($(selectedAnswer).attr("data-fin"), 10) : 0);
        self.percent.tec += ($(selectedAnswer).attr("data-tec") ? parseInt($(selectedAnswer).attr("data-tec"), 10) : 0);

        self.percent.maxCeo += ($(selectedAnswer).attr("data-ceo") ? 1 : 0);
        self.percent.maxFin += ($(selectedAnswer).attr("data-fin") ? 1 : 0);
        self.percent.maxTec += ($(selectedAnswer).attr("data-tec") ? 1 : 0);
        self.percent.questionsAnswered += 1;


        console.info("currentPercentage:", self.percent);

    }


}


function interpretResult() {
    if (self.percent.questionsAnswered == self.jsonData.length && !evaluated) {
        evaluated = true;
        $("#result-heading").text("You are suitable for becoming " +
            "" + (self.percent.ceo / self.percent.maxCeo * 100 > 50 && self.percent.ceo >= self.percent.fin && self.percent.ceo >= self.percent.tec ? "a Chief executive officer."
                : self.percent.fin / self.percent.maxFin * 100 > 50 && self.percent.fin >= self.percent.ceo && self.percent.fin >= self.percent.tec ? "a Chief financial officer."
                : self.percent.tec / self.percent.maxTec * 100 > 50 && self.percent.tec >= self.percent.fin && self.percent.tec >= self.percent.fin ? "Chief technical officer."
                : "none of the evaluated positions, unfortunately." ));
        var message;
        var ceo = self.percent.ceo / self.percent.maxCeo;
        var fin = self.percent.fin / self.percent.maxFin;
        var tec = self.percent.tec / self.percent.maxTec;

        //switch for displaying the according answer for CEO position
        message = "As a <b>CEO</b> responsibilities include decision maker on strategy and other key policy issues, leader, manager, and executor." +
            " The communicator role can involve speaking to the press and the rest of the outside world, as well as to the organization's management and employees. <br>";
        switch (true) {
            case ceo > 0.9:
                message += "Your outrageous abilities allow you to become an extra ordinary CEO.";
                break;
            case ceo > 0.75:
                message += "You appear to have quite proficient knowledge about the management sector.";
                break;
            case ceo > 0.5:
                message += "Your abilities are certainly sufficient for becoming a ceo. There is still some work to do but you are on the right track.";
                break;
            default:
                message += "Unfortunately, the answers you have provided us with do not fulfill the requirements in order to become a CEO.";
                break;
        }
        message += "<br><br><b>CFOs</b> primarily responsible for managing the financial risks of the corporation. " +
            "This officer is also responsible for financial planning and record-keeping, as well as financial reporting to higher management." +
            "<br>Concerning your chief financial officer abilities, ";

        //switch for displaying the according answer for CFO position
        switch (true) {
            case fin > 0.9:
                message += "Your result is a sublime paragon for any other applicant. Any company should certainly put you in their short list. ";
                break;
            case fin > 0.75:
                message += "Your financial abilities would make you a well rounded finance officer. Just a slight improvements necessary to make you a paragon. ";
                break;
            case fin > 0.5:
                message += "Your result states your skills are not well adjusted for this kind of position. ";
                break;
            default:
                message += "You do not show any skill in this field, we advice you to find another position. ";
                break;
        }

        //switch for displaying the according answer for CTO position
        message += "<br><br>As a <b>CTO </b>your main occupation is focused on scientific and technological issues within an organization." +
            " <br>In terms of your technical skills, ";
        switch (true) {
            case tec > 0.9:
                message += "your capabilities in CTO sector make you the perfect employee.";
                break;
            case tec > 0.75:
                message += "you possess decent skills in the CTO apartment.";
                break;
            case tec > 0.5:
                message += "You are capable of basic interactions in the technical sector, but not exceedingly good.";
                break;
            default:
                message += "I am afraid you have not yet required sufficient know how and are not acquainted enough to land a job in this area.";
                break;
        }

        //switch for displaying an general message adjusted to the given input
        message += "<br><br><b>Overall</b>, ";
        switch (true) {
            case ceo > 0.75 && fin > 0.75 && tec > 0.75:
                message += "your performance was off the charts. Anyone looking for a proficient workforce will be more than satisfied. Congratulations.";
                break;
            case ceo > 0.5 && fin > 0.5 && tec > 0.5:
                message += "you have managed to score positively in each job area. I can proudly say that you are on your way of becoming a proficient working force.";
                break;
            default:
                message += "your performance has shown that you are not suitable in each of the respective job areas.Consider taking additional courses in this field of application to enhance your abilites. I am sorry but quite certain that with enough ambition you can " +
                    "exceed all expectations.";
        }

        message += "<br><br>Thank you for taking our assessment. Hopefully this test allowed you to form a clearer opinion about what you want to do as a profession. ";

        $.ajax(
            {
                type: "GET",

                url: 'results.php',
                data: {
                    data: JSON.stringify({
                        "ceo": self.percent.ceo / self.percent.maxCeo,
                        "fin": self.percent.fin / self.percent.maxFin,
                        "tec": self.percent.tec / self.percent.maxTec
                    })
                }

            }).done(function (data) {
            console.log("success");
            initializeGraphics();

        });
        console.log(message);
        $("#result-body").html("<p class='lead'>" + message + "</p>");
        $("#result-panel").show();


        var offset = $("#result-panel").offset();
        $('html, body').animate({
            scrollTop: offset.top - 40,
            scrollLeft: offset.left
        });
        console.info("final Percentage:", self.percent);
    } else {
        console.info("jsonData length:", jsonData.length, "maxCeo value:", self.percent.maxCeo);
        $("#not-finished-modal").modal();
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}