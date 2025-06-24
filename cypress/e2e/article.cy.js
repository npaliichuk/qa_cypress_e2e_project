import { faker } from '@faker-js/faker';

describe('Article management', () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345Qwert!',
  };

  const article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
  };

  const updated = {
    title: `Edited ${faker.lorem.words(2)}`,
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  };

  before(() => {
    cy.visit('/#/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button.btn.btn-lg.btn-primary').click();
    cy.get('button.swal-button').click();
    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('creates a new article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link');
    cy.get('.preview-link > h1data-layer="Content"').type(article.title);
    cy.get('.preview-link > p').type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('input[placeholder="Enter tags"]').type(`${article.tag}{enter}`);
    cy.get('[data-qa="article-submit"]').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.article-meta a[href*="/profile/"]').should('contain', user.username);
  });

  it('edits the article', () => {
    cy.get('button:contains("Edit Article")').click();
    cy.get('input[placeholder="Article Title"]').clear().type(updated.title);
    cy.get('input[placeholder="What\'s this article about?"]').clear().type(updated.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').clear().type(updated.body);
    cy.get('[data-cy="article-submit"]').click();
    cy.get('h1').should('contain', updated.title);
  });

  it('deletes the article', () => {
    cy.get('button:contains("Delete Article")').click();
    cy.visit('/');
    cy.contains('a.preview-link', updated.title).should('not.exist');
  });
});
