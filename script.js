const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
"Elon Musk",
"Jeff Bezos",
"Bernard Arnault",
"Bill Gates",
"Warren Buffett",
"Larry Page",
"Sergey Brin",
"Mark Zuckerberg",
"Steve Ballmer",
"Larry Ellison"
];

let dragStartIndex;
const listItems = [];

createList();

function createList() {

[...richestPeople]
.map(a => ({value: a, sort: Math.random()}))
.sort((a,b)=>a.sort-b.sort)
.map(a=>a.value)
.forEach((person,index)=>{

const li = document.createElement("li");

li.setAttribute("data-index",index);

li.innerHTML = `
<span class="number">${index+1}</span>

<div class="draggable" draggable="true">
<p class="person-name">${person}</p>
</div>
`;

listItems.push(li);

draggable_list.appendChild(li);

});

addEventListeners();

}

function dragStart(){
dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter(){
this.classList.add("over");
}

function dragLeave(){
this.classList.remove("over");
}

function dragOver(e){
e.preventDefault();
}

function dragDrop(){
const dragEndIndex = +this.getAttribute("data-index");

swapItems(dragStartIndex,dragEndIndex);

this.classList.remove("over");
}

function swapItems(fromIndex,toIndex){

const itemOne = listItems[fromIndex];
const itemTwo = listItems[toIndex];

draggable_list.insertBefore(itemTwo,itemOne);

}

function addEventListeners(){

const draggables = document.querySelectorAll(".draggable");
const dragListItems = document.querySelectorAll(".draggable-list li");

draggables.forEach(draggable=>{
draggable.addEventListener("dragstart",dragStart);
});

dragListItems.forEach(item=>{
item.addEventListener("dragover",dragOver);
item.addEventListener("drop",dragDrop);
item.addEventListener("dragenter",dragEnter);
item.addEventListener("dragleave",dragLeave);
});

}