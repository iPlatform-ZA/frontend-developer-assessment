import { Angular2MusicOnlinePage } from './app.po';

describe('angular2-music-online App', function() {
  let page: Angular2MusicOnlinePage;

  beforeEach(() => {
    page = new Angular2MusicOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
