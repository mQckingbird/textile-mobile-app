/*============================================
=            Router Configuration            =
============================================*/

app.config(function($routeProvider) {
	$routeProvider		
		.when('/', {
			redirectTo: '/start'
		})
		.when('/start', {
			templateUrl: paths.views + 'start.html'
		})
		.otherwise({
			redirectTo: '/404'
		});
});

/*=====  End of Router Configuration  ======*/