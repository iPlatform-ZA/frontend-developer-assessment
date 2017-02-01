import { FrontendDeveloperAssessmentPage } from './app.po';

describe('frontend-developer-assessment App', function() {
  let page: FrontendDeveloperAssessmentPage;

  beforeEach(() => {
    page = new FrontendDeveloperAssessmentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
