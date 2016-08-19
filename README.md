
# OSMC / Raspberry pi admin panel based on BlurAdmin front-end framework

## Features
* CPU statistics (partial)
* Transmission Torrent UI
* OSMC UI (TODO)
* pimatic UI (TODO)

## HOWTO:
* run dev env:
	* to run the frontend
		```
		gulp serve
		```
	* to run the middleware
		```
		node app.js
		```
* run release:
	* to build the frontend in release dir
		```
		gulp serve:dist
		```
	* to run the middleware & serve forntend content from release dir
		```
		node app.js
		```

## References
* [Akveo team] https://akveo.github.io/blur-admin/

## License
-------------
<a href=/LICENSE.txt target="_blank">MIT</a> license.


