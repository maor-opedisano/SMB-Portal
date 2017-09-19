import { SelfOnBoardPage } from './app.po';

describe('self-on-board App', () => {
  let page: SelfOnBoardPage;

  beforeEach(() => {
    page = new SelfOnBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
