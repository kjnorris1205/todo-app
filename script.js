const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Load todos from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

// Add todo on button click
addBtn.addEventListener('click', addTodo);

// Add todo on Enter key press
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a todo!');
        return;
    }
    
    // Create todo object
    const todo = {
        id: Date.now(),
        text: todoText
    };
    
    // Add to DOM
    addTodoToDOM(todo);
    
    // Save to localStorage
    saveTodos();
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
}

function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.id);
    });
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function deleteTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.remove();
        saveTodos();
    }
}

function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map(item => ({
        id: parseInt(item.dataset.id),
        text: item.querySelector('.todo-text').textContent
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        try {
            const todos = JSON.parse(savedTodos);
            todos.forEach(todo => addTodoToDOM(todo));
        } catch (e) {
            console.error('Error loading todos:', e);
        }
    }
}
