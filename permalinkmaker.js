javascript:(
function(){
// Locally customisable strings
  var proxy = '';     // Proxy prefix eg http://ezproxy.lincoln.ac.nz/login?url=
  var catalogue = ''; // Library catalogue bib id search url, eg:
                      // Voyager: http://catalogue.lincoln.ac.nz/cgi-bin/Pwebrecon.cgi?BBID=
					  // Horizon: http://ipac.canterbury.ac.nz/ipac20/ipac.jsp?index=BIB&term=
					  // Primo: http://primo-direct-apac.hosted.exlibrisgroup.com/LIN:
					  // Other catalogue types will also need a line created under either the regexp or domsearch array below.
  var email = '';     // Contact address for users to email where no permalink found
  var instructions = 'Select and copy the following link: ';
  var error = 'Sorry, no permalink could be found. Hi there.';
  if (email != '') {
    error = error + 'For more help, and to help us improve this tool, please email: <a href="mailto:' + email + '?subject=Permalink%20maker&body=Permalink%20Maker%20can\'t%20find%20a%20permalink%20on%20the%20following%20page:%20' + location.href + '">' + email + '</a>';
	}
  
  // Array of: regexp to match, string to prepend, and string to strip from result 
  var regexp = [];
  regexp.push([/10\.\d{3,}(?:\.\d+)*[\/.][^'"<>,&\s]*/,proxy+'http://dx.doi.org/','']); // DOIs: NB will miss DOIs with '"<>,&\s
  regexp.push([/http:\/\/hdl\.handle\.net\/\w+\/\w+/,'','']); // Handles
  regexp.push([/\"bkey\d+/,catalogue,'"bkey']); // Horizon catalogue records
  regexp.push([/[^"]*" class="EXLResultRecordId/,catalogue,'" class="EXLResultRecordId']); // Primo catalogue records
  
  // Array of: tagname, name, link to prepend
  var domsearch = [];
  domsearch.push(['input','BIB','value',catalogue]); // Voyager catalogue records
  domsearch.push(['a','Permanent link to this revision of the page','href','']); // Wikipedia articles

  
// Non-developers probably don't want to change much below here

  // Check the selection (or document) for the first DOI
  var selection = document.selection?document.selection.createRange().text:window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection():'';
  for(i=0;i<regexp.length;i++) { // Search for permalinks by regexp
    if(!regexp[i][0].test(selection)) { // If nothing selected or nothing found in selection, look in whole document
       selection = document.body.innerHTML;
	}
    if(regexp[i][0].test(selection)) {
      var doi = regexp[i][0].exec(selection)[0]; // Gets first match only
	  var link = regexp[i][1] + doi;
	  link = link.replace(regexp[i][2],'');
    }
	if(link) {break;} // If one kind of link is found, don't go looking for another kind
  }

  if (!link) {
	for(i=0;i<domsearch.length;i++) { // Search for permalinks by DOM
	  var tagarray = document.getElementsByTagName(domsearch[i][0]);
	  for(j=0;j<tagarray.length;j++) {
	    if ((tagarray[j].id == domsearch[i][1]) || (tagarray[j].name == domsearch[i][1]) || (tagarray[j].title == domsearch[i][1])) {
		  var theValue;
		  switch(domsearch[i][2]) {
		    case 'value': theValue = tagarray[j].value; break;
			case 'href': theValue = tagarray[j].href; break;
			default: theValue = tagarray[j].value;
		  }
		  var link = domsearch[i][3] + theValue;
		}
	  }
	}
  }

  // Create the overlay displaying results
  var backgroundID = "permaBackground";
  var overlayID = "permaOverlay";
  var checkID = "permaCheck";
  var closeID = "permaClose";
  var linkID = "permaLink";
  var cssID = "permaCSS";
  var scriptID = "permaScript";
  
  var theContent = link ? instructions + '<br/><div id = "' + linkID + '">' + link + '</div>' : error;
  theContent = "<div>" + theContent + "</div>";

  theChecker = link ? '<div id="' + checkID + '"><a href="' + link + '" target="_blank">Test link in new window</a></div>' : '';
  
  theCloser = '<div id="' + closeID + '"><a href="javascript:(function(){var%20e=[\''+backgroundID+'\',\''+overlayID+'\',\''+cssID+'\',\''+scriptID+'\'];for(i=0;i<e.length;i++){document.body.removeChild(document.getElementById(e[i]));}})();">Close</a></div>'; // Link to reset (removes all elements from page)
  
  var theBackground = document.createElement("div"); // Partially whites-out the original page
  theBackground.id = backgroundID;
  document.body.appendChild(theBackground);
  
  var theOverlay = document.createElement("div"); // The results area itself
  theOverlay.id = overlayID;
  theOverlay.innerHTML = theContent + theChecker + theCloser;
  document.body.appendChild(theOverlay);

  var overlayCSS = document.createElement("style"); // The CSS to make it work
  overlayCSS.id = cssID;
  overlayCSS.setAttribute("type", "text/css");
  var theStyle = "";
  var absofixed = ((overlayCSS.styleSheet) && (!document.doctype)) ? "absolute" : "fixed"; // Bugfix for IE when no doctype exists
  theStyle = theStyle + "#" + backgroundID + " { position: " + absofixed + "; top: 0; left: 0; width: 100%; height: 100%; background-color: white; opacity: 0.8; filter:alpha(opacity:80); z-index: 99;}"; //
  theStyle = theStyle + "#" + overlayID + " { position: " + absofixed + "; top: 50%; right: 50%; width: 400px; margin: -150px -200px 0 0; padding: 1em; border: 2px black solid; border-radius: 1em; background-color: white; z-index: 100;}";
  theStyle = theStyle + "#" + linkID + " { margin: 0.5em; padding: 0.5em; border: 1px grey solid; border-radius: 0.5em; }";
  theStyle = theStyle + "#" + checkID + " { float: left; }";
  theStyle = theStyle + "#" + closeID + " { float: right; }";
  if(overlayCSS.styleSheet) { //IE
    overlayCSS.styleSheet.cssText = theStyle;
  } else { //W3C
    overlayCSS.innerHTML = theStyle;
  }
  document.body.appendChild(overlayCSS);
}
)()