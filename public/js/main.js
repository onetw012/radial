var GUI, RadialNav, gui;


  RadialNav = (function() {
    function RadialNav(paper, buttons) {
      this.area = paper.svg(0, 0, this.size = 500, this.size).addClass('radialNav');
      this.c = this.size / 2;
      this.r = this.size * .25;
      this.r2 = this.r * .35;
      this.angle = 360 / buttons.length;
      this.container = this.area.g();
      /*this.updateButtons(buttons);*/
    }

    return RadialNav;

  })();

GUI = (function() {
  function GUI(buttons) {
    this.paper = Snap(window.innerWidth, window.innerHeight);
    this.nav = new RadialNav(this.paper, buttons);
    this._bindEvents();
  }

  GUI.prototype._bindEvents = function() {
    return window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.paper.attr({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
    })(this));
  };

  GUI.prototype._sector = function() {
    return this.area.path.addClass('radialNav-sector');
  };

  GUI.prototype.updateButtons = function(buttons) {
    this.nav.container.clear();
  };

  return GUI;

})();

gui = new GUI([
  {
    icon: 'pin',
    action: function() {
      return console.log('Pinning...');
    }
  }, {
    icon: 'search',
    action: function() {
      return console.log('Search...');
    }
  }, {
    icon: 'cloud',
    action: function() {
      return console.log('CLoud...');
    }
  }, {
    icon: 'settings',
    action: function() {
      return console.log('Settings...');
    }
  }
]);

  function polarToCartesian (cx, cy, r, angle) {
    angle = (angle - 90) * Math.PI / 180;

    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    }
  }


  function describeArc (x, y, r, startAngle, endAngle) {
    var start = polarToCartesian(x, y, r, startAngle %= 360);
    var end = polarToCartesian(x, y, r, endAngle %= 360);
    var large = Math.abs(endAngle - startAngle) >= 180;
    var str = "M "+start.x+","+start.y+" A"+r+","+r+",0,";
    str += "" + (large)? 0 : 1;
    str += ",1," + end.x+","+end.y;
    return str;
  }

  function describeSector (x, y, r, r2, startAngle, endAngle) {
    var str = describeArc (x, y, r, startAngle, endAngle);
    str += describeArc (x, y, r2, startAngle, endAngle);
    return str;
  }


gui.paper
  .path(describeSector(600, 500, 120, 50, 0, 310))
  .attr({
    fill: "transparent",
    stroke: '#fff',
    strokeWidth: 4
  })
  .drag();
