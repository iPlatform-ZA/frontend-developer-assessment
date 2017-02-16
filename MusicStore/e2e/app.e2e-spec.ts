import { Testapp1Page } from './app.po';

describe('testapp1 App', function() {
  let page: Testapp1Page;

  beforeEach(() => {
    page = new Testapp1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
