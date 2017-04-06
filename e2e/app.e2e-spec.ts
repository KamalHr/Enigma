import { ENIGMAPage } from './app.po';

describe('enigma App', () => {
  let page: ENIGMAPage;

  beforeEach(() => {
    page = new ENIGMAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
