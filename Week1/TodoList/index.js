let i = 0;
let j = 0;

function addActiveList() {
    let todovalue = document.querySelector(".list").value;

    if (todovalue.trim() === "") return false; // 빈 값을 입력한 경우 처리

    let li = document.createElement("li");
    let button = document.createElement("button");
    button.className = "doneBtn" + i;
    li.innerHTML = todovalue;
    button.innerHTML = "완료";
    
    li.appendChild(button);
    document.querySelector(".listWill").appendChild(li);
    document.querySelector(".doneBtn"+i).addEventListener('click', doneActive);
    document.querySelector(".list").value = '';
    i++;
    return false;
}

function doneActive() {
    let content = this.parentNode;
    this.innerHTML = "삭제";
    this.className = "deleteBtn" + j;
    document.querySelector(".deleteBtn"+j).addEventListener('click', deleteDone);
    j++;
    document.querySelector(".listDone").appendChild(content);
}

function deleteDone() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

window.onload = function() {
    document.querySelector(".list").addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addActiveList();
        }
    });
};
