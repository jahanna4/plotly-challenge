// otuids = [];
// otulabels = [];
// sampvals = [];

d3.json("static/js/samples.json").then(function(rawdata) {
    var data = rawdata;
    var meta = data.metadata;
    var samples = data.samples;
    var names = data.names;
    console.log(meta);

    // dataselect = d3.select("#selDataset");
    // dataselect.append("ul");
    // dataselect.select("ul").selectAll("li").data(names).enter().append("li").text(names);

    var otuids = [];
    var otulabels = [];
    var sampvals = [];

    // for(var i = 0; i<samples.length; i++) {
        // for(var x = 0; x<samples[i].otu_ids; i++) {
        //     console.log(samples[3].otu_ids[1]);
        // }
       var otuids=samples[5].otu_ids;
       var otulabels=samples[5].otu_labels;
       var sampvals=samples[5].sample_values;

       var id = meta[5].id;
       var ethnicity = meta[5].ethnicity;
       var gender = meta[5].gender;
       var age = meta[5].age;
       var loc = (meta[5].location).replace("/",",");
       var bbtype = meta[5].bbtype;
       var wfreq = meta[5].wfreq;
       var demdata = [id, ethnicity, gender, age, loc, bbtype, wfreq];
       console.log(demdata);
        // console.log(loc);
        // var metadisp = d3.select("#metadata");
        // meta.forEach((meta) => {
        //     var newrow = metadisp.append("ul");
        //     Object.entries(meta).forEach(([key,value]) => {
        //         var newcell = newrow.append("li");
        //         newcell.text(value);
        //     });
        // });
    // }


    function initbar() {
        var initBarTrace = {
            x: otuids,
            y: sampvals,
            type: "bar",
            text: otulabels,
            orientation: "h"
        };
        var barData = [initBarTrace];
        var barLayout = {
            title: "Top OTU's"
        };
        Plotly.newPlot("bar", barData, barLayout);
    };   
    initbar();

    function initbubble() {
        var initBubbleTrace = {
            x: otuids,
            y: sampvals,
            mode: 'markers',
            marker: {
                size: sampvals,
                color: otuids
            },
            text: otulabels
        };
        var bubbleData = [initBubbleTrace];
        var bubbleLayout = {
            xtitle: "OTU ID"
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    };
    initbubble();

    function initgauge() {
        var gaugedata = [ {
            domain: {x:[0,9], y:[0,9]},
            value: wfreq,
            title: {text: "Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number"
        }
        ];
        var gaugelayout = {width: 450, height: 500};
        Plotly.newPlot("gauge", gaugedata, gaugelayout);
    };
    initgauge();

});