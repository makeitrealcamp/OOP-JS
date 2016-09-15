// assume this data came from the database
function NotesManager(){

}

var myNotes = new NotesManager();

var notes = [
	"Chuck Norris counted to infinity - twice.",
	"Chuck Norris is the reason why Waldo is hiding.",
	"Death once had a near-Chuck Norris experience"
];

NotesManager.prototype.addNote = function(note) {
	$("#notes").prepend(
		$("<a href='#'></a>")
		.addClass("note")
		.text(note)
	);
}

NotesManager.prototype.addCurrentNote = function() {
	var current_note = $("#note").val();

	if (current_note) {
		notes.push(current_note);
		addNote(current_note);
		$("#note").val("");
	}
}

NotesManager.prototype.showHelp = function() {
	$("#help").show();

	document.addEventListener("click",function __handler__(evt){
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();

		document.removeEventListener("click",__handler__,true);
		hideHelp();
	},true);
}

NotesManager.prototype.hideHelp = function() {
	$("#help").hide();
}

NotesManager.prototype.handleOpenHelp = function(evt) {
	if (!$("#help").is(":visible")) {
		evt.preventDefault();
		evt.stopPropagation();
		console.log(this);
		showHelp();
	}
}

NotesManager.prototype.handleAddNote = function(evt) {
	this.addCurrentNote();
}

NotesManager.prototype.handleEnter = function(evt) {
	if (evt.which == 13) {
		addCurrentNote();
	}
}

NotesManager.prototype.handleDocumentClick = function (evt) {
	$("#notes").removeClass("active");
	$("#notes").children(".note").removeClass("highlighted");
}

NotesManager.prototype.handleNoteClick = function (evt) {
	evt.preventDefault();
	evt.stopPropagation();

	$("#notes").addClass("active");
	$("#notes").children(".note").removeClass("highlighted");
	$(evt.target).addClass("highlighted");
}

NotesManager.prototype.init = function() {
	// build the initial list from the existing `notes` data
	var html = "";
	for (i=0; i<notes.length; i++) {
		html += "<a href='#' class='note'>" + notes[i] + "</a>";
	}
	$("#notes").html(html);

	// listen to "help" button
	$("#open_help").bind("click",myNotes.handleOpenHelp);

	// listen to "add" button
	$("#add_note").bind("click",myNotes.handleAddNote);

	// listen for <enter> in text box
	$("#new_note").bind("keypress",myNotes.handleEnter);

	// listen for clicks outside the notes box
	$(document).bind("click",myNotes.handleDocumentClick);

	// listen for clicks on note elements
	$("#notes").on("click",".note",myNotes.handleNoteClick);
}

$(document).ready(NotesManager.init);
