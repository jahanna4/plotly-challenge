d3.json("data/samples.json").then(function(rawdata) {
    var data = rawdata;
    var meta = data.metadata;
    var samples = data.samples;
    var names = data.names;

    var otuids=samples[0].otu_ids;
    var otuslice=otuids.slice(0,10);
//    console.log(otuslice);
    var otulabels=samples[0].otu_labels;
    var labelslice=otulabels.slice(0,10);

    var sampvals=samples[0].sample_values;
    var sampslice=sampvals.slice(0,10);

    var id = meta[0].id;
    var ethnicity = meta[0].ethnicity;
    var gender = meta[0].gender;
    var age = meta[0].age;
    var loc = (meta[0].location).replace("/",",");
    var bbtype = meta[0].bbtype;
    var wfreq = meta[0].wfreq;
    var demdata = [(id, ethnicity, gender, age, loc, bbtype, wfreq)];
    //    console.log(demdata);

       function init(){
        function initmeta() {
            d3.select("ul")
            .selectAll("li")
            .data(demdata)
            .enter()
            .append("li")
            .html(function(d) {
                return `<li>ID: ${id}</li><li>Ethnicity: ${ethnicity}</li><li>Gender: ${gender}</li><li>Age: ${age}</li><li>Location (city, state):${loc}</li><li>BB Type: ${bbtype}</li><li>Wfreq: ${wfreq}</li>`
            });
        }
        initmeta();

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
           d3.event.preventDefault();
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

           var id = [];
           var ethnicity = [];
           var gender = [];
           var age = [];
           var loc = [];
           var bbtype = [];
           var wfreq = [];
           var demdata = [];

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
                demdata = [(id, ethnicity, gender, age, loc, bbtype, wfreq)];
               }
           }
        updates();

        function updates() {
            Plotly.purge("bar");
            Plotly.purge("bubble");

            var newbarData = [ {
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
            Plotly.newPlot("bar", newbarData, barLayout);

            var newbubbleData = [ {
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
            Plotly.newPlot("bubble", newbubbleData, bubbleLayout);

// Note: Added the purge & regenerate for gauge in case there are any issues with the code during grading but gauge restyled during testing without purge & recreate.
            // Plotly.purge("gauge");
            // var newgaugedata = [ {
            //     domain: {x:[0,9], y:[0,9]},
            //     value: wfreq,
            //     title: {text: "Belly Button Washing Frequency"},
            //     type: "indicator",
            //     mode: "gauge+number"
            // }
            // ];
            // var gaugelayout = {width: 450, height: 500};
            // Plotly.newPlot("gauge", newgaugedata, gaugelayout);

            Plotly.restyle("gauge", "value", wfreq);

            newmeta();
        }

        function newmeta() {
            d3.select("ul").selectAll("li").remove();

            d3.select("ul")
            .selectAll("li")
            .data(demdata)
            .enter()
            .append("li")
            .html(function(d) {
                return `<li>ID: ${id}</li><li>Ethnicity: ${ethnicity}</li><li>Gender: ${gender}</li><li>Age: ${age}</li><li>Location (city, state):${loc}</li><li>BB Type: ${bbtype}</li><li>Wfreq: ${wfreq}</li>`
            });
        }
    }
});