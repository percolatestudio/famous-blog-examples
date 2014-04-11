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

  var Engine    = require('famous/core/Engine');
  var Surface   = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Easing    = require('famous/transitions/Easing');
  var Modifier  = require('famous/core/Modifier');

  var mainCtx = Engine.createContext();

  // Create a surface, content is html
  var surface = new Surface({
      size:    [100, 100],
      content: '<span>Click To<br/>Move<br/>Surface</span>',
      classes: ['test-surface']
  });

  // Define Matrix transforms for start/end positions
  // and an easing curve to transition between them
  var startPos = Transform.translate(20, 20, 0);
  var endPos = Transform.translate(150, 200, 0);
  var transform = new Modifier({ transform: startPos });
  var easeTransition = { duration: 500, curve: Easing.inOutCubic };

  // Apply the transition on click and switch start/end
  surface.on('click', function (e) {
    transform.setTransform(endPos, easeTransition);
    startPos = [endPos, endPos = startPos][0];
  });

  mainCtx.add(transform).add(surface);
});