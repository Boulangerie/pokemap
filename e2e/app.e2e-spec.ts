import { PokemapPage } from './app.po';

describe('pokemap App', function() {
  let page: PokemapPage;

  beforeEach(() => {
    page = new PokemapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
