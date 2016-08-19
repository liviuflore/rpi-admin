[![Build Status](https://travis-ci.org/akveo/blur-admin.svg?branch=master)](https://travis-ci.org/akveo/blur-admin)

# OSMC / Raspberry pi admin panel based on BlurAdmin front-end framework

## Features
* CPU statistics (partial)
* Transmission Torrent UI
* OSMC UI (TODO)
* pimatic UI (TODO)

## HOWTO:
* run dev env:
	* to run the frontend
		```shell
		gulp serve
		```
	* to run the middleware
		```shell
		node app.js
		```
* run release:
	* to build the frontend in release dir
		```shell
		gulp serve:dist
		```
	* to run the middleware & serve forntend content from release dir
		```shell
		node app.js
		```

## References
* [Akveo team] https://akveo.github.io/blur-admin/

## License
-------------
<a href=/LICENSE.txt target="_blank">MIT</a> license.


