angular.module('angular-medium-editor', [])

  .directive('mediumEditor', function() {

    function toInnerText(value) {
      var tempEl = document.createElement('div'),
          text;
      tempEl.innerHTML = value;
      text = tempEl.textContent || '';
      return text.trim();
    }

   
    return {
      require: 'ngModel',
      restrict: 'AE',

      scope: { 'save' : '&', bindOptions: '=', },
      link: function(scope, iElement, iAttrs, ngModel) {
        angular.element(iElement).addClass('angular-medium-editor');
        
          scope.bindOptions = {
            toolbar: {
              buttons: [
              "bold", "italic", "underline", "h1", "h2", "anchor"]
             },
             buttonLabels: 'fontawesome',/*
                extensions: {
                'insert': new MediumEditorInsert()
            },*/
            placeholder: {
        /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
                text: 'Escribe aquí...',
                hideOnClick: true
            },
            anchor: {
        placeholderText: 'Tipea un link'
    }
         };
        // Global MediumEditor
        ngModel.editor = new MediumEditor(iElement, scope.bindOptions);
      
        ngModel.$render = function() {
          iElement.html(ngModel.$viewValue || "");
          var placeholder = ngModel.editor.getExtensionByName('placeholder');
          if (placeholder) {
            placeholder.updatePlaceholder(iElement[0]);
          }
        };

        ngModel.$isEmpty = function(value) {
          if (/[<>]/.test(value)) {
            return toInnerText(value).length === 0;
          } else if (value) {
            return value.length === 0;
          } else {
            return true;
          }
        };

        ngModel.editor.subscribe('editableInput', _.debounce(function (event, editable) {
          ngModel.$setViewValue(editable.innerHTML.trim());

              scope.save();
        }, 3000));

        scope.$watch('bindOptions', function(bindOptions) {
          ngModel.editor.init(iElement, bindOptions);

        });
        
        scope.$on('$destroy', function() {
          ngModel.editor.destroy();
        });
     } 
    };

  });


angular.module('fieldedit', [])
.directive('editbutton', function() {
                  var dbc = new PouchDB('idb://chapters');
                   return { 
                       template: '<div ng-hide="editorEnabled">'+
                          '<md-button class="whitewhite nopadding" aria-label="Editar" ng-click="enableEditor(item)" style="vertical-align: middle;display: inline-flex; padding-left: 8px !important;">' +
                             '<i class="material-icons text-light" style="color: rgba(255,255,255,.8);">edit</i>' +
                          '</md-button>' +
                        '</div>' +
                    '<div ng-show="editorEnabled">' +
                      '<md-button class="whitewhite nopadding" aria-label="Editar" ng-click="save(item)" style="vertical-align: middle;display: inline-flex; padding-left: 8px !important;">' +
                        '<i class="material-icons text-light" style="color: rgba(255,255,255,.8);">done</i>' +
                      '</md-button>' +
                    '</div>',
                    restrict: 'AE',
                link: function(scope, elm, attrs, ctrl) {

                    scope.editorEnabled = false;
                     scope.idtobindinput = scope.current__id;

                  scope.enableEditor = function(item){
                    scope.editorEnabled = true;

                  };

                  scope.disableEditor = function(){
                    scope.editorEnabled = false;
                  };

                  scope.save = function(item){
                    // edit client side and server side
                   if(!!scope.tab.title){

                    scope.disableEditor();
                    
                    var __id = $('#projectactual').html();
                    console.log(__id);
                   
                    console.log("contenttitle: "+scope.tab.title);
                    dbc.upsert(__id, function (doc) {
                          doc.title = scope.tab.title;
                          return doc;
                        }).then(function (res) {
                          
                          // success, res is {rev: '1-xxx', updated: true}
                        }).catch(function (err) {
                         
                          // error
                        });
                        } else {
                            scope.tab.title = "Sin título";
                        }
                  };

                }
                };
                });

                angular.module('fieldedits', [])
                .directive('editfield', function() {
                return {
                restrict: 'AE',
                    scope: { value:"=editfield", editorEnabled: '='},
                   transclude: true,
                    template: '<span ng-hide="editorEnabled" ng-transclude></span>' +
                     '<span ng-show="editorEnabled"><md-input-container style="height:33px; padding-left:0px;"><input required class="input-medium nopadding" ng-model="value"></md-input-container></span>', // editable field
                   link: function(scope, elm, attrs, ctrl) {
 
                   }
                };
                });

/* ############################
   ############ Angular Blur ##
   ############################
   */
   angular.module("stBlurredDialog",[])
  .constant('stBlurredDialogClasses',{
    blurredRegion: 'st-blurred-region'  
   })
  .factory('stBlurredDialog', ['$timeout', function($timeout){
    var state = {
      subscribers: [],
      isOpen: false,
      dialogData: null
    } 

    return {
      open: function(pathToTemplate, data){
        $timeout(function(){
          state.dialogData = data;
          state.isOpen = true;
          angular.forEach(state.subscribers, function(subscriberCb){
            subscriberCb(state.isOpen, pathToTemplate);
          });
        });
      },
      close: function(){
        $timeout(function(){
          state.isOpen = false;
          angular.forEach(state.subscribers, function(subscriberCb){
            subscriberCb(state.isOpen);
          });
        });
      },
      isOpen: function(){
        return state.isOpen;
      },
      getDialogData: function(){
        return state.dialogData;
      },
      subscribe: function(cb){
        state.subscribers.push(cb);
      }
    }
  }])
  // This directive is used to blur the page
  .directive('stBlurredDialogRegion', [function(){
    return {
      restrict: "A",
      scope: {},
      controller: ['$scope', 'stBlurredDialog', '$element', 'stBlurredDialogClasses', function($scope, stBlurredDialog, $element, stBlurredDialogClasses){

        stBlurredDialog.subscribe(function(isOpen, path, data){
          if(isOpen){
            $element.addClass(stBlurredDialogClasses.blurredRegion);
          }
          else{
            $element.removeClass(stBlurredDialogClasses.blurredRegion);
          }
        });

            }],
      link: function(scope, element, attrs){
      }
    }
  }])
  // This directive is used to show the modal dialog
  .directive('stBlurredDialogOverlay', [function(){
    return {
      restrict: "E",      
      replace: true,
      template:   "<div ng-if='model.isOpen' class='st-blurred-region-overlay'>" +
            "<md-button class='md-fab md-mini st-blurred-region-close' aria-label='Cerrar' ng-click='close()' flex='50' style='line-height: 22px;'><ng-md-icon icon='cancel'></ng-md-icon></md-button>" +
              "<div ng-include src='model.pathToTemplate'></p>" +
            "</div>",
      controller: ['$scope', 'stBlurredDialog', '$element', function($scope, stBlurredDialog, $element){

        $scope.model = {
          // We need to bind to the state of the service to check for state changes
          isOpen: false,
          pathToTemplate: null
        }

        stBlurredDialog.subscribe(function(isOpen, path){
          $scope.model.isOpen = isOpen;
          $scope.model.pathToTemplate = path;
        });
        
        $scope.close = function(){
          stBlurredDialog.close();
        }
            }],
      link: function(scope, element, attrs){
      }
    }
  }]);
