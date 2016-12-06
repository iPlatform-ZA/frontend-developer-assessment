
requirejs.config({
    baseUrl: 'app/',
    paths: {
        'text': 'libs/requirejs-text/text',
        'durandal': 'libs/durandal/js',
        'plugins': 'libs/durandal/js/plugins',
        'transitions': 'libs/durandal/js/transitions',
        'jquery': 'libs/jquery/dist/jquery.min',
        'knockout': 'libs/knockout/dist/knockout',
        'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',
        'mapper': 'libs/knockout.mapping/knockout.mapping',
        'moment': 'libs/moment/moment',
        'toastr': 'libs/toastr/toastr.min'
    },
    shim: {

        'knockout.validation': { deps: ["knockout"] },
        'mapper': { deps: ["knockout"] },
        'bootstrap': { deps: ['jquery'] },
    }
});


define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'knockout'],
    function (system, app, viewLocator, ko) {
        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");
        app.title = 'Music';

        app.configurePlugins({
            router: true,
            dialog: true,
            widget: true
        });

        app.start().then(function () {
            viewLocator.useConvention();
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });