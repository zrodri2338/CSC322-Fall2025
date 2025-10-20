$(function() {
    
    $("#addBtn").on("click", addBtnClick);

   
    $("#newItemText").on("keyup", function(event) {
        if (event.key === "Enter") {
            addBtnClick();
        }
    });
});

function addBtnClick() {
    const itemText = $("#newItemText").val().trim();
    if (itemText.length === 0) return;

    addItem(itemText);
    $("#newItemText").val("").focus();
}

function addItem(text) {
    const $newItem = $("<li></li>");
    $newItem.append(`<span>${text}</span>`);

    const $upBtn = $('<button>&uarr;</button>').click(function() {
        const index = $(this).parent().index();
        moveItem(index, index - 1);
    });

    const $downBtn = $('<button>&darr;</button>').click(function() {
        const index = $(this).parent().index();
        moveItem(index, index + 1);
    });

    const $doneBtn = $('<button>&#x2713;</button>').click(function() {
        const index = $(this).parent().index();
        removeItem(index);
    });

    $newItem.append($upBtn, $downBtn, $doneBtn);
    $("#todoList").append($newItem);
}

function moveItem(fromIndex, toIndex) {
    const $items = $("#todoList li");
    if (toIndex < 0 || toIndex >= $items.length) return;

    const $item = $items.eq(fromIndex).detach();
    if (toIndex === 0) {
        $item.insertBefore($items.eq(0));
    } else {
        $item.insertAfter($items.eq(toIndex - (fromIndex < toIndex ? 0 : 1)));
    }
}

function removeItem(index) {
    $("#todoList li").eq(index).remove();
}
