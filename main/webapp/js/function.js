$(function () {
    $('.collapsible').collapsible();

    loadBooks();

    $('#openAddFormBtn').on('click', toggleAddForm);
    $('#closeAddFormBtn').on('click', toggleAddForm);
    $('#submitAddBookForm').on('click', addBook);

});

const TypeEnum = {
    GET_ALL: 0,
    GET_BY_ID: 1,
    POST: 2,
    PUT: 3,
    DELETE: 4
};
let options = [
    {
        method: 'GET',
        callback: function (result) {
            renderBooks(result)
        }
    },
    {
        method: 'GET',
        callback: function (result, element) {
            renderBookDetails(result, element)
        }
    },
    {
        method: 'POST',
        callback: function () {
            loadBooks();
            $('#addBookForm').get(0).reset();
            toggleAddForm();
        }
    },
    {
        method: 'PUT',
        callback: function () {
            loadBooks();
        }
    },
    {
        method: 'DELETE',
        callback: function () {
            loadBooks();
        }
    },
];

function ajax(type, element, data) {
    $.ajax({
        url: 'http://localhost:8282/books/' + (element === undefined || element === null ? '' : $(element).data('id')),
        data: (data === undefined ? '' : formToJson(data)),
        contentType:
            "application/json",
        method: options[type].method
    }).done(function (result) {
        options[type].callback(result, element)
    });
}

function loadBooks() {
    ajax(TypeEnum.GET_ALL);
}

function loadBookDetails() {
    ajax(TypeEnum.GET_BY_ID, this);
}

function addBook() {
    ajax(TypeEnum.POST, null, $('#addBookForm'));
}

function updateBook(btn, form) {
    ajax(TypeEnum.PUT, btn, form);
}

function deleteBook(element) {
    ajax(TypeEnum.DELETE, element);
}

function renderBooks(books) {
    $('li:nth-of-type(1n+3)').each(function () {
        $(this).remove();
    });

    books.forEach(function (book) {
        let templateLi = document.querySelector('li:nth-child(2)');
        let newLi = templateLi.cloneNode(true);
        newLi.removeAttribute('style');
        newLi.dataset.id = book.id;
        $('.collapsible').append(newLi);

        let title = newLi.firstElementChild.firstElementChild;
        title.innerText = book.title;

        let deleteBtn = newLi.querySelector('.btn-delete');
        deleteBtn.dataset.id = book.id;

    });

    $('li:nth-of-type(1n+3)').each(function () {
        $(this).one('click', loadBookDetails)
    });

    $('a.btn-delete').on('click', function (event) {
        deleteBook(this);
        event.stopPropagation()
    })
}

function renderBookDetails(book, element) {
    let details = element.querySelectorAll('p');
    let btn = element.querySelector('button');
    let form = element.querySelector('form');
    details[0].append(form[0].value = book.isbn);
    details[1].append(form[1].value = book.title);
    details[2].append(form[2].value = book.author);
    details[3].append(form[3].value = book.publisher);
    details[4].append(form[4].value = book.type);
    btn.dataset.id = form[5].value = book.id;

    $(btn).on('click', function (event) {
        updateBook(btn, form);
        event.stopImmediatePropagation();
    });

    M.updateTextFields();
}

function formToJson(form) {
    let data = {};
    $(form).serializeArray().forEach(function (el) {
        data[el.name] = el.value;
    });

    return JSON.stringify(data);
}

function toggleAddForm() {
    $('#cardForm').toggle();
    $('#openAddFormBtn').toggle();
}
