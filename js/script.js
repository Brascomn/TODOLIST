// utiliza DOMContentLoaded para envolver a lógica JavaScript, garantindo que a seleção de elementos e a
// adição de event listeners ocorram apenas após o carregamento completo do DOM.
// Isso ajuda a evitar problemas como o que você mencionou, onde um elemento ainda não está
// disponível quando o script é executado.

document.addEventListener("DOMContentLoaded", function () {
    
    // Seleção de Elementos
    const todoForm = document.querySelector("#todo-form");
    const todoInput = document.querySelector("#todo-input");
    const todoList = document.querySelector("#todo-list");
    const editForm = document.querySelector("#edit-form");
    const editInput = document.querySelector("#edit-input");
    const cancelEditBtn = document.querySelector("#cancel-edit-btn");
    
    // kcIA
    const searchInput = document.querySelector("#search-input");
    const eraseButton = document.querySelector("#erase-button");
    const filterSelect = document.querySelector("#filter-select");


    let oldInputValue;

    //Funções

    const saveTodo = (text) =>{

        // Criação da div
        const todo = document.createElement("div");
        todo.classList.add("todo");
        
        // Criação de conteudo
        const todoTitle = document.createElement("h3");
        // Alterar conteudo  
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = ' <i class="fa-solid fa-check"></i>';
        todo.appendChild(doneBtn);
       
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn);
       
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-todo");
        deleteBtn.innerHTML = ' <i class="fa-solid fa-xmark"></i>';
        todo.appendChild(deleteBtn);


        todoList.appendChild(todo);
        todoInput.value="";
        todo.focus();
    }

    const toggleForms = () =>{
        editForm.classList.toggle("hide");
        todoForm.classList.toggle("hide");
        todoList.classList.toggle("hide");
    }

    const updateTodo = (text)=>{
        const todos = this.documentElement.querySelectorAll(".todo");


        todos.forEach((todo)=>{

            let todoTitle = todo.querySelector("h3");
            if (todoTitle.innerText===oldInputValue) {
                todoTitle.innerText = text;
            }

        })

    }



// ...

document.addEventListener("input", function (e) {
    if (e.target === searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        const todos = document.querySelectorAll(".todo");

        todos.forEach((todo) => {
            const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
            todo.style.display = todoTitle.includes(searchTerm) ? "flex" : "none";
        });
    }
});

eraseButton.addEventListener("click", function () {
    searchInput.value = "";
    // Restaurar a exibição de todas as tarefas ao apagar o campo de pesquisa
    document.querySelectorAll(".todo").forEach(todo => todo.style.display = "flex");
});

filterSelect.addEventListener("change", function () {
    const filterValue = filterSelect.value.toLowerCase();
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const isDone = todo.classList.contains("done");
        todo.style.display = (filterValue === "all" ||
            (filterValue === "done" && isDone) ||
            (filterValue === "todo" && !isDone)) ? "flex" : "none";
    });
});


    //Eventos
    todoForm.addEventListener("submit", (e) => {
        // e.preventDefault(); faz com que o formulário não seja enviado
        e.preventDefault();

        // O InputValue vai receber o valor colocado no todoInput#submit
        const inputValue = todoInput.value;
        if (inputValue) {
            saveTodo(inputValue)
        }
    });

    document.addEventListener("click", (e)=>{
        // Pegar o elemento que foi criado
        const targerEl = e.target;
        const parentEl = targerEl.closest("div");
        let todoTitle;

        if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
            
        }

        // const targerE2 = e.target;
        // if (targerE2.classList.contains("edit-todo")) {
        //     console.log("Ole");
        // }

        // Mapear qual dos botões foi clicado

        if (targerEl.classList.contains("finish-todo")) {
            // A palavra "toggle" refere-se geralmente à ação de alternar entre dois estados opostos 
            // ou de inverter a condição atual. ALTERNAR ENTRE TRUE E FALSE
           parentEl.classList.toggle("done");
        }
        
        if (targerEl.classList.contains("remove-todo")) {
           parentEl.remove();
        }
        
        if (targerEl.classList.contains("edit-todo")) {
           toggleForms(); 
           
           editInput.value = todoTitle;
           oldInputValue = todoTitle;
        }


    })

    cancelEditBtn.addEventListener("click", (e) =>{
        e.preventDefault();
        toggleForms();
    })


    editForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const editInputValue = editInput.value;

        if (editInputValue) {
            updateTodo(editInputValue);
        }

        toggleForms();

    })
});
