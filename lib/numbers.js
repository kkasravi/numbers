(function() {
  var nm = module.Module('numbers');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var Sections = (function() {
      function Sections() {
        function privateData() {
          this.element = null;
          this.sections = null;
          this.sets = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var sections = p_vars.sections;
        Object.getOwnPropertyDescriptor(this,'sections') || Object.defineProperty(this,'sections', {get: function(){return sections;},set: function(e){sections=e;}});
        var sets = p_vars.sets;
        Object.getOwnPropertyDescriptor(this,'sets') || Object.defineProperty(this,'sets', {get: function(){return sets;},set: function(e){sets=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {
            sets:[]
          };
          this.element=monads.DOMable({
            tagName:'section'
          }).on('load').attributes({
            'class':'sections'
          });
          this.sets=properties.sets;
          this.sections=[];
          this.sets.forEach(function (set) {
            this.sections.push(Section({
              set:set
            }));
          },this);
          this.sections.forEach(function (section) {
            this.element.add(section.element);
          },this);
        }
        return ctor.apply(this,args) || this;
      }
      Sections.style = (function () {
        var styles=[{
          selector:'.sections',
          style:"display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;margin:10em auto;"
        }];
        return monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.style = Sections.style;
        __.constructor = Sections;
        return new Sections(args && args.length && args[0]);
      };
    })();
    exports.Sections = Sections;
    var Section = (function() {
      function Section() {
        function privateData() {
          this.element = null;
          this.carousel = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var carousel = p_vars.carousel;
        Object.getOwnPropertyDescriptor(this,'carousel') || Object.defineProperty(this,'carousel', {get: function(){return carousel;},set: function(e){carousel=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.carousel=Carousel(properties);
          this.element=monads.DOMable({
            tagName:'section'
          }).on('load').attributes({
            'class':'section'
          }).add(this.carousel.element).insert(document.body);
          this.carousel.modify();
        }
        return ctor.apply(this,args) || this;
      }
      Section.init = (function () {
        var styles=[{
          selector:'.section',
          style:"width:210px;height:200px;border:1px solid #CCC;-webkit-perspective:1100px;overflow:hidden;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Section.init;
        __.constructor = Section;
        return new Section(args && args.length && args[0]);
      };
    })();
    var Carousel = (function() {
      function Carousel() {
        function privateData() {
          this.children = null;
          this.element = null;
          this.horizontal = null;
          this.panelCount = null;
          this.panelSize = null;
          this.radius = null;
          this.rotateFn = null;
          this.rotation = null;
          this.set = null;
          this.theta = null;
        }
        var p_vars = new privateData();
        var children = p_vars.children;
        Object.getOwnPropertyDescriptor(this,'children') || Object.defineProperty(this,'children', {get: function(){return children;},set: function(e){children=e;}});
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var horizontal = p_vars.horizontal;
        Object.getOwnPropertyDescriptor(this,'horizontal') || Object.defineProperty(this,'horizontal', {get: function(){return horizontal;},set: function(e){horizontal=e;}});
        var panelCount = p_vars.panelCount;
        Object.getOwnPropertyDescriptor(this,'panelCount') || Object.defineProperty(this,'panelCount', {get: function(){return panelCount;},set: function(e){panelCount=e;}});
        var panelSize = p_vars.panelSize;
        Object.getOwnPropertyDescriptor(this,'panelSize') || Object.defineProperty(this,'panelSize', {get: function(){return panelSize;},set: function(e){panelSize=e;}});
        var radius = p_vars.radius;
        Object.getOwnPropertyDescriptor(this,'radius') || Object.defineProperty(this,'radius', {get: function(){return radius;},set: function(e){radius=e;}});
        var rotateFn = p_vars.rotateFn;
        Object.getOwnPropertyDescriptor(this,'rotateFn') || Object.defineProperty(this,'rotateFn', {get: function(){return rotateFn;},set: function(e){rotateFn=e;}});
        var rotation = p_vars.rotation;
        Object.getOwnPropertyDescriptor(this,'rotation') || Object.defineProperty(this,'rotation', {get: function(){return rotation;},set: function(e){rotation=e;}});
        var set = p_vars.set;
        Object.getOwnPropertyDescriptor(this,'set') || Object.defineProperty(this,'set', {get: function(){return set;},set: function(e){set=e;}});
        var theta = p_vars.theta;
        Object.getOwnPropertyDescriptor(this,'theta') || Object.defineProperty(this,'theta', {get: function(){return theta;},set: function(e){theta=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.children=[];
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'carousel'
          });
          this.rotation=0;
          this.set=properties.set;
          this.panelCount=this.set.length || 0;
          this.theta=0;
          this.horizontal=false;
          this.set.forEach(function (character) {
            this.children.push(monads.DOMable({
              tagName:'figure'
            }).on('load').attributes({
              'class':'field'
            }).text(character));
          },this);
          this.children.forEach(function (child) {
            this.element.add(child);
          },this);
        }
        return ctor.apply(this,args) || this;
      }
      Carousel.prototype['modify'] = function() {
        var panel,angle,i;
        this.panelSize=this.element.attribute(this.horizontal?'offsetWidth':'offsetHeight') || 0;
        this.rotateFn=this.horizontal?'rotateY':'rotateX';
        this.theta=360 / this.panelCount;
        this.radius=Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));
        for(i=0;i < this.panelCount;++i) {
          panel=this.children[i];
          if(panel) {
            angle=this.theta * i;
            panel.style({
              'opacity':'1',
              '-webkit-transform':this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)'
            });
          }
        }
        for(;i < this.set.length;++i) {
          panel=this.element.child(i);
          if(panel) {
            panel.style.opacity=0;
            panel.style['-webkit-transform']='none';
          }
        }
        this.rotation=Math.round(this.rotation / this.theta) * this.theta;
        return this.transform();
      };
      Carousel.prototype['next'] = function() {
        this.rotation+=this.theta * -1;
        return this.transform();
      };
      Carousel.prototype['prev'] = function() {
        this.rotation-=this.theta * -1;
        return this.transform();
      };
      Carousel.prototype['transform'] = function() {
        this.element.style({
          '-webkit-transform':'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)'
        });
        return this;
      };
      Carousel.init = (function () {
        var styles=[{
          selector:'.carousel',
          style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-215px) rotateX(-72deg);-webkit-backface-visibility:hidden;-webkit-transition:-webkit-transform 1s;"
        },{
          selector:'.field',
          style:"background-color:rgba(255,0,140,0.796875);opacity:0;-webkit-transform:none;display:block; position: absolute; width: 186px; height: 160px; left: 10px; top: 10px; border: 2px solid black; line-height: 116px; font-size: 80px; font-weight: bold; color: white; text-align: center;margin:0;-webkit-backface-visibility:hidden;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Carousel.init;
        __.constructor = Carousel;
        return new Carousel(args && args.length && args[0]);
      };
    })();
    var AppType = (function() {
      function AppType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          Sections({
            sets:[['0','1','2','3','4','5','6','7','8','9'],['\u002D','\u00D7','\u00F7','\u002B'],['0','1','2','3','4','5','6','7','8','9'],['\u003D','\u003D'],['10','20','30']]
          });
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = AppType;
        return new AppType(args && args.length && args[0]);
      };
    })();
    const App=AppType;
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

