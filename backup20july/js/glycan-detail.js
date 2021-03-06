//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//@Date:19th Feb 2018. with dummy web service
//@update: 3-April 2018. with real web service
//@update: June 26-2018- with web service changes
// @update: July 5, 2018 - Gaurav Agarwal - Error and page visit logging

var glytoucan_ac;
/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success


 */
function ajaxSuccess(data) {
    var template = $('#item_template').html();
    data.hasMotifs = (data.motifs && (data.motifs.length > 0));
    data.hasGlycosylate = (data.glycosylate && (data.glycosylate.length > 0));

    data.imagePath = getWsUrl('glycan_image', data.glytoucan_ac);

    //var glyco = row.glycoct.replace(/ /g, '\n');
    var html = Mustache.to_html(template, data);
    var $container = $('#content');
    var items = [];
    if (data.glycosylation) {
        for (var i = 0; i < data.glycosylation.length; i++) {
            var glycan = data.glycosylation[i];
            items.push({
                uniprot_canonical_ac: glycan.uniprot_canonical_ac,
                gene: glycan.gene,
                protein_name: glycan.protein_name



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


    $('#glycosylation-table').bootstrapTable({
        columns: [{
            field: 'uniprot_canonical_ac',
            title: 'Protein',
            // sortable: true,
            formatter: function (value, row, index, field) {
                return "<a href='protein_detail.html?uniprot_canonical_ac=" + value + "'>" + value + "</a>"
            }
        },
            {
                field: 'gene',
                title: 'Gene Name',
                // sortable: true
                // formatter: function (value, row, index, field) {
                //     return "<a href='protein_detail.html?uniprot_canonical_ac=" + value + "'>" + value + "</a>"
                // }
            },

            {
                field: 'protein_name',
                title: 'Protein Name',
                // sortable: true
            }],
        // pagination: 10,
        data: items,
        // detailView: true,
        // detailFormatter: function (index, row) {
        //     var html = [];
        //     var evidences = row.evidence;
        //     for (var i = 0; i < evidences.length; i++) {
        //         var evidence = evidences[i];
        //         html.push("<div class='row'>");
        //         html.push("<div class='col-xs-12'>" + evidence.database + ":<a href=' " + evidence.url + " ' target='_blank'>" + evidence.id + "</a></div>");
        //         html.push("</div>");
        //     }
        //     return html.join('');
        // },

    });
    if (data.error_code)
        activityTracker("error", glytoucan_ac, data.error_code);
    else
        activityTracker("user", data.glytoucan_ac, "successful response");
}

/**
 * @param {data} the callback function to GWU service if fails
 */
//  * Returns the GWU services fails.


function ajaxFailure() {
    displayErrorByCode();
    activityTracker("error", glytoucan_ac, "server down");
}

/**
 * @param {id} the LoadData function to configure and start the request to GWU  service
 */
//  * Returns the GWU services.
//

function LoadData(glytoucan_ac) {

    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("glycan_detail", glytoucan_ac),
        // data: getDetailPostData(id),
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
    glytoucan_ac = getParameterByName('glytoucan_ac');
    document.title = glytoucan_ac + " Detail";   //updates title with the glycan ID
    LoadData(glytoucan_ac);
});