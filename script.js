// CHART INIT ------------------------------
var margin = {top: 20, right: 10, bottom: 20, left: 50};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// (Later) Define update parameters: measure type, sorting direction

// CHART UPDATE FUNCTION -------------------
function update(data, type) {
    // change the measure dynamically:
    //  d[type] where type is either "stores" or "revenue"
    const xScale = d3
        .scaleBand()
        .domain(d3.extent(data.map(d => d.company)))
        .rangeRound([0, width])
        .paddingInner(0.1);

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d[type])])
        .range([height, 0]);

    // update domains
    // xScale.domain(data.map(d => d.company));
    // yScale.domain(data.map(d => d[type]));

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(d3.axisLeft(yScale).ticks(5, "s"));

    svg.append("text")
        .attr("class", "y-axis-title")
        .attr('x', 0)
        .attr('y', -5)
        .text(type.charAt(0).toUpperCase() + type.slice(1))

    // update bars
    const rects = svg
        .selectAll('.rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "rect")
        .attr("x", function(d) { return xScale(d.company); })
        .attr("y", function(d) { return height -  yScale(d[type]); })
        .attr("height", function(d) { return Math.abs(yScale(d[type])); })
        .attr("width", xScale.bandwidth())
        .attr("fill", "rgb(53, 102, 165)")
        .text(function(d) { return d.company; });

        // rects.exit()
        //     .transition()
        //     .duration(1000)
        //     .attr('fill', 'cyan')
        //     .attr('opacity', 0.0)
        //     .attr("x", width)
        //     .remove();

        // svg.selectAll('.rect')
        // .data(data)
        // .attr('x', start)
        // .merge()
        // .transition()
        // .duration(1000)
        // .attr('x', end);

    // implement the enter-update-exist sequence

    // add a data key function (use company name as a key)
}

let type = "revenue";
// CHART UPDATES ---------------------------
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
    // d3.select("#group-by").on('change', () => {
    //     type = d3.select("#group-by").node().value;
    //     update(data, type);
    // });
    data = data.sort((a, b) => {
        return d3.descending(a[type], b[type]);
    });
    update(data, type);
});

// (Later) Handling the type change

// (Later) Handling the sorting direction change