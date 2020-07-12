d3.json("data/samples.json").then((importedData) => {
    console.log("Firs read", importedData);
    let names = importedData.names;
    let samples = importedData.samples;
    let prueba = samples[0].sample_values
    let prueba1 = samples[0].otu_ids
    let prueba2 = samples[0].otu_labels
    let metadata = importedData.metadata
    console.log("HOLA", metadata[0])
    let table = d3.select("#sample-metadata")
    table.append("p")
    .attr("id","change")
        .text(`\nid : ${metadata[0].id}\n
        \nethnicity : ${metadata[0].ethnicity}\n
        \ngender : ${metadata[0].gender}\n
        \nage : ${metadata[0].age}\n
        \nlocation : ${metadata[0].location}\n
        \nbbtype : ${metadata[0].bbtype}\n\n ${String.fromCharCode(160)}\n
        \nwfreq : ${metadata[0].wfreq}\n`)

    //Append each value of "names" to dropdown menu
    let dropdown = d3.select("#selDataset")
    names.forEach(d => {
        dropdown.append("option")
            .attr("value", `${d}`)
            .text(d)
    });

    prueba.sort(function (a, b) {
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    })
    prueba = prueba.slice(0, 10);
    prueba = prueba.reverse();
    let trace = {
        x: prueba,
        y: [`"OTU ${prueba1[9]}"`, `"OTU ${prueba1[8]}"`, `"OTU ${prueba1[7]}"`, `"OTU ${prueba1[6]}"`, `"OTU ${prueba1[5]}"`, `"OTU ${prueba1[4]}"`, `"OTU ${prueba1[3]}"`, `"OTU ${prueba1[2]}"`, `"OTU ${prueba1[1]}"`, `"OTU ${prueba1[0]}"`],
        text: prueba2,
        type: "bar",
        orientation: "h"
    }
    let data = [trace]

    Plotly.newPlot("bar", data)

    let trace1 ={
        x: prueba1,
        y: prueba,
        mode:'markers',
        marker: {
            color:['rgb(31, 119, 180)', 'rgb(255, 127, 14)',
            'rgb(44, 160, 44)', 'rgb(214, 39, 40)',
            'rgb(148, 103, 189)', 'rgb(140, 86, 75)',
            'rgb(227, 119, 194)', 'rgb(127, 127, 127)',
            'rgb(188, 189, 34)', 'rgb(23, 190, 207)'],
            size:prueba
          }
    }
    let dat=[trace1]
    let lay ={
        xaxis:{
            title:{
                text:'OTU ID'
            }
        }
    }
    Plotly.newPlot("bubble",dat,lay)
    //Listener on change to obtain name choosen
    dropdown.on("change", function () {
        let namechoosen = d3.select("#selDataset").property("value");
        metadata.forEach(d => {
            if (d.id == namechoosen) {
                let change = d3.select("#change")
                table.text(`id:${d.id}\n
                ethnicity : ${d.ethnicity}\n
                gender : ${d.gender}\n
                age : ${d.age}\n
                location : ${d.location}\n
                bbtype : ${d.bbtype}\n
                wfreq : ${d.wfreq}`)
            }

        })



        samples.forEach(d => {
            let prueba = d.sample_values
            let prueba1 = d.otu_ids
            let prueba2 = d.otu_labels
            prueba.sort(function (a, b) {
                return parseFloat(b.sample_values) - parseFloat(a.sample_values);
            })
            prue = prueba.slice(0, 10);
            prue = prue.reverse();

            if (d.id == namechoosen) {

                let trace = {
                    x: prue,
                    y: [`"OTU ${prueba1[9]}"`, `"OTU ${prueba1[8]}"`, `"OTU ${prueba1[7]}"`, `"OTU ${prueba1[6]}"`, `"OTU ${prueba1[5]}"`, `"OTU ${prueba1[4]}"`, `"OTU ${prueba1[3]}"`, `"OTU ${prueba1[2]}"`, `"OTU ${prueba1[1]}"`, `"OTU ${prueba1[0]}"`],
                    text: prueba2,
                    type: "bar",
                    orientation: "h"
                }
                let da = [trace]
                let layout = {
                    title: "Otus"
                }
                Plotly.newPlot("bar", da, layout)
                let trace1 ={
                    x: prueba1,
                    y: prueba,
                    mode:'markers',
                    marker: {
                        color:['rgb(31, 119, 180)', 'rgb(255, 127, 14)',
                        'rgb(44, 160, 44)', 'rgb(214, 39, 40)',
                        'rgb(148, 103, 189)', 'rgb(140, 86, 75)',
                        'rgb(227, 119, 194)', 'rgb(127, 127, 127)',
                        'rgb(188, 189, 34)', 'rgb(23, 190, 207)'],
                        size:prueba
                      }
                }
                let dat=[trace1]
                let lay ={
                    xaxis:{
                        title:{
                            text:'OTU ID'
                        }
                    }
                }
                Plotly.newPlot("bubble",dat,lay)

            }
        })



    })

})