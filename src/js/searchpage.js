//     function myFunction(){
//         $('#loading_image').fadeIn();
//         var data = {
//          //   formvalues: document.getElementById("myForm")
//            Mass: document.getElementById("Mass"),
//             Glycan_type:  document.getElementById("Glycan_type"),
//             Glycan_subtype: document.getElementById("Glycan_subtype"),        
//             Organism:  document.getElementById("Organism"),
//             ProteinID:  document.getElementById("ProteinID"),
//             Enzyme:  document.getElementById("Enzyme"),
//             GlycanMotif:  document.getElementById("GlycanMotif"),
//             GlycanID:  document.getElementById("GlycanID")
//         };
//    // var formData = JSON.stringify($("#myForm").serializeArray());
//     $.post("http://glycomics.ccrc.uga.edu/ggtest/service/searchpage.php", {formvalues: data},function(response){
//         $('#loading_image').fadeOut();
//     });
//     }


 

function ajaxSuccess(data) {
    if(data.query){
        $("#organism").val(data.query.organism);
    }
}


   function ajaxFailure() {

   }
   
   function LoadData() {
    var ajaxConfig = {
      dataType: "json",
      url: getWsUrl("list"),
      data: getListPostData(id, 1, 'id', 'asc', 1),
      method: 'POST',
      success: ajaxSuccess,
      error: ajaxFailure
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
   
  var id = getParameterByName('id');

console.log("HELLO " + id);
  if(id){LoadData();}
   
