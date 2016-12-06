 define(['plugins/router'], function (router) {


     var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'viewmodels/last',
            fromParent: true
        }).map([
              // Manange Controller urls
              { route: '', moduleId: 'search', title: 'Search Artists', nav: true }

        ]).buildNavigationModel()
      .mapUnknownRoutes(function (instruction) {
          instruction.config.moduleId = 'search';
          return instruction;
      });

     return {
         router: childRouter
     };
    
});