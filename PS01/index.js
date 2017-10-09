

/* Your code goes here */

var svg = d3.select('svg').append("g").attr("transform", "translate(100,100)");

var allData;

var scaleX= d3.scaleLinear().domain([2002, 2015]).range([0,600]);
var scaleY = d3.scaleLinear().domain([50,0]).range([0,400]);

var currentYear = "2015"

d3.csv('./data.csv', function(dataIn){
    dataIn.forEach(function(d){
        d.x = +d.x;
        d.y = +d.y;
    })

    allData = dataIn;

    console.log(dataIn)

    var data2015 = dataIn.filter(function(d){
        return d.Date == 2015;
         console.log(data2015)
     });
    svg.selectAll('circle')
        .data(dataIn)
        .enter()
        .append('circle')
        .attr('class','myCircles');

    svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(scaleX));

    svg.append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(scaleY));

    updatedata(dataIn);
});

function updatedata(dataPoints){

    svg.selectAll('.myCircles')
        .data(dataPoints)
        .attr('cy', function(d){
            return scaleY(d.y);
        })
        .attr('cx', function(d){
            return scaleX(d.x);
        })
        .attr('r', 10)
        .attr("fill", "blue")
        .attr("opacity",.25)

}
function buttonClicked(){

    if (currentYear == "2015"){
        data2015 = allData.filter(function(d){
            return d.x == 2015;
        });

        currentYear = "2014";
        updatedata(data2015);
    }
    else {
        data2014 = allData.filter(function(d){
            return d.x == 2014;
        });
        currentYear = "2015";
        updatedata(data2014);

    }

}

window.setInterval(function(){
    buttonClicked();
},1000)