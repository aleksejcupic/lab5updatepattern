// CHART INIT ------------------------------
let type = d3.select().node() 
document.querySelector() // access value property 

var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create scales without domains
    // ordinal scale using scaleBand()
    // data.map(d => d.company) to derive company names
    // rangeRound() to avoid aliasing 
    // paddingInner(0.1)
const xScale = d3.scaleBand()
var x = d3.scaleBand.scaleOrdinal()
.range([0, width]);

const yScale = d3.scale.linear()
    .range([height, 0]);

svg.append('g')
    .attr('class', 'axis y-axis');
svg.append('g')
    .attr('class', 'axis x-axis')
    // more
    ;
svg.appen("text")
    .attr("class", "y-axis-title")
    // more 
    ;

// create axes and axis title containers

// (Later) Define update parameters: measure type, sorting direction

// CHART UPDATE FUNCTION -------------------
function update(data){
	// update domains
    xScale.domain(...)
    yScale.domain(...)

    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append()
        .attr("width", xScale.bandwidth())
    
	// update bars

    // implement the enter-update-exist sequence

	// update axes and axis title

    // add a data key function (use company name as a key)
}

// CHART UPDATES ---------------------------
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
    update(data);
});

// (Later) Handling the type change

// (Later) Handling the sorting direction change