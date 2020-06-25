d3.json("data/samples.json").then(function(rawdata) {
    var data = rawdata;
    var meta = data.metadata;
    var samples = data.samples;
    var names = data.names;

    // dataselect = d3.select("#selDataset");
    // dataselect.append("ul");
    // dataselect.select("ul").selectAll("li").data(names).enter().append("li").text(names);

    // var otuids = [];
    // var otulabels = [];
    // var sampvals = [];

    // for(var i = 0; i<samples.length; i++) {
        // for(var x = 0; x<samples[i].otu_ids; i++) {
        //     console.log(samples[3].otu_ids[1]);
        // }
       var otuids=samples[1].otu_ids;
       var otuslice=otuids.slice(0,10);
    //    console.log(otuslice);
       var otulabels=samples[1].otu_labels;
       var labelslice=otulabels.slice(0,10);

       var sampvals=samples[1].sample_values;
       var sampslice=sampvals.slice(0,10);

       var id = meta[1].id;
       var ethnicity = meta[1].ethnicity;
       var gender = meta[1].gender;
       var age = meta[1].age;
       var loc = (meta[1].location).replace("/",",");
       var bbtype = meta[1].bbtype;
       var wfreq = meta[1].wfreq;
    //    var demdata = [id, ethnicity, gender, age, loc, bbtype, wfreq];
    //    console.log(demdata);

       function init(){
        function initbar() {
            var barData = [ {
                x: otuslice,
                y: sampslice,
                type: "bar",
                text: labelslice,
                orientation: "h"
            }
            ];
            var barLayout = {
                title: "Top OTU's",
            };
            Plotly.newPlot("bar", barData, barLayout);
        }
        initbar();
    
        function initbubble() {
            var bubbleData = [ {
                x: otuslice,
                y: sampslice,
                mode: 'markers',
                marker: {
                    size: sampslice,
                    color: otuslice
                },
                text: labelslice
            }
            ];
            var bubbleLayout = {
                xtitle: "OTU ID"
            };
            Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        }
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
        }
        initgauge();
       }
       init();

       d3.selectAll("#selDataset").on("change", optionChanged);

       function optionChanged() {
           var menu = d3.select("#selDataset");
           var selval = menu.property("value");

           var otuids = [];
           var otulabels = [];
           var sampvals = [];
           var id = [];
           var ethnicity = [];
           var gender = [];
           var age = [];
           var loc = [];
           var bbtype = [];
           var wfreq = [];

           for(var i = 0; i<names.length; i++) {
               if (selval === names[i]) {
                otuids=samples[i].otu_ids;
                otuslice=otuids.slice(0,10);

                otulabels=samples[i].otu_labels;
                labelslice=otulabels.slice(0,10);
         
                sampvals=samples[i].sample_values;
                sampslice=sampvals.slice(0,10);
         
                id = meta[i].id;
                ethnicity = meta[i].ethnicity;
                gender = meta[i].gender;
                age = meta[i].age;
                loc = (meta[i].location).replace("/",",");
                bbtype = meta[i].bbtype;
                wfreq = meta[i].wfreq;
               }
           }
        updates();

        function updates() {
            Plotly.restyle("bar", "x", otuslice, "y", sampslice, "text", labelslice);
            Plotly.restyle("bubble", "x", otuslice, "y", sampslice, "size", sampslice, "color", otuslice, "text", labelslice);
            Plotly.restyle("gauge", "value", wfreq);
        }


    //    };
    //    x: otuslice,
    //    y: sampslice,
    //    mode: 'markers',
    //    marker: {
    //        size: sampslice,
    //        color: otuslice
    //    },
    //    text: labelslice

        // FIX THIS
    // function initmeta() {
    //     // dataselect = d3.select("#selDataset");
    //     // dataselect.append("ul");
    //     // dataselect.select("ul").selectAll("li").data(names).enter().append("li").text(names);
    // //     // var metadisp = d3.select(".panel-body");
    // //     // metadisp.append("ul");
    // // //    metadisp.select("ul")

    //     d3.select("ul")
    //     .data(meta)
    //     .enter()
    //     .append("li")
    //     .html(function(meta) {
    //         return `<li>${id}</li><li>${ethnicity}</li><li>${gender}</li><li>${age}</li><li>${loc}</li><li>${bbtype}</li><li>${wfreq}</li>`;
    //     });
    // };
    // initmeta();


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
    }
});