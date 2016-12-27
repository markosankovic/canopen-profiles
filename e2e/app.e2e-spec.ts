import { CanopenProfilesPage } from './app.po';

describe('canopen-profiles App', function() {
  let page: CanopenProfilesPage;

  beforeEach(() => {
    page = new CanopenProfilesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
