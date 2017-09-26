'use strict'

const expect = require('chai').expect;
const { Page } = require('../models');
const chai = require("chai");
const should = chai.should();

chai.use(require('chai-things'));

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
            .catch(done);
        });
        it('does not get pages without the search tag', function(done) {
          Page.findByTag('hello')
            .then(function(pages){
              expect(pages).to.have.lengthOf(0);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('Instance methods', function () {
      let page1, page2, page3;
      before(function () {
        page1 = Page.build({
          title: 'foo',
          content: 'bar',
          tags: ['foo','bar']
        });
        page2 = Page.build({
          title: 'foo',
          content: 'bar',
          tags: ['foo','bass']
        });
        page3 = Page.build({
          title: 'foo',
          content: 'bar',
          tags: ['hello']
        });
        // page1.save();
        // page2.save();
        // page3.save();
      });   

      describe('findSimilar', function () {
        it('never gets itself', function() {
          expect(page1.findSimilar).should.not.include(page1);
        });
        it('gets other pages with any common tags', function(){

        });
        it('does not get other pages without any common tags', function(){

        });
      });
    });

    describe('Validations', function () {
      let page;
      beforeEach(function(){
        page = Page.build();
      });
      it('errors without title', function(done){
        page.validate() // return a valid page
        .then( function () { done(); })
        .catch(function(err){
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[0].path).to.equal('title');
          done();
          console.log('Error');
        })
      });
      it('errors without content');
      it('errors given an invalid status');
    });

    describe('Hooks', function () {
      it('it sets urlTitle based on title before validating');
    });

  });
