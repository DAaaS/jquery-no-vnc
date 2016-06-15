#jquery noVnc

Wraps the noVNC client in a jQuery plugin.

## Install

Via bower:

```bash
bower install jquery-no-vnc --save-dev
```

or you can simply copy the files in dist/

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

## Build

```bash
bower install
npm install
gulp
```

## Develop

This will build the files dist/jquery-no-vnc.js dist/jquery-no-vnc.min.js

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


## License

This software licensed under Mozilla Public License, version 2.0

Most of this library is based noVNC by Joel Martin <github@martintribe.org>

For additional license information please read https://github.com/kanaka/noVNC/blob/master/LICENSE.txt

