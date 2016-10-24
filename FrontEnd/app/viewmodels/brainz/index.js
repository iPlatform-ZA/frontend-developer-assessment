 define(['plugins/router'], function (router) {


     var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'viewmodels/brainz',
            fromParent: true
        }).map([
              // Manange Controller urls
              { route: '', moduleId: 'search', title: 'Search Artists', nav: true },
              { route: 'release/:Id', moduleId: 'release', title: 'Releases', nav: false },

        ]).buildNavigationModel()
      .mapUnknownRoutes(function (instruction) {
          instruction.config.moduleId = 'search';
          return instruction;
      });

     return {
         router: childRouter
     };
    
});