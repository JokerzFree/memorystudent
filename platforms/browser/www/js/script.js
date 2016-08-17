$( document ).on( "pagecreate", "#page", function() {
    var info = [];

    $.get('res/pages/main.txt', function(data) {
      $("#main").html(data);
    }, 'text');

    $( document ).on( "swiperight", "#page", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });

    $(document).delegate('#left-panel ul li > a', 'click', function () {
        var href = $(this).attr('href').replace('#','');
        if (href != ''){
            if (info[href]==null){
                $.get('res/pages/'+href+'.txt', function(data) {
                  $("#main").html(data);
                  info[href] = data;
                }, 'text');
            } else {
                $("#main").html(info[href]);
            }
            $("[data-role=panel]").panel("close");
        }
    });
});
