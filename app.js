d3.csv("top3gensales_precomp.csv").then((vg) => {
    function init(index) {
        var company = vg.top3gensales_percomp[index].company.slice(0,3);
        var totalsales = vg.top3gensales_percomp[index].tot_globalsales.slice(0,3);
    }
    
});