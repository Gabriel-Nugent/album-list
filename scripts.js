const add_album = document.querySelector(".add-album");
const search_box = document.querySelector("#album-search");

add_album.addEventListener("click",() => {
    const left_modal = document.querySelector(".left-modal");
    const right_modal = document.querySelector(".right-modal");
    const overlay = document.querySelector(".overlay");
    openModal(left_modal);
    openModal(right_modal);
    openModal(overlay);
})

const close_button = document.querySelector(".close-modal");

close_button.addEventListener("click",() => {
    closeModals();
})

function closeModals(){
    const left_modal = document.querySelector(".left-modal");
    const right_modal = document.querySelector(".right-modal");
    const overlay = document.querySelector(".overlay");
    left_modal.classList.remove("active");
    right_modal.classList.remove("active");
    overlay.classList.remove("active");
}

function openModal(modal){
    if (modal == null) return
    modal.classList.add("active");
}