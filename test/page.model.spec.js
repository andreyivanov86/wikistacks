const expect = require('chai').expect;
const { Page } = require('../models');

describe('Page model', function () {
    describe('Virtuals', function () {
      let page;
      beforeEach(function(){
        page = Page.build();
      });
      describe('route', function () {
        it('returns the url_name prepended by "/wiki/"', function(){
          page.urlTitle = 'some_title';
          expect(page.route).to.eql('/wiki/some_title');
        });

      });
      describe('renderedContent', function () {
        it('converts the markdown-formatted content into HTML', function(){
          page.content = 'Markdown';
          expect(page.renderedContent).to.eql('<p>Markdown</p>\n');

        });
      });
    });

    describe('Class methods', function () {
      describe('findByTag', function () {
        it('gets pages with the search tag');
        it('does not get pages without the search tag');
      });
    });

    describe('Instance methods', function () {
      describe('findSimilar', function () {
        it('never gets itself');
        it('gets other pages with any common tags');
        it('does not get other pages without any common tags');
      });
    });

    describe('Validations', function () {
      it('errors without title');
      it('errors without content');
      it('errors given an invalid status');
    });

    describe('Hooks', function () {
      it('it sets urlTitle based on title before validating');
    });

  });
