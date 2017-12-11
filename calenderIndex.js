(function() {

  var margin = { top: 15, left: 0, right: 0, bottom: 0},
    height = 40 - margin.top - margin.bottom,
    width = 900 - margin.left - margin.right;

  var svg = d3.select("#calIndex")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleBand()
    .domain(["0", "1", "2", "3", "4", "5", "6"])
    .range([240, 800])
    .padding(0.5);

  var colorScale = d3.scaleQuantize()
      .domain([0, 6])
      .range(['#ffffff','#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']);

  d3.queue()
    .defer(d3.csv, "RawData/index.csv", function(d) {
      d['0'] = +d['0']
      return d
    })
    .await(ready);


  function ready(error, datapoints) {
    console.log(datapoints)

    svg.selectAll("rect")
        .data(datapoints)
        .enter().append("rect")
        .attr("height", 17)
        .attr("width", 17 )
        .attr("y", 0)
        .attr("x", function(d, i) { return xPositionScale(d['0'])})
        .attr("fill", function(d) { return colorScale(d['0'])})
        .attr("stroke", 'black')

    svg.selectAll("text")
        .data(datapoints)
        .enter().append("text")
        .attr("y", 14)
        .attr("x", function(d, i) { return xPositionScale(d['0'])})
        .text(function(d) { return d['0'] })
        .attr("dx", 30)
        .attr("font-size", 14)
        .attr("fill", 'black')
        .attr("font-family", "Helvetica")


    svg.append("text")
        .attr("y", 14)
        .attr("x", 0)
        .text("Number of shootings happend on a certain day:")
        .attr("font-size", 16)
        .attr("fill", 'black')
        .attr("font-family", "Helvetica")
    }
  
})();