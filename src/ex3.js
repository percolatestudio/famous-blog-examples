require.config({
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index'
    }
});

define(function (require, exports, module) {
  'use strict';

  var Engine = require('famous/core/Engine');
  var Scrollview = require('famous/views/Scrollview');
  var Surface = require('famous/core/Surface');

  var mainCtx = Engine.createContext();

  // Create a scrollview and array to hold surfaces
  var scrollView = new Scrollview();
  var surfaces = [];

  // Create a numbered surface
  function createSurface(number) {
    return new Surface({
      size: [undefined, 100],
      content: "Surface " + number,
      classes: ["test-surface", (i % 2 ? 'odd' : 'even')]
    });
  }

  // Add many surfaces to the scrollView
  for (var i = 0; i < 20; i++) {
    surfaces.push(createSurface(i));
  }

  // Include the surfaces in the scrollview and pipe
  // events to it from the engine
  scrollView.sequenceFrom(surfaces);
  Engine.pipe(scrollView);

  mainCtx.add(scrollView);
});