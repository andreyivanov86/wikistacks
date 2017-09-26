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
      before(function (done) {

        // delete table and recreate with our new schema
        Page.sync({force: true})
        .then(function(){
          return Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
          })
        })
        .then(function () {
          done();
        })
        .catch(done);
      });
      describe('findByTag', function () {
        it('gets pages with the search tag', function(done) {
          Page.findByTag('bar')
            .then(function(pages) {
              expect(pages).to.have.lengthOf(1);
              done();
            })
            .catch(done)
        });
        it('does not get pages without the search tag', function(done) {
          Page.findByTag('hello')
            .then(function(pages){
              expect(pages).to.have.lengthOf(0);
              done();
            })
            .catch(done)
        });
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
