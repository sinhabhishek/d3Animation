'use strict';
$(function(){
  // Setting up the chart area
  var margin = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 60
  };

  var canvasWidth = 400;
  var canvasHeight = 300;
  var width = canvasWidth - margin.left - margin.right;
  var height = canvasHeight - margin.top - margin.bottom;
  var svg = d3.select('svg')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);
  // Add area for points
  var graphArea = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  var xScale;
  var yScale;
  var zScale;

  var cValue = function(cat)

  { if (cat == "Arsenal") {return "green";}
    if (cat == "Chelsea") {return "blue";}
    if (cat == "Liverpool") {return "orange";}
    if (cat == "Manchester") {return "red";}
    return "black";
  };

    var xColumn = "Fouls_1";
    var yColumn = "Goals_1";

  // Step 1: edit data.csv to include the data you want to show
  d3.csv('data.csv', function(data) {
    // Step 2: Create x and y scales (scaleLinear) to draw points.
    // Set xScale and yScale to the scales so you can use them outside this function.

    // Add code here
    xScale = d3.scaleLinear().domain([0, 8]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, 8]).range([height, 0]);
    zScale = d3.scaleLinear().domain([0, 8]).range([0, 20]);

    // Step 3: Add code to color the points by category (add code here or above)
    graphArea.selectAll("circle").data(data).enter().append("circle")
    .attr("cx", function(d)
    {
      return xScale(parseFloat(d[xColumn]));
    })
    .attr("cy", function(d)
    {
      return yScale(parseFloat(d[yColumn]));
    })
    .attr("r", function(d) {return zScale(d[yColumn]);}).style("fill", function(d)
    {
      return cValue(d["team"]);
    })

    // Add axes (uncomment this code to add axes)
    graphArea.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height) + ')')
    .call(d3.axisBottom(xScale));

    // source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
    svg.append("text")
    .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.top + 40) + ")")
    .style("text-anchor", "right")
    .text("Fouls Conceded");

    graphArea.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale));

    // source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 + (margin.left/6))
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Goals Scored");

  });

  // Animate points
  var originalGame = 1;
  var maxGame = 5;
  var Game = originalGame;
  d3.select('#nextButton').on('click', function(event) {
    // console.log("clicked");
    // console.log(Game);
    if (Game == maxGame) {
      Game = originalGame;
    } else {
      Game = Game + 1;
    }
    var xColumn = 'Fouls_' + String(Game);
    var yColumn = 'Goals_' + String(Game);

    // Step 4: Animate changing the points shown by Game here
    // Step 5: make some other change to the graph

    // Add code here
    d3.selectAll('circle').transition().delay(500).duration(1500)
    .attr("cx", function(d) {return xScale(d[xColumn]);})
    .attr("cy", function(d) {return yScale(d[yColumn]);})
    .attr("r", function(d) {return zScale(d[yColumn]);})
    .ease(d3.easeBounce);
    var obj = d3.selectAll("span").text(Game);
    // console.log(obj);

  });

});
