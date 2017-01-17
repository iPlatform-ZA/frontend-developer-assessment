require.config({
    baseUrl: "",
    paths: {
        "angular": "scripts/angular",
        "angularAMD": "scripts/angularAMD",
        "bootstrap": "scripts/bootstrap",
        "jquery": "scripts/jquery-1.9.1",
        "mainContainerController": "app/mainContainer/mainContainer.controller",
        "mainContainerDirective": "app/mainContainer/mainContainer.directive",
        "searchController": "app/search/search.controller",
        "searchDirective": "app/search/search.directive",
        "appService": "app/services/app.services",
        "resultsController": "app/results/results.controller",
        "resultsDirective":"app/results/results.directive"
    },
    shim: {
        "angular": "angular",
        "bootstrap": { deps: ["jquery"] }

    },
    deps: ["app/music.module"]
})