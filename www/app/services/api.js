/*===================================
=            API Service            =
===================================*/

app.factory('Proyectos', function($rootScope, pouchDB) {
        var dbc = pouchDB('idb://chapters');
        var db = pouchDB('idb://projects');
        var dbs = pouchDB('idb://settings');
        var works = [];
        var chapters = [];
        var settings = '';
        var state = {project: 'default'};
        return {
        	getDataTextile: function(){
            return dbs.find({
                  selector: {_id: {$eq: 'TextileSettings'}}
                });
         	 },
          setDataTextile: function(here){
            dbs.find({
                  selector: {_id: {$eq: 'TextileSettings'}}
                }).then(function (result) {
                  return {author: result[0].author, email: result[0].email, path: result[0].path};
            }).catch(function(err){
              dbc.put(here);
            });
         	},
          updateSetting: function(which, data){
            dbs.upsert("TextileSettings", function (doc) {
                    if(which == 'path'){
                      console.log(data)
                        doc.path = data;
                    } if(which == 'author'){
                        doc.author = data;

                    } if(which == 'email'){
                        doc.email = data;
                    } if(which == 'lang'){
                        doc.lang = data;
                    } 
                  return doc;
                }).then(function(docs){ $rootScope.$emit('update.settings'); }).catch(function (err) {
                   return 0;
                });
          },
          updateWork: function(row, data){
            var toset = data._id;
            db.upsert(toset, function (doc) {
                    if(row == 'title'){
                        doc.title = data.title;
                        works[data] = data;
                    } if(row == 'descripcion'){
                        doc.descripcion = data.descripcion;
                        works[data] = data;
                    } 
                  return doc;
                }).catch(function (err) {
                   return 0;
                });
          },
          newWork: function(titulo) {
                var ___id = guid();
            var project = {
            _id: ___id,
            title: titulo,
            descripcion: '',
            done: false,
            imgcover: '',
            iswork: 'true',
            type: 'word',
            theme: 'default',
            };
            works.push(project);
            db.put(project);
          },
          showp: function(){
            return works;
          },
          showWork: function(){
            return chapters;
          },
          shows: function(){
            return settings;
          },
          Writing: function(){
            return state.project;
          },
          setCurr: function(data){
            state.project = data;
            
            return state.project;
          },
          delWork: function(tab){
            var resultObject = search_id(tab._id, works);
            var index = works.indexOf(resultObject);
            if(index != -1){
                 works.splice(index, 1);
            db.get(tab._id, function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                db.remove(doc, function(err, response) {
                    return '1';
                });
            }
             });
              }
          },
          delChapter: function(tab){
            var resultTab = search_id(tab._id, chapters);
            var index = chapters.indexOf(resultTab);
            if(index != -1){
            chapters.splice(index, 1);
            dbc.get(tab._id, function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                dbc.remove(doc, function(err, response) {
                    $rootScope.$emit('update.splice', index);
                });
            }
             });
             }
          },
          findWork: function() {
            console.log("funceeeeeeeeeeeeeeeeeeeeeeeeeee!");
            db.find({
                  selector: {_id: {$gte: null}, type: {$eq: 'word'}},     
                  sort: ['_id']
                }).then(function (result) {
                    for (var i = 0; i < result.docs.length; i++) {
                     var docx = {_id: result.docs[i]._id, title: result.docs[i].title, descripcion: result.docs[i].descripcion, done: result.docs[i].done, imgcover: result.docs[i].imgcover, iswork: result.docs[i].iswork, type: result.docs[i].type, theme: result.docs[i].theme, expand: false};
                    works.push(docx);
                    }   });
          },
          saveWork: function(data){
            /*var htmlcontent = $("div#"+data).html();*/
            dbc.upsert(data, function (doc) {
                  doc.content = htmlcontent;
                  return doc;
                }).then(function (res) {
                  /*s uccess, res is {rev: '1-xxx', updated: true}*/
                  console.log("worked!")
                }).catch(function (err) {
                });
          },
          addChapter: function(chapter){
             if(state){
                    var projectin = state.project;
                
                } else {
                    var projectin = "default";
                }
            chapters.push(chapter);
            dbc.put(chapter);
            return chapter.then;
          },
          get_project_rows: function(project){
              return dbc.find({
                  selector: {_id: {$gte: null}, project: {$eq: project}},
                  sort: ['_id']
                })
          },
          get_chapter_row: function(tab){
              return dbc.find({
                  selector: {_id: {$eq: tab}},
                  sort: ['_id']
                })
          },
          removeAll: function(){
            new PouchDB('idb://projects').destroy().then(function () {
              new PouchDB('idb://chapters').destroy().then(function (res) {
                  return res;
              }).then(function(){
                  $rootScope.$emit('alltozero');
                }).catch(function (err) {
       
              })
            }).catch(function (err) {
              // error occurred
            })
           
          },
          clearDB: function(){
            db.compact().then(function (info) {
                // compaction complete
              }).catch(function (err) {
                // handle errors
              });
              db.compact().then(function (info) {
                // compaction complete
              }).catch(function (err) {
                // handle errors
              });
          },
          findPad: function(project, scope){
            chapters.length = 0;
               dbc.find({selector: {_id: {$gte: null}, project: {$eq: project}},sort: ['_id']}).then(function (result) {
                    for (var i = 0; i < result.docs.length; i++) {
                     var docx = {_id: result.docs[i]._id, title: result.docs[i].title, content: result.docs[i].content, disabled: false, done: false, project: result.docs[i].project};
                    chapters.push(docx);
                    } 
                }).then(function(res){ 
                 $rootScope.$emit('update.tabs', chapters);
          
            }).catch(function(error){  });
          }
      };
        });

/*=====  End of API Service  ======*/