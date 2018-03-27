// 'example/A.js' which depends on 'example/B.js'

$(document).ready(function(){
  
  var script = {
    app   : 'Example App',
    path  : 'example/A.js',
    after : ['example/B.js']
  };

  script.onReady = function() {
    class AObject extends App.BObject{
      constructor(x, y) {
        super(x, y)
        this.xy = x * y;
        this.name = 'AObject';
      }
      value() {
        return '(' + this.x.toString() + ', ' + this.y.toString() + ')' +
                ' => ' + this.xy.toString();
      }
    }

    App.Escalate({
      name: 'AObject',
      data: AObject
    });
  };

  App.Dependency(script);
  
});
