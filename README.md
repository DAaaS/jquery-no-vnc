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
$("#canvas_id").noVnc();
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

Then go to:

http://localhost:3000/

You can the alter plugin by editing src.js

