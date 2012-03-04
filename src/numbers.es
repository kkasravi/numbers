module numbers {
  module log from 'log';
  module monads from 'monads';
  class Sections {
    constructor() {
      private element, sections;
      @element = monads.DOMable({tagName:'section'}).on('load').attributes({'class':'sections'}).insert(document.body);
      @sections = [];
      @sections.push(Section());
      @sections.forEach(function(section) {
        @element.add(section);
      }, this);
      return @element;
    }
    static init = (function() {
      var styles = [
        {selector:'.sections',style:"display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Section {
    constructor() {
      private element, numbers;
      @numbers = Numbers({panelCount:10});
      @element = monads.DOMable({tagName:'section'}).on('load').attributes({'class':'section'}).add(
        @numbers.element
      ).insert(document.body);
      @numbers.modify();
      return @element;
    }
    static init = (function() {
      var styles = [
        {selector:'.section',style:"top:50%;width:210px;height:140px;position:relative;margin:0 auto 40px;border:1px solid #CCC;-webkit-perspective:1100px;overflow:hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Numbers {
    constructor(properties={}) {
      private children, element, horizontal, panelCount, panelSize, radius, rotateFn, rotation, theta, totalPanelCount;
      @children = [];
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'numbers'});
      @rotation = 0;
      @panelCount = properties.panelCount || 0;
      @totalPanelCount = 20;
      @theta = 0;
      @horizontal = false;
      for (var i = 0; i < @totalPanelCount; i++ ) {
        @children.push(monads.DOMable({tagName:'figure'}).on('load').attributes({'class':'field'}).text(i+""));
      }
      @children.forEach(function(child) {
        @element.add(child);
      }, this);
    }
    modify() {
      var panel, angle, i;
      @panelSize = @element.attribute(@horizontal ? 'offsetWidth' : 'offsetHeight') || 0;
      @rotateFn = @horizontal ? 'rotateY' : 'rotateX';
      @theta = 360 / @panelCount;
      @radius = Math.round( ( @panelSize / 2) / Math.tan( Math.PI / @panelCount ) );
      for ( i = 0; i < @panelCount; i++ ) {
        panel = @children[i];
        if(panel) {
          angle = @theta * i;
log.Logger.debug(this,@rotateFn + '(' + angle + 'deg) translateZ(' + @radius + 'px)');
          panel.style({'opacity':'1','background-color':'hsla(' + angle + ', 100%, 50%, 0.8)','-webkit-transform':@rotateFn + '(' + angle + 'deg) translateZ(' + @radius + 'px)'});
        }
      }
      for (  ; i < @totalPanelCount; i++ ) {
        panel = @element.child(i);
        if(panel) {
          panel.style.opacity = 0;
          panel.style[ '-webkit-transform' ] = 'none';
        }
      }
      // adjust rotation so panels are always flat
      @rotation = Math.round( @rotation / @theta ) * @theta;
      this.transform();
      return this;
    }
    next() {
      @rotation += @theta * -1;
      this.transform();
    }
    transform() {
      @element.style({'-webkit-transform':'translateZ(-' + @radius + 'px) ' + @rotateFn + '(' + @rotation + 'deg)'});
      return this;
    }
    static init = (function() {
      var styles = [
        {selector:'.numbers',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-215px) rotateX(-72deg);-webkit-backface-visibility:hidden;-webkit-transition:-webkit-transform 1s;"},
        {selector:'.field',style:"background-color:rgba(255,0,140,0.796875);opacity:0;-webkit-transform:none;display:block; position: absolute; width: 186px; height: 116px; left: 10px; top: 10px; border: 2px solid black; line-height: 116px; font-size: 80px; font-weight: bold; color: white; text-align: center;margin:0;-webkit-backface-visibility:hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class AppType {
    constructor() {
      Sections();
    }
  }
  export const App = AppType();
}
