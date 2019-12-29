import { CursoAngularCliPage } from './app.po';

describe('curso-angular-cli App', function() {
  let page: CursoAngularCliPage;

  beforeEach(() => {
    page = new CursoAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
