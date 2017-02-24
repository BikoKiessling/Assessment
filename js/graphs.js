/**
 * Created by Biko1 on 22.02.2017.
 */

function initializeGraphics()
{
$("#ceo-circle").circliful({
    foregroundColor: "orange",
    animation: 1,
    animationStep: 6,
    foregroundBorderWidth: 5,
    backgroundBorderWidth: 1,
    percent: self.percent.ceo/self.percent.maxCeo*100,
    text: "CEO",
    animateInView: true,
    iconPosition: 'middle'
});

    $("#fin-circle").circliful({
        foregroundColor: "limegreen",
        animation: 1,
        animationStep: 6,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 1,
        percent: self.percent.fin/self.percent.maxFin*100,
        text: "CFO",
        animateInView: true,
        iconPosition: 'middle'
    });

    $("#tec-circle").circliful({
        foregroundColor: "darkcyan",
        animation: 1,
        animationStep: 6,
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 1,
        percent: self.percent.tec/self.percent.maxTec*100,
        text: "CTO",
        animateInView: true,
        iconPosition: 'middle'
    });


    $('#result-radar').radarChart({
        size: [500,500],
        step: 1,
        title: "Radar chart evaluation: ",
        values: (function(){
            return{
                "CEO": self.percent.ceo/self.percent.maxCeo*5,
                "CFO": self.percent.fin/self.percent.maxFin*5,
                "CTO": self.percent.tec/self.percent.maxTec*5

            }
        }()),
        showAxisLabels: true
    });
    $("#result-bar").jChart({
        name: "Median result of total evaluations in percent:",
        headers: ["Chief executive officer", "Chief fincancial officer", "Chief technical officer"],
        values: (function () {

            var result;
            $.ajax({
                type: 'GET',
                url: 'resources/data/results.json',
                dataType: 'json',
                async: false,
                success: function (data) {
                    result = data;
                }
            });
            console.info("result.json: ", result);
            return [Math.round(result.ceo / result.amount * 100), Math.round(result.fin / result.amount * 100), Math.round(result.tec / result.amount * 100)];


        }()),
        footers: [25, 50, 100],
        colors: ["#1000ff", "#006eff", "#00b6ff"]
    });
}



