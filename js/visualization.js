function quine(selector) {
    var code = document.createElement("code");
    var pre = document.createElement("pre");
    pre.textContent = document.getElementById(selector).textContent;
    code.append(pre);
    document.getElementById(selector + "View").append(code);
}

function lineChart(selector) {
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
        svgWidth = 500,
        horizontalMargin = margin.left + margin.right,
        vizWidth = svgWidth - horizontalMargin,
        x = d3.scaleLinear([0, vizWidth]),
        svgHeight = 200,
        verticalMargin = margin.top + margin.bottom,
        vizHeight = svgHeight - verticalMargin,
        y = d3.scaleLinear([vizHeight, 0]);

    var line = d3.line()
        .x(function(d, i) { return x(d[0]) })
        .y(function(d, i) { return y(d[1]) });

    function g(data) {

        const container = d3.selectAll(selector);

        var svg = container.selectAll("svg").data([data])
            .join(
              enter => enter.append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight),
              update => update
                .attr("width", svgWidth)
                .attr("height", svgHeight)
            );

        var canvas = svg.selectAll("g.canvas").data([data])
            .join(
              enter => enter.append("g")
                .classed("canvas", true)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
              update => update
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            );

      // Scale the range of the data
      x.domain(d3.extent(data.xs));
      y.domain(d3.extent(data.ys));

      var lines = canvas.selectAll("path").data(function(d) { return [data]; });
      lines.join(
          enter => enter.append("path")
            .classed("line", true)
            .attr("d", function(ys) { return line(d3.zip(data.xs, data.ys)); }),
          update => update
            .transition()
            .attr("d", function(ys) { return line(d3.zip(data.xs, data.ys)); })
        );

      // Add the X Axis
      var xAxis = canvas.selectAll("g.xAxis").data([data]);
      xAxis.enter()
          .append("g")
          .classed("xAxis", true)
          .attr("transform", "translate(0," + vizHeight + ")")
        .merge(xAxis)
          .transition()
          .call(d3.axisBottom(x));

      // add the y axis
      var yAxis = canvas.selectAll("g.yAxis")
        .data([data]);
      yAxis.enter()
          .append("g")
          .classed("yAxis", true)
        .merge(yAxis)
          .transition()
          .call(d3.axisLeft(y));

      // text label for the x axis
      var xLabel = canvas.selectAll(".xLabel").data([data]);
      xLabel.join(
        enter => enter.append("text")
            .classed("xLabel", true)
            .attr("transform",
                  "translate(" + (vizWidth / 2) + " ," + (vizHeight + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text((d) => d.xLabel),
        update => update
            .text((d) => d.xLabel)
      );

        // text label for the y axis
      var yLabel = canvas.selectAll(".yLabel").data([data])
        .join(
          enter => enter.append("text")
              .classed("yLabel", true)
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left)
              .attr("x", 0 - (vizHeight / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .text((d) => d.yLabel),
          update => update
              .text((d) => d.yLabel)
        )
    };

    return g;
}

function numberLine(selector) {
    var margin = {top: 5, right: 20, bottom: 50, left: 70},
        svgWidth = 500,
        horizontalMargin = margin.left + margin.right,
        vizWidth = svgWidth - horizontalMargin,
        x = d3.scaleLinear([0, vizWidth]),
        svgHeight = 100,
        verticalMargin = margin.top + margin.bottom,
        vizHeight = svgHeight - verticalMargin,
        selector = selector;

    function g(data) {

        const container = d3.selectAll(selector);

        var svg = container.selectAll("svg").data([data])
            .join(
              enter => enter.append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight));

        var canvas = svg.selectAll("g.canvas").data([data])
            .join(
              enter => enter.append("g")
                .classed("canvas", true)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
              update => update
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            );

        // Scale the range of the data
        x.domain(data.extent);

        // Add the X Axis
        var xAxis = canvas.selectAll("g.xAxis").data([data]);
        xAxis.enter()
            .append("g")
            .classed("xAxis", true)
            .attr("transform", "translate(0,0)")
          .merge(xAxis)
            .transition()
            .call(d3.axisBottom(x));

        // text label for the x axis
        var xLabel = canvas.selectAll(".xLabel").data([data]);
        xLabel.join(
          enter => enter.append("text")
              .classed("xLabel", true)
              .attr("transform",
                    "translate(" + (vizWidth / 2) + ", 35)")
              .style("text-anchor", "middle")
              .text((d) => d.xLabel),
          update => update
              .text((d) => d.xLabel)
          );

        var circles = canvas.selectAll("circle").data(data.points);
        circles.enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", "steelblue")
          .merge(circles)
            .transition()
            .attr("cx", function(d) { return x(d); })
            .attr("cy", 0);

    }

    return g;
}

function numberLineControlledLineChart(selection) {
  var root = d3.select(selection);

  root.append("div")
    .classed("lineChart", true);

  root.append("div")
    .classed("numberLine", true);

  var chartSelector = selection + " div.lineChart",
      numberLineSelector = selection + " div.numberLine",
      data = {},
      c = lineChart(chartSelector),
      l = numberLine(numberLineSelector);

  var g = function(data) {
    c(data.result);
    l(data.control);
  };


  g.data = function(d) {
    data = d;
    return g;
  }


  g.animate = function() {
    console.log("Called animate.");
    var index = 0,
        increment = 1,
        d = data;
    g(d[index]);

    setInterval(function() {
      g(d[index]);
      index += increment;
      if (index == d.length) {
        index = d.length - 1;
        increment = -1;
      }
      else if (index < 0) {
        index = 0;
        increment = 1;
      }
    }, 500);

    return g;
  }
  return g;
}


$(document).ready(function() {
  window.d3VizInits.forEach(function(viz) { viz(); });
});
