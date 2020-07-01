function getDemoInfo(id) {
// 16) Using d3, read the json file to extract data and create a metadavar
    d3.json("samples.json").then((bellydata)=> {
        var metadata_bb = bellydata.metadata;
        console.log(metadata_bb)
      //17)Create a variable that filters the meta data info by id
       var studyresult = metadata_bb.filter(meta => meta.id.toString() ===
      //18)Create a variable that selects demographic panel to put data in
       var demographicwithbb = d3.select("#sample-metadata");
     // 19)Clean the demographic info panel each time before getting new i
       demographicwithbb.html("");    
     // 20) Extract demographic data data for each id and append the info 
        Object.entries(studyresult).forEach((key) => {   
            demographicwithbb.append("h5").text(key[0].toUpperCase() + ": 
        });
    });
}