/*============================================
=            Compare To Directive            =
============================================*/

app.directive('compareTo', function() {
	return {
		require: 'ngModel',
		scope: {
			compareValue: '=compareTo'
		},
		link: function(scope, element, attributes, ngModel) {
			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.compareValue;
			};

			scope.$watch('compareValue', function() {
				ngModel.$validate();
			});
		}
	};
});

/*=====  End of Compare To Directive  ======*/