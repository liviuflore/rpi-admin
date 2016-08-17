==============================================================================
v0.0.1 - 16 Aug 2016
------------------------------------------------------------------------------
Interface menu:
	- Dashboard
	- Torrets
	- Media
		- Movies
		- TvShows
		- Music
	- Pimatic
	- Weather
	* Settings
	* Login
	* Logout

==============================================================================
HOWTO:
------------------------------------------------------------------------------
	run dev env:
		gulp serve # to run the frontend
		node app.js # to run the middleware
	run release:
		gulp serve:dist # to build the frontend in release dir
		node app.js # to run the middleware & serve forntend content 
			from release dir

==============================================================================
TODO:
------------------------------------------------------------------------------
Dashboard:
	- make dasboard cards configurable (order, size, visibility)
Login/Logout:
	- add forms
	- add create user (user/admin)
Torrents:
	- fix menu link to torrents
	- finish add torrent modal
	- middleware: add add torrent command
	- middleware: fix remove/start/stop torrent commands
	- middleware: set extended transmission settings
	- middleware: support different torrent clients
Media:
	Movies:
		- add
	TvShows:
		- add
	Music:
		- add
Pimatic:
	- add
