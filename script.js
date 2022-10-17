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
    // change the measure dynamically:
    //  d[type] where type is either "stores" or "revenue"
    const xScale = d3
        .scaleBand()
        .domain(d3.max(data.map(d => d.company)))
        .rangeRound([0, width])
        .paddingInner(0.1);

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.map(d => d.stores)))
        .range([height, 0]);

    // manually update axes and axis title
    // create axes and axis title containers
    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(d3.axisLeft(yScale).ticks(5, "s"));
    svg.append('g')
        .attr('class', 'axis x-axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    svg.append("text")
        .attr("class", "y-axis-title")
        .attr('x', width - 50)
        .attr('y', 450)
        .text(type);

    data.sort();
    sortedLargestFirst = true;
    document.getElementById('button').onclick = function() {
        data.reverse();
    };
	// update domains
    xScale.domain(data.map(d => d.company));
    yScale.domain(data.map(d => d.stores));

    // update bars
    const bars = svg
        .selectAll('.rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("x", function(d) { return xScale(d.company); })
        .attr("y", function(d) { return height - ((1/20) * d.stores); })
        .attr("height", function(d) { return  ((1/20)* d.stores); })
        .attr("width", xScale.bandwidth())
        .attr("fill", "rgb(53, 102, 165)")
        .text(function(d) { return d.company; })

    svg.selectAll('.bar')
        .data(data)
        .attr('x', start)
        .merge()
        .transition()
        .duration(1000)
        .attr('x', end);

    // implement the enter-update-exist sequence

    // add a data key function (use company name as a key)
}

// CHART UPDATES ---------------------------
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
    console.log(data)
    update(data);
});

// (Later) Handling the type change

// (Later) Handling the sorting direction change