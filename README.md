=======
Permalink Maker
======
Permalink Maker is a piece of javascript designed to be invoked as a bookmarklet. It will return a permanent url (including library proxy) for the current webpage where possible, particularly for the cases:
* DOIs and handles
* Voyager, Horizon, or Primo records
* ebrary books / pages
* ProQuest articles
* Wikipedia articles
* Wordpress pages

Optionally it can be set to log usage in csv format, for each click saving:
* date/time
* the url of the page the user is on
* the permalink returned

 
Usage
---------------------
To use Permalink Maker:

1. Save the permalinkmaker.js file to your server.
2. Edit the locally customisable strings at the top of the file.
3. Invoke it by creating a bookmarklet in your browser pointing to the following location (replacing the s.src url with the correct path):
	`javascript:(function(){var%20s=document.createElement('script');s.id='permaScript';s.src='https://www.yourdomain.com/path/to/permalinkmaker.js';document.body.appendChild(s);})();`

An example implementation is at https://ltl.lincoln.ac.nz/?p=3776

To log usage (eg for troubleshooting):

1. You'll need PHP on your server.
2. Save the permalinkmaker-logging.js.php file to a folder which has appropriate read/write permissions. This folder is where the log will be created.
3. Paste the full path/URL for this file into the `logscript` variable at the top of `permalinkmaker.js`.


Known limitations
---------------------
* Will miss DOIs that include any of the characters: '"<>, or a space.
* Returns only one permalink. It looks first within any part of the page the user has selected, and if nothing's found it looks in the whole page, or eventually at the URL. It looks for types of permalinks in the order listed under the domsearch, regexp and useurl arrays and returns the first match found.