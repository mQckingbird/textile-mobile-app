/*=======================================
=            App Boostraping            =
=======================================*/

const app = angular.module('App', [ 'pascalprecht.translate', 'pouchdb', 'ngAnimate', 'ngAria', 'ngCookies', 'ngCordova', 'ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize', 'angular-medium-editor', 'fieldedit','fieldedits',]);

/*=====  End of App Boostraping  ======*/

/*================================
=            App Info            =
================================*/

var appInfo = {
	version     : '1.0.0',
	build       : '160101',
	releaseDate : '2016-01-01'
};

/*=====  End of App Info  ======*/

/*=============================
=            Paths            =
=============================*/

var paths = {
	views : 'app/views/view.'
};


var translationsEN = {
  "LANGUAGE_EN": 'English',
  "LANGUAGE_ES": 'Spanish',
  "FILES": 'Files',
  "SETTINGS": 'Settings',
  "FOLDER_STORAGE": 'Storage folder',
  "TREE_EMPTY": 'Your tree of articles is empty.',
  "HOW_ABOUT_CREATE_ONE": 'Want to add it the first brach?',
  "NEW_PROJECT": 'New project',
  "NEW": 'New',
  "ARTICLE_AS_PDF": 'Article as PDF',
  "ARTICLE_AS_EPUB": 'Article as EPUB',
  "ARTICLE_AS_TXT": 'Article as TXT',
  "ARTICLE_AS_HTML": 'Article as HTML',
  "CONSTRUCTING_ARTICLE": 'Creating article file',
  "CONSTRUCTING_PROJECT": 'Creating project files',
  "HOUSTON_WE_HAVE_A_PROBLEM": 'Houston, we have a problem.',
  "ARCHIVE_SAVED": 'File successfully saved (:',
  "PROJECT_SAVED": 'Project successfully created (:',
  "DELETE_ARTICLE": 'Delete article',
  "ARE_YOU_SURE": '¿Are you sure?',
  "DELETE": 'Delete',
  "CANCEL": 'Cancel',
  "CREATE_BUTTON": 'Create',
  "TITLE_OF_PROJECT": 'Title of your project',
  "UNTITLED": 'Untitled',
  "LOADING": 'Loading...',
  "WRITE_HERE": 'Write here...',
  "EXPORT": 'Export',
  "PREFERENCES": 'Preferences',
  "CONF_PROJECT": 'Settings of the project',
  "DESCRIPTION": 'Description',
  "DELETE_PROJECT": 'Delete project',
  "EXPORT_SUBTITLE": 'Take your work across platforms',
  "PDF_WHAT": 'Portable document format',
  "EPUB_WHAT": 'Widely open source format',
  "TXT_WHAT": 'Text plain multiplatform format',
  "HTML_WHAT": 'Markup language to render web pages',
  "DOCX_WHAT": 'Compatible with MS Office',
  "EPUB3_WHAT": 'EPUB new version with support for HTML5/TTS/...',
  "DELETE_PROJECT_TITLE": '¿Are you sure you want to do this?',
  "PROJECT_DELETE_SUBTITLE": 'All your work will be gone.',
  "DELETE_WORK": 'Delete work',
  "YOU": 'You',
  "DATABASES": 'Database',
  "ABOUT_TEXTILE": 'About',
  "APP_BEHAVIOR": "Application's behavior",
  "AUTHOR": 'Author',
  "AUTHOR_SET_SUB": 'It will be include before the title and description',
  "DESC_OPT": "Optional. Leave it blank if you don't want it",
  "MANAGE_YOUR_CONTENT": 'Manage your content',
  "FREE_SPACE": 'Clean database',
  "DESTROY_DB": 'Destroy everything',
  "ABOUT": {
    "FIRST_DATA": 'Your data not only will cross time, but also all your devices.',
    "SEC_DATA": 'Textile is a free platform, in active development by the whole community.',
    "THIRD_DATA": 'Keep in mind that this is an early alpha software, and errors can cross your path. No worries, they will be fix it. At time.'
  },
  "MATH": 'Math',
  "WRITE_YOUR_MATH": 'Write your expression',
  "ADD_MATH": 'Add math'
};

var translationsES= {
  "LANGUAGE_EN": 'Ingles',
  "LANGUAGE_ES": 'Español',
  "FILES": 'Archivos',
  "SETTINGS": 'Configuración',
  "FOLDER_STORAGE": 'Carpeta de almacenamiento',
  "TREE_EMPTY": 'Tu árbol de artículos está vacío.',
  "HOW_ABOUT_CREATE_ONE": '¿Qué tal si creas uno?',
  "NEW_PROJECT": 'Nuevo proyecto',
  "NEW": 'Nuevo',
  "ARTICLE_AS_PDF": 'Articulo como PDF',
  "ARTICLE_AS_EPUB": 'Articulo como EPUB',
  "ARTICLE_AS_TXT": 'Articulo como TXT',
  "ARTICLE_AS_HTML": 'Articulo como HTML',
  "CONSTRUCTING_ARTICLE": 'Creando archivo de artículo',
  "CONSTRUCTING_PROJECT": 'Creando archivos de proyecto',
  "HOUSTON_WE_HAVE_A_PROBLEM": 'Houston, tenemos un problema.',
  "ARCHIVE_SAVED": 'Archivo guardado (:',
  "PROJECT_SAVED": 'Proyecto guardado (:',
  "DELETE_ARTICLE": 'Borrar artículo',
  "ARE_YOU_SURE": '¿Estás segurx?',
  "DELETE": 'Eliminar',
  "CANCEL": 'Cancelar',
  "CREATE_BUTTON": 'Crear',
  "TITLE_OF_PROJECT": 'Titulo de proyecto',
  "UNTITLED": 'Sin título',
  "LOADING": 'Cargando...',
  "WRITE_HERE": 'Escribe aquí...',
  "EXPORT": 'Exportar',
  "PREFERENCES": 'Preferencias',
  "CONF_PROJECT": 'Configuración de proyecto',
  "DESCRIPTION": 'Descripción',
  "DELETE_PROJECT": 'Eliminar proyecto',
  "EXPORT_SUBTITLE": 'Lleva tu trabajo a cualquier plataforma',
  "PDF_WHAT": 'Formato portable de documento digital',
  "EPUB_WHAT": 'Formato estandarizado de código abierto',
  "TXT_WHAT": 'Formato de texto plano multiplataforma',
  "HTML_WHAT": 'Formato de etiquetas para elaboración de páginas web',
  "DOCX_WHAT": 'Compatible con MS Office',
  "EPUB3_WHAT": 'Nuevo formato EPUB con soporte HTML5/TTS/...',
  "DELETE_PROJECT_TITLE": '¿Estás seguro de borrar éste proyecto?',
  "PROJECT_DELETE_SUBTITLE": 'Todo tu trabajo será borrado.',
  "DELETE_WORK": 'Eliminar trabajo',
  "YOU": 'Tu',
  "DATABASES": 'Bases de datos',
  "ABOUT_TEXTILE": 'Acerca de',
  "APP_BEHAVIOR": 'Comportamiento de la aplicación',
  "AUTHOR": 'Autor',
  "AUTHOR_SET_SUB": 'Será incluido en tu exportación antes del título y descripción del proyecto',
  "DESC_OPT": 'Opcional. Déjalo en blanco si no quieres que sea parte del resultado',
  "MANAGE_YOUR_CONTENT": 'Administra tu contenido',
  "FREE_SPACE": 'Libera espacio',
  "DESTROY_DB": 'Destruir base de datos',
  "ABOUT": {
    "FIRST_DATA": 'Tus datos no sólo atravesarán el tiempo, también tus dispositivos.',
    "SEC_DATA": 'Textile es una opción libre, en activo desarrollo por la comunidad.',
    "THIRD_DATA": 'Ten en cuenta que éste software aún está en un estado de pruebas (aún no sabemos si podemos definirlo así), por lo que pueden aparecer errores. No te preocupes, todos serán solucionados.'
  },
  "MATH": 'Matemáticas',
  "WRITE_YOUR_MATH": 'Escribe tu fórmula',
  "ADD_MATH": 'Agregar expresión'
 };

app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.translations('en', translationsEN);
      $translateProvider.translations('es', translationsES);
    }]);
/*=====  End of Paths  ======*/

/*=====  End of Preloader  ======*/

// Quark
    function guid() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

function findindex(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
    return i;
    }
    }
    return null;
    }
function search_id(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i]._id === nameKey) {
            return myArray[i];
        }
    }
}