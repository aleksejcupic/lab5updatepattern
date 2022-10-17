// CHART INIT ------------------------------
document.querySelector('#group-by option:checked').value;

var margin = {top: 20, right: 10, bottom: 20, left: 10};

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
    const xScale = d3
        .scaleBand()
        .domain(d3.extent(data.map(d => d.company)))
        .rangeRound([0, width])
        .paddingInner(0.1);

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.map(d => d[type])))
        .range([height, 0]);

    // create axes and axis title containers
    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(d3.axisLeft(yScale));
    svg.append('g')
        .attr('class', 'axis x-axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks(5, "s"));
    svg.append("text")
        .attr("class", "y-axis-title")
        .text(type);

    data.sort();
    sortedLargestFirst = true;
    document.getElementById('button').onclick = function() {
        data.reverse();
    };
	// update domains
    // xScale.domain(data.map(d => d.company));
    // yScale.domain(data.map(d => d.type));

    // update bars
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("x", function(d) { return xScale(d.Company); })
        .attr("y", function(d) { return yScale(d[type]); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d[type]); })
        .attr("fill", "#69b3a2")

    // implement the enter-update-exist sequence

	// manually update axes and axis title
    // d3.max(data, d => d[type])
    // const xScale = d3
    //     .scaleBand()
    //     .domain(d3.extent(data.map(d => d.company)))
    //     .rangeRound([0, width])
    //     .paddingInner(0.1);
    // const yScale = d3
    //     .scaleLinear()
    //     .domain(d3.extent(data.map(d => d[type])))
    //     .range([height, 0]);

    // change the measure dynamically:
    //  d[type] where type is either "stores" or "revenue"
    // svg.append('g')
    //     .attr('class', 'axis y-axis')
    //     .call(d3.axisLeft(yScale));
    // svg.append('g')
    //     .attr('class', 'axis x-axis')
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(xScale).ticks(5, "s"));
    // svg.append("text")
    //     .attr("class", "y-axis-title")
    //     .text(type);

    // add a data key function (use company name as a key)

    // svg.selectAll('.bar')
    // .data(data)
    // .attr('x', start)
    // .merge()
    // .transition()
    // .duration(1000)
    // .attr('x', end);
}

// CHART UPDATES ---------------------------
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
    update(data);
});

// (Later) Handling the type change

// (Later) Handling the sorting direction change