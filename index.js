const openBtn=document.getElementById("open-btn")
const closedJournal=document.getElementById("closed-journal")
const openJournal=document.getElementById("open-journal")
const leftPageNumberEl=document.getElementById("left-page-number")
const rightPageNumberEl=document.getElementById("right-page-number")
const leftContentEl=document.getElementById("left-content")
const rightContentEl=document.getElementById("right-content")
const nextBtn=document.getElementById("next-btn")
const prevBtn=document.getElementById("prev-btn")
const closeBtn=document.getElementById("close-btn")

openBtn.addEventListener("click", function(){
    closedJournal.classList.add("hidden")
    openJournal.classList.remove("hidden")
})

let currentLeftPage=1
let currentRightPage=2

let saved=localStorage.getItem("journalPages")
let pages;

if (saved){
    pages=JSON.parse(saved)
}
else{
    pages=[{left:"" , right:""}]
}


nextBtn.addEventListener("click", function () {
    // Save current page content
    let index = Math.floor((currentLeftPage - 1) / 2);
    pages[index].left = leftContentEl.textContent;
    pages[index].right = rightContentEl.textContent;

    localStorage.setItem("journalPages", JSON.stringify(pages));

    
    //add new pages
    pages.push({left:"" , right:""})
    
    // Update page numbers
    currentLeftPage += 2;
    currentRightPage += 2;

    document.getElementById("left-page").classList.add("flip-left");
document.getElementById("right-page").classList.remove("flip-left");


    //display page numbers
    leftPageNumberEl.textContent = currentLeftPage;
    rightPageNumberEl.textContent = currentRightPage;

    //next page content
    let newIndex=index+1
    leftContentEl.textContent=pages[newIndex].left
    rightContentEl.textContent=pages[newIndex].right

});

prevBtn.addEventListener("click", function(){

    if (currentLeftPage===1){
        return;
    }

    //save current content
    let currentIndex=Math.floor((currentLeftPage-1)/2)
    pages[currentIndex].left=leftContentEl.textContent
    pages[currentIndex].right=rightContentEl.textContent 
    
    localStorage.setItem("journalPages", JSON.stringify(pages));


    currentLeftPage-=2
    currentRightPage-=2
    

    leftPageNumberEl.textContent= currentLeftPage;
    rightPageNumberEl.textContent= currentRightPage;

    // Load previous content
    let prevIndex = Math.floor((currentLeftPage - 1) / 2);
    leftContentEl.textContent = pages[prevIndex].left;
    rightContentEl.textContent = pages[prevIndex].right;
    
})

function saveCurrentPage() {
    let index = Math.floor((currentLeftPage - 1) / 2);
    pages[index].left = leftContentEl.textContent;
    pages[index].right = rightContentEl.textContent;
    localStorage.setItem("journalPages", JSON.stringify(pages));
}

leftContentEl.addEventListener("input", saveCurrentPage);
rightContentEl.addEventListener("input", saveCurrentPage);

closeBtn.addEventListener("click", function(){
    saveCurrentPage()
    openJournal.classList.add("hidden")
    closedJournal.classList.remove("hidden")

})


// On initial load, show the content of the first two pages (Page 1 and 2)
leftContentEl.textContent = pages[0].left;
rightContentEl.textContent = pages[0].right;

// And set the correct page numbers
leftPageNumberEl.textContent = currentLeftPage;
rightPageNumberEl.textContent =  currentRightPage;
