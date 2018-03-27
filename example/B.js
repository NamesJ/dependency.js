// 'example/B.js' which doesn't depend on anything

$(document).ready(function(){

  var script = {
    app   : 'Example App',
    path  : 'example/B.js',
    after : null	// Optional
  };

  script.onReady = function() {
	  
    class BObject {
      constructor(x, y) {
        this.name = 'BObject';
        this.x = x;
        this.y = y;
      }
	  value() {
        return '(' + this.x.toString() + ', ' + this.y.toString() + ')';
      }
    }
	
	class BObject2 {
		constructor(s) {
			this.name = 'BObject2';
			this.s = s;
		}
		value() {
			return this.s;
		}
	}
	
    App.Escalate({
      name: 'BObject',
      data: BObject
    });
	
	App.Escalate({
		name: 'BObject2',
		data: BObject2
	});
	
  };

  App.Dependency(script);
});
