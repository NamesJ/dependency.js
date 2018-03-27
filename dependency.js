App = {
  debug    : true,
  duration : 3,
  depos    : {},
  ready    : false
};

App.Escalate = function(esco) {
  if(this.debug){
    console.log('App: Escalating data for \'' + esco.name + '\'');
  }
  this[esco.name] = esco.data;
};

App.ready = function(name) {
    if(this.debug){
      console.log('App: Dependency \''+name+'\' is ready.');
    }
    setTimeout(this.depos[name].onReady, 1);
    this.depos[name].ready = true;
};

App.wait = function(name) {
  if(this.debug){
    console.log('App: Dependency \''+name+'\' is waiting.');
  }
  this.depos[name].ready = false;
  this.depos[name].check = null;
  var isReady = true;
  var after = this.depos[name].after;

  for (var i=0; i<after.length; i++) {
    if( typeof(this.depos[after[i]]) == 'undefined' ){
        isReady = false;
        break;
    }
    else {
      isReady *= this.depos[ after[i] ].ready;
    }
  }

  if (isReady) {
    if(this.depos[name].check != null) {
      clearTimeout(this.depos[name].check);
    }
    this.ready(name);
  }
  else {
    this.depos[name].check = setTimeout(
      function(){App.wait(name)},
      this.duration
    );
  }
};

App.Dependency = function(script) {
  if(this.debug){
    console.log('App: Dependency \'' + script.path + '\' was declared.');
  }
  // Clear the timeout to prevent retriggering
  clearTimeout(script.timeout);

  // Grab the reference to the dependency from script name
  this.depos[script.path] = script;

  // Grab list of scripts required to load before this one
  var after = script.after;
  if (typeof(after) == 'undefined' ||
      after == null                ||
      after.length == 0             )
  {
    this.ready(script.path);
  }
  else {
    this.wait(script.path);
  }
};

App.Init = function(appname) {
  this.name = appname;
  this.ready = true;
};
