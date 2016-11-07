/*
 * Wikipedia demo
 * Ulrich Leodolter <ulrich.leodolter@obvsg.at>
 */
app.controller('FullViewAfterController', ['$http', '$document', function ($http, $document) {
    var vm = this;
    
    /*
     * Get GND numbers from pnx.addata lad24 fields
     */ 
    vm.pnds = [];
    if ('lad24' in vm.parentCtrl.item.pnx.addata) {
        var count = vm.parentCtrl.item.pnx.addata['lad24'].length;
        for (var i=0; i < count; i++) {
            var data = vm.parentCtrl.item.pnx.addata['lad24'][i];

            if (data.match(/^GND: (.*)/)) {
                vm.pnds.push( RegExp.$1 );
            }
        }
    }
    /*
     * Get ISBN numbers from pnx.addata.isbn
     */
    vm.isbns = [];
    if ('isbn' in vm.parentCtrl.item.pnx.addata) {
        vm.isbns = vm.parentCtrl.item.pnx.addata['isbn'];
    }

    vm.$onInit = function() {

        var vid   = vm.parentCtrl.fullViewService.vid;
        var pnds  = vm.pnds;
        var isbns = vm.isbns;
        var lang  = $document.find('html').attr('lang');

        if (pnds.length > 0) {
            var url = 'https://ws-test.obvsg.at/cgi-bin/getWikipediaOverview.fpl'
              + '?vid=' + vid
              + '&lang=' + lang
              + '&pnd=' + pnds.join(',')
              + '&isbns=' + isbns.join(',')
              + '&format=json&callback=JSON_CALLBACK';
            $http.jsonp(url).success(function(data) {
                vm.wikipedia_data = data;
            });
        }

        if (isbns.length > 0) {
            var url = 'http://beacon.findbuch.de/isbn/isbn-anywp?format=seealso&id=' + isbns[0] + '&callback=JSON_CALLBACK';
            $http.jsonp(url).success(function(data) {
                vm.seealso_data = data;
            });
        }
    };
}]);

app.component('prmFullViewAfter', {
    bindings: {parentCtrl: '<'},
    controller: 'FullViewAfterController',
    template: `
        <div class="full-view-section wikipedia" ng-if="$ctrl.pnds.length > 0" flex-md="80" flex-lg="80" flex-xl="80" flex>
            <div class="layout-full-width full-view-section-content">
                <div>
                    <div class="section-head">
                        <div layout="row" layout-align="center center" class="layout-align-center-center layout-row">
                            <h2 class="section-title md-title light-text">Wikipedia</h2>
                            <md-divider flex></md-divider>
                       </div>
                    </div>
                </div>
                <div class="section-body">
                    <div class="spaced-rows">
                         <div style="padding-top:1em;" ng-repeat="pnd in $ctrl.wikipedia_data.pnds">
                             <div><span class="bold-text">Mehr über ... {{pnd.author}}</span></div>
                             <div>
                                {{pnd.abstract}} ...
                                <a class="arrow-link" href="{{pnd.wiki_url}}" target="_blank">

                                    <span ng-if="pnd.wiki_url.length>0">weiterlesen</span>

                                        <prm-icon ng-if="pnd.wiki_url.length>0" external-link
                                            icon-type="svg"
                                            svg-icon-set="primo-ui"
                                            icon-definition="open-in-new">
                                        </prm-icon>
        
                                        <prm-icon ng-if="pnd.wiki_url.length>0" link-arrow
                                              icon-type="svg"
                                              svg-icon-set="primo-ui"
                                              icon-definition="chevron-right">
                                       </prm-icon>

                                </a>

                             </div>
                         </div>
                         <div style="padding-top:1em;" ng-if="$ctrl.seealso_data.length > 0">
                             <div><span class="bold-text">Relevante Wikipedia-Artikel zum Buch mit ISBN {{$ctrl.isbns[0]}}</span></div>
                             <div ng-repeat="link in $ctrl.seealso_data[3]">
                                <a class="arrow-link" href="{{link}}" target="_blank">{{$ctrl.seealso_data[2][$index]}}</a>
                                    <prm-icon external-link
                                        icon-type="svg"
                                        svg-icon-set="primo-ui"
                                        icon-definition="open-in-new">
                                    </prm-icon>
        
                                    <prm-icon link-arrow
                                          icon-type="svg"
                                          svg-icon-set="primo-ui"
                                          icon-definition="chevron-right">
                                   </prm-icon>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>`
});
