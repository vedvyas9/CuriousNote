console.log("Wellcome to Curious Note's dev arena.")
let noteCount = 1;
showNotes();

// STORING/RETRIEVENG THE NOTES IN/FROM LOCAL STORAGE
let addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', function(e){

    let addTitle = document.getElementById("inputTitle");
    let addText = document.querySelector('textarea.addText');    
    let notes = localStorage.getItem("notes");

    // if there is no "note" in the local storage, create an empty array object called 'notesObj'
    if (notes == null) {
       notesObj = {};
    }
    // else parse the "notes" into an array object called 'notesObj'
    else {
        notesObj = JSON.parse(notes);
    }
    
    // now add the new note (created by the user in the present) into the previously created array object - 'notesObj'
    // notesObj.push(addText.value);    // this is for ARRAY type localstorage i/p
    notesObj[addTitle.value] = addText.value;

    // update the local storage with all (old & new) the notes
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // clear the textarea (i/p field) after the user hits the "Add Notes" option
    addText.value = "";
    addTitle.value = "";

    let important = localStorage.getItem("important");
    if (important == null)
        importantObj = {};
    else
        importantObj = JSON.parse(important);
    importantObj[`note${noteCount}`] = 'bg-light';
    localStorage.setItem("important", JSON.stringify(importantObj));

    //  time to show the notes to user from local storage
    window.location.reload();
    // showNotes();                
});


// DISPLAYING THE NOTES ON HTML PAGE RETRIEVED FROM LOCAL STORAGE
function showNotes() {
    let notes = localStorage.getItem("notes");          // same as explained above
    if (notes == null) {
       notesObj = {};
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let important = localStorage.getItem("important");
    if (important == null)
        importantObj = {};
    else
        importantObj = JSON.parse(important);

    // creating a html element to show the user's note on the web interface 
    let html = "";
    //  iterating through the array object containing the notes
    // notesObj.forEach(function(element, index) {
    for(key in notesObj) {
        html += `
        <div class="card ms-3 my-2 ${importantObj[`note${noteCount}`]}" style="width: 21rem;" id="note${noteCount}">
            <div class="card-body note-card">
                <h5 class="card-title">${key}</h5>
                <p class="card-text my-4">${notesObj[key]}</p>
                <button id="${key}" class="btn btn-danger" onclick="noteId='note${noteCount}'; deleteNote(this.id)">Delete Note</button>

                <span class="badge bg-warning text-dark m-2 p-2" id="${noteCount}" style="float: right" onclick="markImportant(this)">Important</span>

            </div>
        </div>`;

        noteCount += 1;
        };

    // retrieving the position of the element in the web interface where the "note element" is to be shown
    let noteElem = document.getElementById("notes");
    // if note exists insert into the retrieved location of the html page
    if(Object.keys(notesObj).length != 0) {     // note exists? checking length of the "notes" "dictionary" from local storage
        noteElem.innerHTML = html;
    }
    // notify user, if there is no existing note
    else {
        noteElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


// DELETING A NOTE FROM HTML PAGE & LOCAL STORAGE
function deleteNote(id) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
       notesObj = {};
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let important = localStorage.getItem("important");
    if (important == null)
        importantObj = {};
    else
        importantObj = JSON.parse(important);

    // DELETING the note from local storage
    // notesObj.splice(id, 1);                          // for ARRAY
    delete notesObj[id];                                // for DICTIONARY
    delete importantObj[noteId];
    // updating the local storage by storing new note array object.
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('important', JSON.stringify(importantObj));

    noteCount -= 1;
    // displaying the updated notes
    window.location.reload();
    // showNotes();
}


// SEARCH USING A KEYWORD FROM THE SEARCH BOX
let search = document.getElementById('searchText');
search.addEventListener('input', function() {

    let searchVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("note-card");
    // console.log(noteCards);
    
    Array.from(noteCards).forEach(function(element) {
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        let cardText = element.getElementsByTagName("p")[0].innerText;

        console.log(cardText);

        if(cardText.includes(searchVal) || cardTitle.includes(searchVal)) {
            element.parentElement.style.display = "block";
        } else {
            element.parentElement.style.display = "none";
        }
    });
});


// Feature #2 > Mark as important
function markImportant(element) {
    let markBlock = document.getElementById(`note${element.id}`);
    let isMarked = markBlock.getAttribute('class').includes('bg-info');

    let important = localStorage.getItem("important");
    if (important == null)
        importantObj = {};
    else
        importantObj = JSON.parse(important);
    importantObj[`note${element.id}`] = 'bg-light';
    localStorage.setItem("important", JSON.stringify(importantObj));

    if (!isMarked) {
        markBlock.classList.add('bg-info');
        markBlock.classList.remove('bg-light');

        importantObj[`note${element.id}`] = 'bg-info';
        localStorage.setItem("important", JSON.stringify(importantObj));
    } else {
        markBlock.classList.remove('bg-info');
        markBlock.classList.add('bg-light');

        importantObj[`note${element.id}`] = 'bg-light';
        localStorage.setItem("important", JSON.stringify(importantObj));
    }
}


/*
Further Features:
(DONE) 1. Add custom Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/