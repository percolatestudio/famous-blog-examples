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
  var Particle = require('famous/physics/bodies/Particle');
  var PhysicsEngine = require('famous/physics/PhysicsEngine');
  var Modifier = require('famous/core/Modifier');
  var Spring = require('famous/physics/forces/Spring');
  var Surface = require('famous/core/Surface');
  var Vector = require('famous/math/Vector');

  var mainCtx = Engine.createContext();
  var PE = new PhysicsEngine();

  // Create a surface, content is html
  var surface = new Surface({
    size: [100, 100],
    content: '<span>Click To<br/>Spring<br/>Surface</span>',
    classes: ['test-surface']
  });

  // Create a physical particle with position (p), velocity (v), mass(m)
  var particle = new Particle({
    mass: 1,
    position: [0, 0, 0],
    velocity: [0, 0, 0]
  });

  // Create a spring that will act on the particle
  var spring = new Spring({
    anchor: [0, 0, 0],
    period: 400,  // <= Play with these values :-)
    dampingRatio: 0.07, // <=
    length: 0
  });

  // Apply a force on the surface when it's clicked
  surface.on('click', function (e) {
    particle.applyForce(new Vector(0, 0, -0.005 * 100));
  });

  // Link the spring, particle and surface together
  PE.attach(spring, particle);
  PE.addBody(particle);

  // Create the scene, applying a top level modifier to center
  // the scene vertically in the viewport
  mainCtx.add(new Modifier({ origin: [.5, .5] })).add(particle).add(surface);
  mainCtx.setPerspective(1000);
});