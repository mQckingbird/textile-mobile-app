

/*========================================
=            Start Controller            =
========================================*/

app.controller('StartCtrl', function($scope,  $rootScope, $mdDialog, $translate, $mdSidenav, $mdMedia, Proyectos, pouchDB) {
       console.log("func!");
        Proyectos.findWork();
          
        var tabs = [], selected = null, previous = null;
        $scope.tabs = tabs;
        $scope.projects = Proyectos.showp();
        $scope.ArrayTextile = Proyectos.shows();
        $scope.selectedIndex = 2;
        $scope.$watch('selectedIndex', function (current, old) {
            previous = selected;
            selected = tabs[current];
        });
        
        $rootScope.$on('update.tabs', function(event, result){
            $scope.tabs.length = 0;
            for (var i = 0; i < result.length; i++) {
               var docx = {_id: result[i]._id, title: result[i].title, content: result[i].content, disabled: false, done: false, project: result[i].project};
                $scope.tabs.push(docx);
           }
           
         });
        $rootScope.$on('alltozero', function(){
            $scope.tabs.length = 0;
            $scope.projects.length = 0;
            Proyectos.findWork();
            $scope.tab = 'default';
            });
        $rootScope.$on('update.splice', function(event, result){
            console.log(result);
            $scope.tabs.splice(result, 1);
              $rootScope.$apply();
            });
        $rootScope.$on('update.settings', function(){
            Proyectos.getDataTextile().then(function(result){
          $scope.ArrayTextile = {author: result.docs[0].author, email: result.docs[0].email, path: result.docs[0].path, lang: result.docs[0].lang};
          $scope.$apply();

        }).catch(function(err){
          $scope.ArrayTextile = {_id: 'TextileSettings', author: 'Usuaro', email: 'tu@email.dm', path: appt.getPath('home')};
          Proyectos.setDataTextile($scope.ArrayTextile);
        });
            });
        

        
   

        $scope.tab = 'default';
        $scope.isSet = function(tabNum){
          return $scope.tab === tabNum;
        };
        $scope.ArrayTextile = '';
        Proyectos.getDataTextile().then(function(result){
          $scope.ArrayTextile = {author: result.docs[0].author, email: result.docs[0].email, path: result.docs[0].path, lang: result.docs[0].lang };
          if(result.docs[0].lang) {$translate.use(result.docs[0].lang);} else {$translate.use('en');}
          $scope.$apply();
          $scope.loadchaps('default');
          console.log($scope.ArrayTextile);
        }).catch(function(err){
          $scope.ArrayTextile = {_id: 'TextileSettings', author: 'Usuario', email: 'tu@email.dm', path: ''};
          $translate.use('en');
          Proyectos.setDataTextile($scope.ArrayTextile);
          $scope.loadchaps('default');
          $scope.$apply();
        });
        $scope.addTab = function () {
            var chapter = {
            _id: guid(),
            title: $translate.instant('UNTITLED'),
            content: $translate.instant('WRITE_HERE'),
            disabled: false,
            done: false,
            project: $scope.tab
            };
          Proyectos.addChapter(chapter);
          $scope.tabs.push(chapter);
           
        };
        $scope.isSet = function(tabNum){
          return $scope.tab === tabNum;
        };

        $scope.newProject = function () {
             $mdDialog.show({
                  controller: function($scope, $mdDialog) {
                     $scope.create = function() {
                        $mdDialog.hide();
                        Proyectos.newWork($scope.titulo.project);
                     }
                     $scope.close = function() {
                        $mdDialog.hide();
                     }
                  },
                  template: '<md-dialog aria-label="NewProject" ng-cloak style="overflow:hidden;"><form><md-dialog-content><md-input-container class="md-block" style="margin: 25px 4px 0 4px;"><label>'+$translate.instant('TITLE_OF_PROJECT')+'</label><input ng-model="titulo.project" ng-required="true"> </md-input-container><md-dialog-actions layout="row" style="padding:0;"><md-button class="md-primary md-raised" ng-click="close()">'+$translate.instant('CANCEL')+'</md-button><span flex></span><md-button class="md-default md-raised" class="md-default md-raised" ng-click="create()" style="margin-right:10px;" md-autofocus ng-disabled="!(!!titulo.project)">'+$translate.instant('CREATE_BUTTON')+'</md-button></md-dialog-actions></form></md-dialog>',
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
                })
        };

        $scope.removeTab = function (tab) {
                var confirm = $mdDialog.confirm()
                  .title($translate.instant('DELETE_ARTICLE'))
                  .textContent($translate.instant('ARE_YOU_SURE'))
                  .ariaLabel($translate.instant('DELETE'))
                 
                  .ok($translate.instant('DELETE'))
                  .cancel($translate.instant('CANCEL'));

            $mdDialog.show(confirm).then(function() {
             Proyectos.delChapter(tab);
             console.log(tab);
         }, function() {
              $scope.$apply();
            });
            
            
        };
        
         $scope.Math = function (tab, expression) {
                $mdDialog.show({
                    controller: 'MathController',
                  templateUrl: 'ui/math.html',
                  parent: angular.element(document.body),
                  locals : {
                        tab : tab,
                        newexp: expression
                    },
                  clickOutsideToClose:true
                })
            };
        $scope.closeDialog = function() {
                  $mdDialog.hide();
            }

 
        $scope.loadchaps = function(data) {  
            if(data){
                 var project = data;

                } else {
                   var project = "default";
                }
                $scope.tab = project;
              Proyectos.findPad(project);
          /*    Notification($translate.instant('LOADING')); */
        };

        $scope.saveData = function (data) {
            Proyectos.saveWork(data);
        };
        $scope.changeLanguage = function (key) {
          $translate.use(key);
          Proyectos.updateSetting('lang', key);
        };

        $scope.PDF_Single = function () {
           

            var __id = $('#projectactual').html();
            var html = "";
            var titlexw = "";
            Notification($translate.instant('CONSTRUCTING_ARTICLE'));
            console.log(__id);
               Proyectos.get_chapter_row(__id).then(function (result) {
                  for (var i = 0; i < result.docs.length; i++) {
                    html += '<h2>'+result.docs[i].title+'</h2>';
                    titlexw += result.docs[i].title;

                    html += '<div>'+result.docs[i].content+'</div>';
                    console.log(result.docs[i].title);
                    };
                    console.log(result);
                }).then(function (res) {
  
                }).catch(function(error){ Notification($translate.instant('HOUSTON_WE_HAVE_A_PROBLEM')); });
             

        };
         $scope.EPUB_Single = function () {
            var __id = $('#projectactual').html();
            var titlexw = "";
            Notification($translate.instant('CONSTRUCTING_ARTICLE'));
            console.log(__id);
               Proyectos.get_chapter_row(__id).then(function (result) {

                    return result;
                }).then(function (res) {
                   epubStream.end().pipe( fs.createWriteStream($scope.ArrayTextile.path+'/'+titlexw+'.epub') );
                   Notification($translate.instant('ARCHIVE_SAVED'));
                });
           
        };
         $scope.TXT_Single = function () {
            var __id = $('#projectactual').html();
            var html = "";
            var titlexw = "";
            Notification($translate.instant('CONSTRUCTING_ARTICLE'));
               Proyectos.get_chapter_row(__id).then(function (result) {
                var titlexw = result.docs[0].title;
                  for (var i = 0; i < result.docs.length; i++) {
                    html += '<h3>'+result.docs[i].title+'</h3>';
                    html += '<hr>';
                    html += result.docs[i].content;
                    html += '<hr>';
                    };
                }).then(function (res) {

                      }).catch(function(err){ console.log(err); Notification($translate.instant('HOUSTON_WE_HAVE_A_PROBLEM')); });
        };

         $scope.HTML_Single = function () {
            var __id = $('#projectactual').html();
            var html = "";
            var titlexw = "";
            Notification($translate.instant('CONSTRUCTING_ARTICLE'));
            console.log(__id);
               Proyectos.get_chapter_row(__id).then(function (result) {
                  for (var i = 0; i < result.docs.length; i++) {
                    html += '<h2>'+result.docs[i].title+'</h2>';
                    titlexw += result.docs[i].title;

                    html += '<div>'+result.docs[i].content+'</div>';
                    };
                }).then(function (res) {
                    
                }).catch(function(error){ console.log(error); Notification($translate.instant('HOUSTON_WE_HAVE_A_PROBLEM')); });
             

        };
        $scope.setID = function(id){
            $('#projectactual').html(id);
        }
        $scope.settingsproj = function(project){
        // Call open() with a template and some data
                 stBlurredDialog.open('ui/settings.html', project);
                     $scope.currentproject = project;
         }
         $scope.configuretextile = function(){
            stBlurredDialog.open('ui/configure.html');
         }

                    $scope.toggleSidenav = function (menu) {
                    $mdSidenav(menu).toggle();
                    };

                $scope.selected = [];
                $scope.toggle = function (item, list) {
                    var idx = list.indexOf(item);
                    if (idx > -1) {
                        list.splice(idx, 1);
                    }
                    else{
                        list.push(item);
                    }
                };
  
});

/*=====  End of Start Controller  ======*/