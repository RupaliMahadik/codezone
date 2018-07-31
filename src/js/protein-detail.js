//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
// @update: July 16, 2018 - Gaurav Agarwal - Error and page visit logging
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.

var uniprot_canonical_ac;
/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success
 */
function ajaxSuccess(data) {

    if (data.error_code) {
        activityTracker("error", uniprot_canonical_ac, data.error_code);
        // added by Gaurav on July 27, 2018. Web service error display.
        alertify.alert('Error occured', data.error_code);
    }
    else {
        activityTracker("user", data.uniprot_canonical_ac, "successful response");
        var template = $('#item_template').html();


        // var string = data.sequence.sequence;
        //
        // var perLine = 60;
        //
        // var output = '';
        //
        // for(var x = 0; x < string.length; x += perLine) {
        //     /* console.log(x+1) */;
        //     var y = string.substr(x, perLine);
        //     /* console.log(y) */
        //
        //     output += (x+1) + ' ' + y + '<Br/>';
        //
        // }
        //
        // data.sequence.sequence = output;




        var html = Mustache.to_html(template, data);
        var $container = $('#content');


        var items = [];
        if (data.glycosylation) {
            for (var i = 0; i < data.glycosylation.length; i++) {
                var glycan = data.glycosylation[i];
                items.push({
                    glytoucan_ac: glycan.glytoucan_ac,
                    residue: glycan.residue + glycan.position,
                    type: glycan.type,
                    evidence: glycan.evidence
                });
            }
        }

        $container.html(html);

        $container.find('.open-close-button').each(function (i, element) {
            $(element).on('click', function () {
                var $this = $(this);
                var buttonText = $this.text();
                if (buttonText === '+') {
                    $this.text('-');
                    $this.parent().next().show();
                } else {
                    $this.text('+');
                    $this.parent().next().hide();


                }
            });
        });

        // $container.find('#basics5x').click();


        $('#glycosylation-table').bootstrapTable({
            columns: [{
                field: 'glytoucan_ac',
                title: 'Glycan',
                sortable: true,
                formatter: function (value, row, index, field) {
                    return "<a href='glycan_detail.html?glytoucan_ac=" + value + "'>" + value + "</a>"
                }
            },
            {
                field: 'type',
                title: 'Type',
                sortable: true
            },

            {
                field: 'residue',
                title: 'Residue',
                sortable: true
            }],
            pagination: 10,
            data: items,
            detailView: true,
            detailFormatter: function (index, row) {
                var html = [];
                var evidences = row.evidence;
                for (var i = 0; i < evidences.length; i++) {
                    var evidence = evidences[i];
                    html.push("<div class='row'>");
                    html.push("<div class='col-xs-12'>" + evidence.database + ":<a href=' " + evidence.url + " ' target='_blank'>" + evidence.id + "</a></div>");
                    html.push("</div>");
                }
                return html.join('');
            },

        });
    }
    $('#loading_image').fadeOut();
}




/**
 * @param {data} the callback function to GWU service if fails
 */
//  * Returns the GWU services fails.

function ajaxFailure() {
    displayErrorByCode();
    activityTracker("error", uniprot_canonical_ac, "server down");
    $('#loading_image').fadeOut();
}

/**
 * @param {id} the LoadData function to configure and start the request to GWU  service
 */
//  * Returns the GWU services.
//

function LoadData(uniprot_canonical_ac) {

    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("protein_detail", uniprot_canonical_ac),
        method: 'POST',
        success: ajaxSuccess,
        error: ajaxFailure
    };


    // calls the service
    $.ajax(ajaxConfig);

}

//getParameterByName function to extract query parametes from url
/**
 * @param {name} string for the name of the variable variable to extract from query string
 * @param {url}string with the complete url with query string values
 */
//  * Returns the GWU services.
//


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
    uniprot_canonical_ac = getParameterByName('uniprot_canonical_ac');
    document.title = uniprot_canonical_ac + " Detail";   //updates title with the protein ID
    LoadData(uniprot_canonical_ac);
});







