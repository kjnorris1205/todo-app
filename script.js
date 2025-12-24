const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Load todos and theme from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadTheme();
});

// Add todo on button click
addBtn.addEventListener('click', addTodo);

// Add todo on Enter key press
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Toggle theme on button click
themeToggle.addEventListener('click', toggleTheme);

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
    if (todo.completed) {
        li.classList.add('completed');
    }
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed || false;
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
    });
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.id);
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function deleteTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.classList.add('removing');
        setTimeout(() => {
            todoItem.remove();
            saveTodos();
        }, 300);
    }
}

function toggleTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.classList.toggle('completed');
        saveTodos();
    }
}

function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map(item => ({
        id: parseInt(item.dataset.id),
        text: item.querySelector('.todo-text').textContent,
        completed: item.classList.contains('completed')
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

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}
