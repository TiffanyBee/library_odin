var myLibrary = [];

function updateBookViewer() {
    var bookViewer = document.getElementById('book-viewer');
    bookViewer.innerHTML = "";
    for (i=0;i<myLibrary.length;i++) {
        console.log(myLibrary[i]);
        var bookdiv = document.createElement("div");
        bookdiv.classList = "book";
        bookdiv.dataset.title = myLibrary[i].title;

        var titlediv = document.createElement("div");
        var titlelabel = document.createElement('h4');
        var title = document.createElement('h4');

        var authordiv = document.createElement('div');
        var authorlabel = document.createElement('h4');
        var author = document.createElement('h4');

        var pagesdiv = document.createElement("div");
        var pageslabel = document.createElement('h4');
        var pages = document.createElement('h4');

        var switchprogress = document.createElement('div');
        var switchoption01 = document.createElement('div');
        var inputread = '<input type="radio" class="update-onclick read" onclick="updateReadStatus(this)" name="'+ myLibrary[i].title +'" ';
        var inputunread = '<input type="radio" class="update-onclick unread" onclick="updateReadStatus(this)" name="'+ myLibrary[i].title +'" ';
        if (myLibrary[i].read == true) {
            inputread += 'checked';
        } else {
            inputunread += 'checked'
        }
        inputread += '/>'
        inputunread += '/>'
        var labelread = document.createElement('label');
        var switchoption02 = document.createElement('div');
        var labelunread = document.createElement('label');

        var deletebtn = document.createElement('a');

        title.innerHTML = myLibrary[i].title;
        titlelabel.innerHTML = "Title";
        author.innerHTML = myLibrary[i].author;
        authorlabel.innerHTML = "Author";
        pages.innerHTML = myLibrary[i].numofpages;
        pageslabel.innerHTML = "Pages";
        switchprogress.classList = "switch";
        switchoption01.classList = "switch-option";
        labelread.innerHTML = inputread + "Read";
        switchoption02.classList = "switch-option";
        labelunread.innerHTML = inputunread + "Unread";
        deletebtn.innerHTML = "Delete";
        deletebtn.classList = "deletebook";
        deletebtn.setAttribute("onclick", "deleteFromLibrary(this)")

        titlediv.append(titlelabel, title);
        authordiv.append(authorlabel, author);
        pagesdiv.append(pageslabel, pages);
        console.log(labelread);
        console.log(inputread);
        switchoption01.append(labelread);
        switchoption02.append(labelunread);
        switchprogress.append(switchoption01, switchoption02)

        bookdiv.appendChild(titlediv);
        bookdiv.appendChild(authordiv);
        bookdiv.appendChild(pagesdiv);
        bookdiv.appendChild(switchprogress);
        bookdiv.appendChild(deletebtn);

        bookViewer.appendChild(bookdiv);
    }
}

function Book(title, author, numofpages, read) {
    this.title = title;
    this.author = author;
    this.numofpages = numofpages;
    this.read = read;
    this.info = function() {
        return [ title, author, numofpages, read ]
    }
}

document.getElementById('submit-book').addEventListener("click", trackNewBook);
function trackNewBook() {
    var div = document.getElementById("new-book-menu");
    var allinfo = div.querySelectorAll('input');
    console.log(allinfo);
    var read;
    if (allinfo[3].checked == true) {
        read = true;
    } else {
        read = false;
    }
    console.log(div.querySelectorAll('input'))
    

    myLibrary.push(new Book(allinfo[0].value, allinfo[1].value, allinfo[2].value, read))
    console.log(myLibrary[0]);

    updateBookViewer();

    var newBookMenu = document.getElementById('new-book-menu');
    newBookMenu.style.display = "none";
    newBookMenu.style.visibility = "hidden"
}
document.getElementById('openNewBookMenu').addEventListener("click", openNewBookMenu);
function openNewBookMenu() {
    var newBookMenu = document.getElementById('new-book-menu');
    newBookMenu.style.display = "flex";
    newBookMenu.style.visibility = "visible"
    
}
function updateReadStatus(input) {
    console.log(input.checked);
    var booktitle = $(input).attr('name');
    for (i=0;i<myLibrary.length;i++) {
        if (myLibrary[i].title == booktitle) {
            if (input.checked == true && input.classList == "update-onclick read") {
                myLibrary[i].read = true;
            } else if (input.checked == true && input.classList == "update-onclick unread") {
                myLibrary[i].read = false;
            }
        }
    }
    console.log(myLibrary)
}
function deleteFromLibrary(deletebtn) {
    console.log(deletebtn);
    var bookdiv = $(deletebtn).parent();
    var booktitle = bookdiv[0].dataset.title;

    for (i=0;i<myLibrary.length;i++) {
        if (myLibrary[i].title == booktitle) {
            myLibrary.splice(i, 1);
        }
    }
    console.log(myLibrary);
    updateBookViewer();
}