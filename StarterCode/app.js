// otuids = [];
// otulabels = [];
// sampvals = [];

d3.json("static/js/samples.json").then(function(rawdata) {
    var data = rawdata;
    var meta = data.metadata;
    var samples = data.samples;
    var otuids = [];
    var otulabels = [];
    var sampvals = [];

    // for(var i = 0; i<samples.length; i++) {
        // for(var x = 0; x<samples[i].otu_ids; i++) {
        //     console.log(samples[3].otu_ids[1]);
        // }
        otuids=samples[8].otu_ids;
        otulabels=samples[8].otu_labels;
        sampvals=samples[8].sample_values;
        id = meta[8].id;
        ethnicity = meta[8].ethnicity;
        gender = meta[8].gender;
        age = meta[8].age;
        loc = (meta[8].location).replace("/",",");
        bbtype = meta[8].bbtype;
        wfreq = meta[8].wfreq;
        // console.log(loc);
        d3.select("#selDataset")
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
    
});
// console.log(otuids);
// testids = [2419, 944, 1795];
// testvals = [8, 4, 3];
// testlabels = ["Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", "Bacteria;Actinobacteria;Actinobacteria;Actinomycetales;Corynebacteriaceae;Corynebacterium", "Bacteria;Firmicutes;Bacilli;Bacillales;Staphylococcaceae;Staphylococcus"];

// function init() {
//     initTrace = {
//         x: `OTU ${otuids}`,
//         y: sampvals,
//         type: "bar",
//         text: otulabels
//     };

//     var data = [initTrace];
//     var layout = {
//         title: "Top OTU's"
//     };
//     Plotly.newPlot("bar", data, layout);
// }

// init();

