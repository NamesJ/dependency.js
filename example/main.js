// 'example/main.js' which depends on 'example/A.js' and 'example/B.js'

$(document).ready(function(){

  var script = {
    app   : 'Example App',
    path  : 'example/main.js',
    after : ['example/A.js', 'example/B.js']
  };

  script.onReady = function() {

    // Create an 'AObject' (AObject extends BObject)
    mainAObject = new App.AObject(2, 5);
    console.log('example/main.js: mainAObject: ' + mainAObject.name);
    console.log('mainAObject.value(): ' + mainAObject.value());

	// Create a 'BObject2'
	mainBObject2 = new App.BObject2('my object');
	console.log('example/main.js: mainBObject2: ' + mainBObject2.name);
	console.log('mainBObject2.value(): ' + mainBObject2.value());
  
  };
  
  App.Dependency(script);
});
