=======
Permalink Maker
======
Permalink Maker is a piece of javascript designed to be invoked as a bookmarklet. It will return a permanent url for the current webpage where possible, particularly for the cases:
* DOIs (with optional library proxy)
* Handles
* Voyager (or Horizon) catalogue record
* Wikipedia articles

 
Usage
---------------------
To use Permalink Maker:

1. Save the javascript file to your server.
2. Edit the locally customisable strings at the top of the file.
3. Invoke it by creating a bookmarklet in your browser pointing to the following location (replacing the s.src url with the correct path):
	`javascript:(function(){var%20s=document.createElement('script');s.id='permaScript';s.src='http://www.yourdomain.com/path/to/permalink-maker.js';document.body.appendChild(s);})();`


Known limitations
---------------------
* Will miss DOIs that include any of the characters: '"<>, or a space.
* Returns only one permalink. It looks first within any part of the page the user has selected, and if nothing's found it looks in the whole page. It looks for types of permalinks in the order listed under the regexp and domsearch arrays and returns the first match found.