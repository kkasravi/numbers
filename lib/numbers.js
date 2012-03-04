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
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var sections = p_vars.sections;
        Object.getOwnPropertyDescriptor(this,'sections') || Object.defineProperty(this,'sections', {get: function(){return sections;},set: function(e){sections=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.element=monads.DOMable({
            tagName:'section'
          }).on('load').attributes({
            'class':'sections'
          }).insert(document.body);
          this.sections=[];
          this.sections.push(Section());
          this.sections.forEach(function (section) {
            this.element.add(section);
          },this);
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Sections.init = (function () {
        var styles=[{
          selector:'.sections',
          style:"display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Sections.init;
        __.constructor = Sections;
        return new Sections(args && args.length && args[0]);
      };
    })();
    var Section = (function() {
      function Section() {
        function privateData() {
          this.element = null;
          this.numbers = null;
        }
        var p_vars = new privateData();
        var element = p_vars.element;
        Object.getOwnPropertyDescriptor(this,'element') || Object.defineProperty(this,'element', {get: function(){return element;},set: function(e){element=e;}});
        var numbers = p_vars.numbers;
        Object.getOwnPropertyDescriptor(this,'numbers') || Object.defineProperty(this,'numbers', {get: function(){return numbers;},set: function(e){numbers=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.numbers=Numbers({
            panelCount:10
          });
          this.element=monads.DOMable({
            tagName:'section'
          }).on('load').attributes({
            'class':'section'
          }).add(this.numbers.element).insert(document.body);
          this.numbers.modify();
          return this.element;
        }
        return ctor.apply(this,args) || this;
      }
      Section.init = (function () {
        var styles=[{
          selector:'.section',
          style:"top:50%;width:210px;height:140px;position:relative;margin:0 auto 40px;border:1px solid #CCC;-webkit-perspective:1100px;overflow:hidden;"
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
    var Numbers = (function() {
      function Numbers() {
        function privateData() {
          this.children = null;
          this.element = null;
          this.horizontal = null;
          this.panelCount = null;
          this.panelSize = null;
          this.radius = null;
          this.rotateFn = null;
          this.rotation = null;
          this.theta = null;
          this.totalPanelCount = null;
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
        var theta = p_vars.theta;
        Object.getOwnPropertyDescriptor(this,'theta') || Object.defineProperty(this,'theta', {get: function(){return theta;},set: function(e){theta=e;}});
        var totalPanelCount = p_vars.totalPanelCount;
        Object.getOwnPropertyDescriptor(this,'totalPanelCount') || Object.defineProperty(this,'totalPanelCount', {get: function(){return totalPanelCount;},set: function(e){totalPanelCount=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.children=[];
          this.element=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'numbers'
          });
          this.rotation=0;
          this.panelCount=properties.panelCount || 0;
          this.totalPanelCount=20;
          this.theta=0;
          this.horizontal=false;
          for(var i=0;i < this.totalPanelCount;++i) {
            this.children.push(monads.DOMable({
              tagName:'figure'
            }).on('load').attributes({
              'class':'field'
            }).text(i + ""));
          }
          this.children.forEach(function (child) {
            this.element.add(child);
          },this);
        }
        return ctor.apply(this,args) || this;
      }
      Numbers.prototype['modify'] = function() {
        var panel,angle,i;
        this.panelSize=this.element.attribute(this.horizontal?'offsetWidth':'offsetHeight') || 0;
        this.rotateFn=this.horizontal?'rotateY':'rotateX';
        this.theta=360 / this.panelCount;
        this.radius=Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));
        for(i=0;i < this.panelCount;++i) {
          panel=this.children[i];
          if(panel) {
            angle=this.theta * i;
            log.Logger.debug(this,this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)');
            panel.style({
              'opacity':'1',
              'background-color':'hsla(' + angle + ', 100%, 50%, 0.8)',
              '-webkit-transform':this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)'
            });
          }
        }
        for(;i < this.totalPanelCount;++i) {
          panel=this.element.child(i);
          if(panel) {
            panel.style.opacity=0;
            panel.style['-webkit-transform']='none';
          }
        }
        this.rotation=Math.round(this.rotation / this.theta) * this.theta;
        this.transform();
        return this;
      };
      Numbers.prototype['next'] = function() {
        this.rotation+=this.theta * -1;
        this.transform();
      };
      Numbers.prototype['transform'] = function() {
        this.element.style({
          '-webkit-transform':'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)'
        });
        return this;
      };
      Numbers.init = (function () {
        var styles=[{
          selector:'.numbers',
          style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-215px) rotateX(-72deg);-webkit-backface-visibility:hidden;-webkit-transition:-webkit-transform 1s;"
        },{
          selector:'.field',
          style:"background-color:rgba(255,0,140,0.796875);opacity:0;-webkit-transform:none;display:block; position: absolute; width: 186px; height: 116px; left: 10px; top: 10px; border: 2px solid black; line-height: 116px; font-size: 80px; font-weight: bold; color: white; text-align: center;margin:0;-webkit-backface-visibility:hidden;"
        }];
        monads.Styleable(styles).on("load").onstyle();
      })();
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.init = Numbers.init;
        __.constructor = Numbers;
        return new Numbers(args && args.length && args[0]);
      };
    })();
    var AppType = (function() {
      function AppType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          Sections();
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = AppType;
        return new AppType(args && args.length && args[0]);
      };
    })();
    const App=AppType();
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

