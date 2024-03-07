'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('toDoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('toDoList', JSON.stringify(banco));

const todoList = document.getElementById('todoList');

const criarItem = (tarefa, status, indice) => {
    let textDecoration;
    if(status == 'checked'){
        textDecoration = 'class="textDecoration"';
    } else {
        textDecoration = '';
    }
    const item = document.createElement('li');
    item.classList.add('todo__item');
    item.draggable = true;
    item.innerHTML = `
        <input type="checkbox" class="checkbox-pop" ${status} data-indice=${indice}>
        <i class='bx bx-grid-horizontal'></i>
        <input type="text" value="${tarefa}" data-indice=${indice} ${textDecoration}>
        <input type="button" value="✖" data-indice=${indice}>
        `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {

    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    if (evento.key == 'Enter') {
        const banco = getBanco();
        const texto = evento.target.value;
        if (texto !== '') {
            banco.push({ 'tarefa': texto, 'status': '' });
            setBanco(banco);
            atualizarTela();
            evento.target.value = '';
        }
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItemChecked = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const atualizarItemText = (indice, novoValor) => {
    const banco = getBanco();
    banco[indice].tarefa = novoValor;
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItemChecked(indice);
    }
}

const editTarefa = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'text' && evento.key === 'Enter' && elemento.id !== 'newItem') {
        const indice = elemento.dataset.indice;
        const novoValor = elemento.value;
        if (novoValor !== '') {
            atualizarItemText(indice, novoValor);
        }
    }
}

const columns = document.querySelectorAll(".todo__list");

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    coletaDadosLista();
    atualizarTela();
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

const coletaDadosLista = () => {
    const conteudoInputs = document.querySelectorAll('.todo__item');
    const valoresInputs = [];

    conteudoInputs.forEach((item) => {
        const valor = item.children[2].value;
        const status = item.children[0].checked;
        if (status) {
            valoresInputs.push({ 'tarefa': valor, 'status': 'checked' });
        } else {
            valoresInputs.push({ 'tarefa': valor, 'status': '' });
        }

    });

    const banco = valoresInputs;
    setBanco(banco);
}

document.getElementById('caixaTarefa').addEventListener('keydown', inserirItem);
todoList.addEventListener('click', clickItem);
todoList.addEventListener('keydown', editTarefa);

atualizarTela();

