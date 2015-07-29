$(function() {

    var json = [
        {
            "Year": "1950",
            "Population": "2,556,505,579",
            "Annual growth rate (%)": "1.45",
            "Population change": "37,347,602"
        },
        {
            "Year": "1951",
            "Population": "2,593,853,181",
            "Annual growth rate (%)": "1.6",
            "Population change": "41,871,643"
        },
        {
            "Year": "1952",
            "Population": "2,635,724,824",
            "Annual growth rate (%)": "1.7",
            "Population change": "45,323,546"
        },
        {
            "Year": "2046",
            "Population": "9,110,049,620",
            "Annual growth rate (%)": "0.49",
            "Population change": "44,990,101"
        },
        {
            "Year": "2047",
            "Population": "9,155,039,721",
            "Annual growth rate (%)": "0.48",
            "Population change": "44,017,110"
        },
        {
            "Year": "2048",
            "Population": "9,199,056,831",
            "Annual growth rate (%)": "0.47",
            "Population change": "43,026,715"
        },
        {
            "Year": "2049",
            "Population": "9,242,083,546",
            "Annual growth rate (%)": "0.45",
            "Population change": "42,023,878"
        }
    ];

    var results,
        data = [],
        chart,
        bars,
        margin = 100,
        w = 8,
        h = 500,
        x, y,
        xAxis, yAxis;

   // results = d3.map( json );
     results = d3.json("c:/im/data", function(error, data) {
  var trialStatus = d3.keys(data.batchDetails[0]).filter(function(key) { return key !== "trialStatus";
});

    results.forEach( function( key, val ) {
        var result = {};
        result.year = new Date(parseInt( val.Year, 10 ), 0, 1);
        result.population = parseInt( val.Population.replace( /,/g, '' ), 10 );
        data.push( result );
    } );

    chart = d3.select( 'body' ).append( 'svg' )
        .attr( 'class', 'chart' )
        .attr( 'width', 1100 )
        .attr( 'height', h )
        .append('g');

    d3.select('svg g')
        .attr('transform', 'translate(50, 50)');

    x = d3.time.scale()
        .domain( [data[0].year, d3.time.year.offset(data[data.length - 1].year, 1)] )
        .range( [0, w * data.length] )

    y = d3.scale.linear()
        .domain( [0, d3.max( data, function( d ) { return d.population; } )] )
        .rangeRound( [0, h - margin] );

    // Bars
    bars = chart.append('g')
        .attr('class', 'bars');

    bars.selectAll( 'rect' )
        .data( data )
      .enter().append( 'rect' )
        .attr( 'x', function( d, i ) { return x( d.year ) - .5; } )
        .attr( 'y', function( d ) { return (h - margin) - y( d.population ) + .5 } )
        .attr( 'width', w )
        .attr( 'height', function( d ) { return y( d.population ) } )
        .append('g');

    // Axis
    xAxis = d3.svg.axis()
        .scale(x)
        .ticks(20)
        .tickSize(6, 3, 1);

    yAxis = d3.svg.axis()
        .scale(d3.scale.linear().domain( [0, d3.max( data, function( d ) { return d.population; } )] ).rangeRound( [h - margin, 0] ))
        .tickSize(6, 3, 1)
        .orient('right');

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (h - margin) + ')')
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + x.range()[1] + ')')
        .call(yAxis);

} );