$( document ).on( "pagecreate", "#page", function() {
    var info = [];

    $.get('pages/main.txt', function(data) {
      $("#main").html(data);
      info['main'] = data;
    }, 'text');

    $( document ).on( "swiperight", "#page", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        } else if ($( ".ui-page-active" ).jqmData( "panel" ) == "open"){
			$( "#left-panel" ).panel( "close" );
    	}
    });

    $(document).on("swipeleft", "#page", function( e ){
        $("[data-role=panel]").panel("close");
    });

    $(document).delegate('#left-panel ul li > a', 'tap', function () {
        var href = $(this).attr('href').replace('#','');
        if (href != ''){
            if (info[href]==null){
                $.get('pages/'+href+'.txt', function(data) {
                  $("#main").html(data);
                  info[href] = data;
                }, 'text');
            } else {
                $("#main").html(info[href]);
            }
            //
            switch (href){
                case 'administracia','raspisanie':
                $("#table").table("refresh");
                break;
            }
            //
            $("[data-role=panel]").panel("close");
        }
    });

    $(document).on('tap', 'a[href^=http], a[href^=https]', function(e){

        e.preventDefault();
        var $this = $(this); 
        var target = $this.data('inAppBrowser') || '_system';

        window.open($this.attr('href'), target, 'location=no');
    });
});
