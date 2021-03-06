//@author:Gaurav agarwal

//update: Rupali Mahadik:  //Glycan webservices, //Protein webservices

// @description: UO1 Version-1.1.

//@update:6 June 2018

//update:20 july://usecases search webservices

function getWsUrl(request, id) {

    var ws_base = "http://glygen-vm-dev.biochemistry.gwu.edu/api/";
    
    var ws_base_glycan = ws_base+"glycan";
    var ws_base_protein = ws_base+"protein";
    var ws_base_typeahead = ws_base+"typeahead";
    var ws_logging = ws_base+"auth/logging";
    var ws_userID = ws_base+"auth/userid";
    var ws_useCaseSearch=ws_base+"usecases";

    switch (request.toLowerCase()) {

        //Auth Webservices.
        case "generate_id":
            return ws_userID;
            break;
        case "log_activity":
            return ws_logging;
            break;



        //Glycan webservices
        case "search_init_glycan":
            return ws_base_glycan + "/search_init";
            break;

        case "glycan_search":
            return ws_base_glycan + "/search";
            break;
        case "glycan_image":
            return ws_base_glycan + "/image/" + id;
            break;
        case "glycan_list":
            return ws_base_glycan + "/list";
            break;
        case "glycan_detail":
            return ws_base_glycan + "/detail/" + id;
            break;



        //Protein webservices
        case "search_init_protein":
            return ws_base_protein + "/search_init";
            break;
        case "search_protein":
            return ws_base_protein + "/search";
            break;
        case "protein_image_service":
            return ws_base_glycan + "/image/" + id;
            break;
        case "protein_list":
            return ws_base_protein + "/list";
            break;
        case "protein_detail":
            return ws_base_protein + "/detail/" + id;
            break;




        //Typeahead webservices

        case "type-ahead":
            return ws_base_typeahead;
        default:
            return "WWW.GOOGLE.COM";
            break;

        //Usecases search webservices

        case "search_bioenzyme":
            return ws_useCaseSearch + "/glycan_to_biosynthesis_enzymes" + id;
            break;

    }
}


/**
 * getListPostData  function that returns the string with the correct format the GWU service need to get the list for a specific Id

 * @param {string} id -  serach ID
 */

function getListPostData(id, page, sort, dir, limit) {
    var query = {};
    query.id = id;
    //query.offset = parseInt(page);
    query.sort = sort;
    query.offset = ((page - 1) * limit) + 1;
    query.limit = parseInt(limit);
    query.order = dir;

    return "query=" + JSON.stringify(query);
}


function getSearchtypeheadData(field, value) {
    var query = {};
    query.field = field;
    query.value = value;
    query.limit = 100;
    return "query=" + JSON.stringify(query);
}