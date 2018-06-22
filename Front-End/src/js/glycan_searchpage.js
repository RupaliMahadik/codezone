// //  @author: Pradeep Kumar Ragu Chanthar
// //  @description: UO1 Version-1.1
// //  @Date: 19th Feb 2018
//
//
//
// /** Protein field on change detect and suggest auto complete options from retrieved Json
//  * @proteinjson - forms the JSON to post
//  * @data-returns the protein ID's
//  *
// */
// // $('#protein').on('input', function () {
// //     var protein_id = document.getElementById("protein").value;
// //     var proteinobj = {
// //         field: "protein",
// //         value: protein_id
// //     }
// //     var proteinjson = "query=" + JSON.stringify(proteinobj);
// //     $.ajax({
// //         url: getWsUrl("type-ahead"), // path to protein WS
// //         method: 'post', // POST request
// //         data: proteinjson, //post user input on change
// //         success: function (data) {
// //             //data is the JSON string
// //             $(function () {
// //                 $("#protein").autocomplete({
// //                     source: function (request, response) {
// //                         var results = $.ui.autocomplete.filter(data, request.term);
// //                         response(results.slice(0, 5));
// //                     }
// //                 });
// //             });
// //         },
// //     });
// // });
//
//
//
//
// /** Motif field on change detect and suggest auto complete options from retrieved Json
//  * @Motifjson - forms the JSON to post
//  * @data-returns the Motifs
//  *
// */
// $('#motif').on('input', function () {
//     var motif_id = document.getElementById("motif").value;
//     var motifobj = {
//         field: "motif",
//         value: motif_id
//     }
//     var motifjson = "query=" + JSON.stringify(motifobj);
//     $.ajax({
//         url: getWsUrl("type-ahead"), // path to protein WS
//         method: 'post', // POST request
//         data: motifjson, //post user input on change
//         success: function (data) {
//             //data is the JSON string
//             $(function () {
//                 $("#motif").autocomplete({
//                     source: function (request, response) {
//                         var results = $.ui.autocomplete.filter(data, request.term);
//                         response(results.slice(0, 5));
//                     }
//                 });
//             });
//         },
//     });
// });
//
//
// /** enzyme field on change detect and suggest auto complete options from retrieved Json
//  * @enzymejson - forms the JSON to post
//  * @data-returns the enzymes
//  *
// */
// $('#enzyme').on('input', function () {
//     var enzyme_id = document.getElementById("enzyme").value;
//     var enzymeobj = {
//         field: "enzyme",
//         value: enzyme_id
//     }
//     var enzymejson = "query=" + JSON.stringify(enzymeobj);
//     $.ajax({
//         url: getWsUrl("type-ahead"), // path to protein WS
//         method: 'post', // POST request
//         data: enzymejson, //post user input on change
//         success: function (data) {
//             //data is the JSON string
//             $(function () {
//                 $(".enzyme").autocomplete({
//                     source: function (request, response) {
//                         var results = $.ui.autocomplete.filter(data, request.term);
//                         response(results.slice(0, 5));
//                     }
//                 });
//             });
//         },
//     });
// });

$("#glycan_id").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("glycan_id", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});



$("#protein").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("protein_id", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});


$("#motif").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("motif_name", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});

$("#enzyme").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("enzyme_protein_id", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});

/** functions for dropdowns organism 
 * get organism drop down values for search form
 */

var mass_max;
var mass_min;
$(document).ready(function () {
    $.getJSON(getWsUrl("search_init"), function (result) {
        $(".organism").append("<option>" + result.organism[0] + "</option>");
        $(".organism").append("<option>" + result.organism[1] + "</option>");
        $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
        var mass_max = result.glycan_mass.max;
        var mass_min = result.glycan_mass.min;
        var sugar_mass_min = result.number_monosaccharides.min;
        var sugar_mass_max = result.number_monosaccharides.max;
        mass(mass_min, mass_max);
        sugarmass(sugar_mass_min, sugar_mass_max)
        //check for ID to see if we need to load search values
        //please do not remove rhis code as it is required prepopulate search values
        var id =getParameterByName('id') || id;
        if(id){
            LoadSearchvalues(id);
        }

    });
});


/** Sugar Mass range function
 * @param {numeric} sugar_mass_min - minimum value of the sugar mass range
 * @param {numeric} sugar_mass_max - maximum value of the sugar mass range
 */
function sugarmass(sugar_mass_min, sugar_mass_max) {
    var nonLinearSlider1 = document.getElementById('slider1');
    noUiSlider.create(nonLinearSlider1, {

        connect: true,
        behaviour: 'tap',
        start: [0, 10000],
        range: {
            'min': sugar_mass_min,
            'max': sugar_mass_max
        }
    });
    var nodes1 = [
        document.getElementById('lower-value1'), // 0
        document.getElementById('upper-value1')  // 1
    ];
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider1.noUiSlider.on('update', function (values, handle) {
        nodes1[handle].innerHTML = values[handle];
    });
}

/** Mass range function
 * @param {numeric} mass_min - minimum value of the mass range
 * @param {numeric} mass_max - maximum value of the mass range
 */
function mass(mass_min, mass_max) {
    var nonLinearSlider = document.getElementById('slider');
    noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',
        start: [0, 10000],
        range: {
            'min': mass_min,
            'max': mass_max
        }
    });
    // nonLinearSlider.noUiSlider.set([mass_min, mass_max]);
    var nodes = [
        document.getElementById('lower-value'), // 0
        document.getElementById('upper-value')  // 1
    ];
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on('update', function (values, handle) {
        nodes[handle].innerHTML = values[handle];
    });

}

/** glycan sub type dropdown function based on type field
 * @param {numeric} ddl1 - User selected glycan type 
 * @param {numeric} ddl2 - Glycan sub type 
 */

function configureDropDownLists(ddl1, ddl2,callback) {
    var nglycan;
    var oglycan;
    // var nglycan={};
    $.getJSON(getWsUrl("search_init"), function (result) {
        nglycan = result.glycan_type[0].subtype;
        oglycan = result.glycan_type[1].subtype;
        dataReady();
    });
    function dataReady() {
        switch (ddl1.value) {
            case 'N-glycan':
                ddl2.options.length = 0;
                for (i = 0; i < nglycan.length; i++) {
                    createOption(ddl2, nglycan[i], nglycan[i]);
                }
                break;
            case 'O-glycan':
                ddl2.options.length = 0;
                for (i = 0; i < oglycan.length; i++) {
                    createOption(ddl2, oglycan[i], oglycan[i]);
                }
                break;
            default:
                ddl2.options.length = 0;
                break;
        }
        if(callback) {
                        callback();
                   }
    }
}
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

/** On submit, function forms the JSON and submits to the search web services
 */
function submitvalues() {
    var query_type = "search_glycan";
    var mass_slider = document.getElementById("slider").noUiSlider.get();
    var sugar_slider = document.getElementById("slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    var organism = document.getElementById("organism").value;
    var glycan_type = document.getElementById("ddl").value;
    var glycan_subtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein").value;
    var enzyme = document.getElementById("enzyme").value;
    var motif = document.getElementById("motif").value;
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], sugar_slider[0],sugar_slider[1],organism, glycan_type, glycan_subtype, enzyme, proteinid);
    var json = "query=" + JSON.stringify(formObject);

    $.ajax({
        type: 'post',
        url: getWsUrl("search_glycan"),
        data: json,
        // success: function (results) {
        //     if (results.search_results_id) {
        //         window.location = './glycan_list.html?id=' + results.search_results_id;
        //     }
        //     else {
        //         displayErrorByCode("1")
        //     }
            success: function (results) {
                if (results.error_code) {
                    displayErrorByCode(results.error_code);
                } else if (results.list_id && (results.list_id.length === 0)) {
                    displayErrorByCode('no-results-found');
                } else {
                    window.location = './glycan-list.html?id=' + results.list_id;
                }
        }
    });
}

/** Forms searchjson from the form values submitted
 * @param input_query_type query search
 * @param input_glycan_id user glycan id input
 * @param mass_min user mass min input
 * @param mass_max user mass max input
 * @param input_organism user organism input 
 * @param input_glycantype user glycan_type input
 * @param input_glycansubtype user glycan_subtype input
 * @param input_enzyme user enzyme input
 * @param input_proteinid user protein_id input
 * @param input_motif user motif input
 */

//form json from form submit
function searchjson(input_query_type, input_glycan_id, mass_min, mass_max, sugar_min,sugar_max,input_organism, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid,) {
    var formjson = {
        "operation":"AND",
        query_type: input_query_type,
        mass: { "min": mass_min, "max": mass_max },
        number_monosaccharides: {"min":sugar_min,"max":sugar_max},
        enzyme:{
            "id":input_enzyme,
            "type":"gene"
        },
        glycan_id: input_glycan_id,
        organism: input_organism,
        glycan_type: input_glycantype,
        glycan_subtype: input_glycansubtype,
        protein: input_proteinid,
        // glycan_motif: input_motif
    };
    return formjson;
}
