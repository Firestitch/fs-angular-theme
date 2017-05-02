

(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name fs.fsThemeProvider
     */

    angular.module('fs-angular-theme',[])
    .provider('fsTheme', function($mdThemingProvider) {
        var provider = this;

        this.options = function(options) {
        	options = options || {};
        	options.progressPercent = options.progressPercent || .8

			$mdThemingProvider
			.definePalette('default', {
							'50': 'fff',
							'100': 'fff',
							'200': 'fff',
							'300': 'fff',
							'400': 'fff',
							'500': options.accent, //accent color
							'600': ColorLuminance(options.accent,.25), //accent hover
							'700': 'fff',
							'800': 'fff',
							'900': 'fff',
							'A100': 'fff',
							'A200': options.primary, //primary color
							'A400': 'fff',
							'A700': ColorLuminance(options.primary,.25), //primary hover
							'contrastDefaultColor': 'light',
							'contrastLightColors': ['600', '700', '800', '900']
							});

			$mdThemingProvider.theme('default')
					.primaryPalette('default')
					.accentPalette('default');

			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '#loading-bar .bar {background: ' + ColorLuminance(options.accent,options.progressPercent) + ';}';
			document.getElementsByTagName('head')[0].appendChild(style);
        }

		function ColorLuminance(hex, lum) {

			// validate hex string
			hex = String(hex).replace(/[^0-9a-f]/gi, '');
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
			lum = lum || 0;

			// convert to decimal and change luminosity
			var rgb = "#", c, i;
			for (i = 0; i < 3; i++) {
				c = parseInt(hex.substr(i*2,2), 16);
				c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
				rgb += ("00"+c).substr(c.length);
			}

			return rgb;
		}

        this.$get = function() {
            return {};
        };
    });
})();


angular.module('fs-angular-theme').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/namespace.html',
    "<md-tabs md-selected=\"selected\" md-no-pagination md-enable-disconnect md-border-bottom><md-tab ng-repeat=\"item in items\" ng-click=\"redirect(item.path); $event.preventDefault();\">{{item.name}}</md-tab></md-tabs>"
  );

}]);
