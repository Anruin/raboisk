var libsDir = '/assets/libs/';
requirejs.config({
    paths: {
        'jquery': libsDir + 'jquery/jquery',
        'timeago': libsDir + 'jquery/jquery.timeago',
        'jquery-validate': libsDir + 'jquery/jquery.validate',
        'bootstrap': libsDir + 'bootstrap',
        'angular': libsDir + 'angular/angular',
        'angular-mocks': libsDir + 'angular/angular-mocks',
        'file-upload-shim': libsDir + 'angular/angular-file-upload-shim.min',
        'file-upload': libsDir + 'angular/angular-file-upload.min',
        'truncate' : libsDir + 'angular/truncate',
        'underscore': libsDir + 'underscore',
        'sugar': libsDir + 'sugar.min',
        'ui-route': libsDir + 'angular/angular-ui-router.min',
        'ui-bootstrap': libsDir + 'angular/ui-bootstrap-tpls.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'ui-route': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        'truncate': {
            deps: ['angular']
        },
        'file-upload': {
            deps: ['angular']
        },
        'jquery-validate': {
            deps: ['jquery']
        },
        'timeago': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        },
    },
    deps: ['bootstrap','file-upload-shim','file-upload']
});

require(['/assets/app'], function(app) {
    app.init();
});
