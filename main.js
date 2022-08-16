const addTask = document.forms['add-task'];
const input = addTask.querySelector('input');
const list = document.querySelector('.task-box ul');
const filters = document.querySelectorAll('.main-filters p');
const searchForm = document.forms['search-task'];
const searchInput = searchForm.querySelector('input');
const clearBtn = document.querySelector('#clear-btn');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    document.querySelector('.main-filters p.active').classList.remove('active');
    filter.classList.add('active');
    showTodos(filter.id)
    if (list.innerHTML == '') {
      list.innerHTML = `<p class="para">You have no ${filter.id} tasks</p>`;
    }
  })
});

let todos = JSON.parse(localStorage.getItem('task-list'));

function showTodos(status) {
  todos = JSON.parse(localStorage.getItem('task-list'));

  let li = '';

  if (todos) {
    list.innerHTML = `<p class="para">You have no tasks</p>`;
    todos.forEach((todo, ind) => {
      if (todo.status == 'pending') {
        isCompleted = ''
      } else {
        isCompleted = 'checked'
      }
      if (status == todo.status || status == 'all') {
        li += `<li class="${isCompleted}">
                    <label for="${ind}" class="task">
                      <input type="checkbox" onclick="complete(this)" id="${ind}" ${isCompleted}>
                      <span class="name">${todo.name}</span>
                    </label>
                    <i onclick="remove(this.previousElementSibling.firstElementChild.id)" class="fa-solid fa-trash-can"></i>
                  </li>`
      }
      list.innerHTML = li;
    });
  } else if (!todos) {
    list.innerHTML = `<p class="para">You have no active tasks</p>`;
  }
}


showTodos('all');

function remove(selected) {
  todos.splice(selected, 1);
  localStorage.setItem('task-list', JSON.stringify(todos));
  showTodos('all');
}

function complete(selected) {
  if (selected.checked) {
    selected.parentNode.parentNode.classList.add('checked')
    todos[selected.id].status = 'completed';
    console.log(todos[selected.id]);
    localStorage.setItem('task-list', JSON.stringify(todos));
  } else {
    selected.parentNode.parentNode.classList.remove('checked');
    todos[selected.id].status = 'pending';
    localStorage.setItem('task-list', JSON.stringify(todos));
  }
}


addTask.addEventListener('submit', e => {
  e.preventDefault();
  let userInput = input.value;
  if (!todos) {
    todos = [];
  }

  if (userInput !== '') {
    let task = { name: userInput, status: 'pending' }
    todos.push(task);
    localStorage.setItem('task-list', JSON.stringify(todos));

    input.value = '';
    input.focus();
    showTodos('all');
  }

});


searchInput.addEventListener('input', () => {
  let userInput = searchInput.value.toLowerCase();
  let lists = document.querySelectorAll('.name');
  lists.forEach(list => {
    let searchValue = list.textContent.toLowerCase();
    list.parentNode.parentNode.style.display = 'none';
    if (searchValue.indexOf(userInput) != -1) {
      list.parentNode.parentNode.style.display = 'flex';
    }
  })
})

clearBtn.addEventListener('click', () => {
  todos = [];
  localStorage.setItem('task-list', JSON.stringify(todos));
  showTodos('all');
})
