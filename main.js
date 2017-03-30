//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
		//Get form Values

		var siteName = document.getElementById('siteName').value;
		var siteUrl = document.getElementById('siteUrl').value;

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(!siteName || !siteUrl){
			alert('Please fill in the form');
			return false;
		} else if(!siteUrl.match(regex)) {
			alert('Please enter a valid url');
			return false;
		}

		var bookmark = {
			name: siteName,
			url: siteUrl
		};

		//Checking to see if bookmarks exists
		if(localStorage.getItem('bookmarks') === null){
			//Init array
			var bookmarks = [];
			//Add to array
			bookmarks.push(bookmark);
			//Adding bookmark to localStorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else {
			//Get bookmarks from localStorage
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			//Add bookmarks to Array
			bookmarks.push(bookmark);
			//Re-set back to LocalStorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		}

		//Re-fetch bookmarks
		siteName.reset();
		siteUrl.reset();
	fetchBookmarks();
	

	//Prevent from submitting.
	e.preventDefault();
}

//Deleting the Bookmarks
function deleteBookmark(url){
	//Fetching Bookmarks
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Looping through Bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url === url) {
			//Remove from Array
			bookmarks.splice(i, 1);
		} 
	}
	//Add Rest back to LocalStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re-fetch bookmarks
	fetchBookmarks();
};


//Fetch and Display Bookmarks
function fetchBookmarks(){

var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Get Output ID
var bookmarksResults = document.getElementById('bookmarksResults');

//Build output

bookmarksResults.innerHTML = '';

for(var i = 0; i < bookmarks.length; i++){
	var name = bookmarks[i].name;
	var url = bookmarks[i].url;

	bookmarksResults.innerHTML += '<div class="well">'+
								  '<h3>'+name+
								  ' <a class="btn btn-default" target="_blank" href="'+'http://'+url+'">Visit</a> '+
								  ' <a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')">Delete</a> '+
								  '</h3>'+
								  '</div>';
}
}; 