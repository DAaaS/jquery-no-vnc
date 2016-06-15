#jquery noVnc

Wraps the noVNC client in a jQuery plugin.

## Build

```bash
bower install
npm install
gulp
```

This will create a file called jquery-no-vnc.js

## Use

Once you've built jquery-no-vnc.js you can use it via the following javascript:

```javascript
//get noVnv facade object
var noVnc = $('#canvas_id').noVnc();

//connect to server
noVnc.connect(host, port, password, path);

//will resize the canvas within a bounding box 
//as the height and width ratios are defined by
//the desktop's height and width
noVnc.resize(width, height);

//send a password to server
noVnc.sendPassword(password);

//Send a key code event. If down not specified, send a down and up event.
noVnc.sendKey(code, down)

//disconnect from server
noVnc.disconnect


$('#canvas_id').on('novnc:connected', function(){
	//just connected to server
});

$('#canvas_id').on('novnc:passwordrequired', function(){
	//a password has been requested
	$('#canvas_id').noVnc().sendPassword(password);
});

$('#canvas_id').on('novnc:loaded', function(){
	//everything has just loaded and running - the desktop is now ready for use
});

$('#canvas_id').on('novnc:disconnected', function(){
	//just disconnected from server
});


```

## Develop

```bash
bower install
npm install
gulp serve
```

```bash
sudo pip install websockify
websockify -v 29876 --target-config=./tokens/
```

Alter tokens/example and change the server to one that exists on your network.

Then go to [http://localhost:3000](http://localhost:3000).

You can the alter plugin by editing src.js

