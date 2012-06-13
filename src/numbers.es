module numbers {
  module log from 'log';
  module monads from 'monads';
  export class Sections {
    constructor(properties={sets:[]}) {
      private element, sections, sets;
      //@element = monads.DOMable({tagName:'section'}).on('load').attributes({'class':'sections'}).insert(document.body);
      @element = monads.DOMable({tagName:'section'}).on('load').attributes({'class':'sections'});
      @sets = properties.sets;
      @sections = [];
      @sets.forEach(function(set) {
        @sections.push(Section({set:set}));
      }, this);
      @sections.forEach(function(section) {
        @element.add(section.element);
      }, this);
    }
    static style = (function() {
      var styles = [
        {selector:'.sections',style:"display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;margin:10em auto;"}
      ];
      return monads.Styleable(styles).on("load").onstyle();
    })()
  };
  class Section {
    constructor(properties={}) {
      private element, carousel;
      @carousel = Carousel(properties);
      @element = monads.DOMable({tagName:'section'}).on('load').attributes({'class':'section'}).add(
        @carousel.element
      ).insert(document.body);
      @carousel.modify();
    }
    static init = (function() {
      var styles = [
        {selector:'.section',style:"width:210px;height:200px;border:1px solid #CCC;-webkit-perspective:1100px;overflow:hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class Carousel {
    constructor(properties={}) {
      private children, element, horizontal, panelCount, panelSize, radius, rotateFn, rotation, set, theta;
      @children = [];
      @element = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'carousel'});
      @rotation = 0;
      @set = properties.set;
      @panelCount = @set.length || 0;
      @theta = 0;
      @horizontal = false;
      @set.forEach(function(character) {
        @children.push(monads.DOMable({tagName:'figure'}).on('load').attributes({'class':'field'}).text(character));
      }, this);
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
          panel.style({'opacity':'1','-webkit-transform':@rotateFn+'('+angle+'deg) translateZ('+@radius+'px)'});
        }
      }
      for (  ; i < @set.length; i++ ) {
        panel = @element.child(i);
        if(panel) {
          panel.style.opacity = 0;
          panel.style[ '-webkit-transform' ] = 'none';
        }
      }
      @rotation = Math.round( @rotation / @theta ) * @theta;
      return this.transform();
    }
    next() {
      @rotation += @theta * -1;
      return this.transform();
    }
    prev() {
      @rotation -= @theta * -1;
      return this.transform();
    }
    transform() {
      @element.style({'-webkit-transform':'translateZ(-' + @radius + 'px) ' + @rotateFn + '(' + @rotation + 'deg)'});
      return this;
    }
    static init = (function() {
      var styles = [
        {selector:'.carousel',style:"width:100%;height:100%;position:absolute;-webkit-transform-style:preserve-3d;-webkit-transform:translateZ(-215px) rotateX(-72deg);-webkit-backface-visibility:hidden;-webkit-transition:-webkit-transform 1s;"},
        {selector:'.field',style:"background-color:rgba(255,0,140,0.796875);opacity:0;-webkit-transform:none;display:block; position: absolute; width: 186px; height: 160px; left: 10px; top: 10px; border: 2px solid black; line-height: 116px; font-size: 80px; font-weight: bold; color: white; text-align: center;margin:0;-webkit-backface-visibility:hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }
  class AppType {
    constructor() {
      Sections({sets:[['0','1','2','3','4','5','6','7','8','9'],['\\u002D','\\u00D7','\\u00F7','\\u002B'],['0','1','2','3','4','5','6','7','8','9'],['\\u003D','\\u003D'],['10','20','30']]});
    }
  }
  export const App = AppType;
}
