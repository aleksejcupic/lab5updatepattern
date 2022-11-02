// CHART INIT ------------------------------
const margin = ({top: 50, right: 50, bottom: 50, left: 50})  
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const xScale = d3
    .scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.1);

const yScale = d3
    .scaleLinear()
    .range([height, 0]);

svg.append('g')
    .attr('class', 'y-axis');

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`);

const title = svg.append("text")
    .attr("class", "y-axis-title")
    .attr("text-anchor", "end")
    .attr("y", -15)
    .attr("dy", ".75em")
    .attr("dx", ".2em")
    // .attr("transform", "rotate(-90)")
    .style("font", "12px times")
    // .text("yAxis")

// CHART UPDATE FUNCTION -------------------
function update(data, type) {
    // update domains
    xScale.domain(data.map(d => d.company));
    yScale.domain([0, d3.max(data, d => d[type]) + 10]);

    title.text(function(){return type.charAt(0).toUpperCase() + type.slice(1);})

    // update bars
    const bars = svg
        .selectAll('rect')
        .data(data, d => d)
        .attr('class', 'bar');

    bars
        .enter()
        .append('rect')
        .attr("fill", "rgb(53, 102, 165)")
        .attr("x", 0)
        .attr("y", function(d) { return yScale(d[type]); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d[type]); })
        .attr("opacity", 0.0)
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('fill', "rgb(53, 102, 165)")
        .attr("opacity", 1.0)
        .attr('x', (d, i) => i * 50)
        .attr('y', d => yScale(d[type]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[type]));

    bars
        .exit()
        .transition()
        .duration(1000)
        .attr('fill', 'white')
        .attr('opacity', 0.0)
        .attr('x', width)
        .remove()
        .text(function(d) { return d.company; });

    const xAxis = d3.axisBottom(xScale);
    svg.select(".x-axis")
      .transition()
      .duration(1000)
      .call(xAxis);
    
    const yAxis = d3.axisLeft(yScale).ticks(4);
    svg.select(".y-axis")
      .transition()
      .duration(1000)
      .call(yAxis);
}

let type = d3.select("#group-by").node().value;

// CHART UPDATES ---------------------------
d3.csv('./coffee-house-chains.csv', d3.autoType).then(data => {
    d3.select("#group-by").on('change', () => {
        type = d3.select("#group-by").node().value;
        update(data, type);
    });
    data = data.sort((a, b) => {
        return d3.descending(a[type], b[type]);
    });
    update(data, type);
});