const columns = document.querySelectorAll(".todo__list");

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    coletaDadosLista();
});

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(item, e.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }
    });
});

function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".todo__item:not(.dragging)");
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (posY >= boxCenterY) result = refer_card;
    }

    return result;
}


const coletaDadosLista = ()=> {
    const conteudoInputs = document.querySelectorAll('.todo__item');
    const valoresInputs = [];
    
    conteudoInputs.forEach((item) => {
        const valor = item.children[2].value;
        const status = item.children[0].checked;
        if(status){
            valoresInputs.push({'tarefa': valor, 'status': 'checked'});
        } else {
            valoresInputs.push({'tarefa': valor, 'status': ''});
        }
        
    });
    
    const banco = valoresInputs;
    setBanco(banco);    
}



