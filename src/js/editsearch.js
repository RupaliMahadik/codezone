//@author: Rupali Mahadik
// @description: UO1 Version-1.1.


/**
 * .setting the Form Values based on object data
 * @param {object} data - The data is object with query value
 * @param {object} data.query -
 *
 */

function setFormValues(data) {
   
    if (data.query) {
        $("#glycan_id").val(data.query.glytoucan_ac);
        if (data.query.mass) {
            var massSlider = document.getElementById('slider');
            massSlider.noUiSlider.set([data.query.mass.min, data.query.mass.max]);
        }

        if (data.query.number_monosaccharides) {
            var massSlider1 = document.getElementById('slider1');
            massSlider1.noUiSlider.set([data.query.number_monosaccharides.min, data.query.number_monosaccharides.max]);
        }
        $("#organism").val(data.query.tax_id);
        $("#ddl").val(data.query.glycan_type);
       var types = document.getElementById('ddl');
        var subtypes = document.getElementById('ddl2');
        // create subtypes
        configureDropDownLists(types, subtypes, function() {
            $("#ddl2").val(data.query.glycan_subtype);
        });
         $("#enzyme").val(data.query.enzyme.id);
        $("#protein").val(data.query.uniprot_canonical_ac);
        $("#motif").val(data.query.glycan_motif);
    }
}

/**
 * .setting the Form Values based on object data
 * @param {object} data - The data is object with query value
 * @param {object} data.query -
 *
 */
function setProteinFormValues(data) {
//alert(data.results.uniprot_id)
  //data1 = JSON.parse(data);
    if (data.query) {
        $("#protein").val(data.query.uniprot_canonical_ac);
        if (data.query.mass) {
            var massSlider = document.getElementById('slider');
            massSlider.noUiSlider.set([data.query.mass.min, data.query.mass.max]);
        }
        $("#organism").val(data.query.tax_id);
        $("#gene_name").val(data.query.gene_name);
        $("#protein_name_long").val(data.query.protein_name_long);
        $("#pathway").val(data.query.pathway_id);
        $("#sequences").val(data.query.sequence.aa_sequence);
        $("#glycosylated_aa").val(data.query.glycosylated_aa);
        $("#glycosylation_evidence").val(data.query.glycosylation_evidence);  
    }
}

/**
 * fail to to get search data
* @param {object} data - The Retreive data
*
*
*/
function failToRetreiveSearch(data) {
    displayErrorByCode('server_down');
}
/**
 * Loading data from protein list service
 * @param {string} id - The serach id
 *
 *
 */
function LoadProteinSearchvalues(id) {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("protein_list"),
        data: getListPostData(id, 1, 'uniprot_canonical_ac', 'asc', 1),
        method: 'POST',
        success: setProteinFormValues,
        error: failToRetreiveSearch
    };
    // make the server call
    $.ajax(ajaxConfig);
}

/**
 * Loading data from glycan list service
 * @param {string} id - The serach id
 *
 *
 */

//Here I am defining ajax call here.
function LoadSearchvalues(id) {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("glycan_list"),
        data: getListPostData(id, 1, 'glytoucan_ac', 'asc', 1),
        method: 'POST',
        success: setFormValues,
        error: failToRetreiveSearch
    };
    // make the server call
    $.ajax(ajaxConfig);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

