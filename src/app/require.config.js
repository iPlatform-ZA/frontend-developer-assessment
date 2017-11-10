// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "bootbox":              "bower_modules/bootbox.js/bootbox",
        "knockout-postbox":     "bower_modules/knockout-postbox/build/knockout-postbox.min",
        "lodash":               "bower_modules/lodash/dist/lodash.min",
        "local-storage":        "bower_modules/localstorage/dist/local-storage",
        "toastr":               "bower_modules/toastr/toastr.min",
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "bootbox": {deps: ["bootstrap"]},
        "knockout-postbox":  { deps: ["knockout"] },
        "toastr": {deps: ["jquery"]}
    }
};
