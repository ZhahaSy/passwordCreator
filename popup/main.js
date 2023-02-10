import { randomPassword } from './js/randomPassword.js';
import { copyToClickBoard } from './js/copy.js';

Object.defineProperty(HTMLFormElement.prototype, 'jsondata', {
  get() {
    const jsondata = {};
    const formdata = new FormData(this);
    formdata.forEach((value, key) => {
        if (!jsondata[key]) {
            jsondata[key] = formdata.getAll(key).length > 1 ? formdata.getAll(key) : formdata.get(key);
        }
    });
    return jsondata;
  },
});

// 生成密码监听
const creatorForm = document.getElementById('creatorForm');
const passwordView = document.getElementById('passwordView');

creatorForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const { range, size } = creatorForm.jsondata;
  const password = randomPassword(
    size,
    range && Array.isArray(range) ? range : [range]
  );
  passwordView.innerHTML = password;
});

// 复制
passwordView.addEventListener('click', (ev) => {
  ev.preventDefault();
  ev.target.innerText && copyToClickBoard(ev.target.innerText);
});

let accountList = JSON.parse(localStorage.getItem('accounts')) || [];

function renderList() {
  const passwordList = document.getElementById('passwordList');
  let innerHTML = '';
  accountList.forEach((item) => {
    innerHTML += `
        <li class='passwordListItem tile tile-centered'>
       
            <div class='content tile-content'>
                <div class='header tile-title'>
                    <h5 class='title'>${item.title} </h5>
                </div>
                账号：<div class='info'><span class='copy account d-block'>${item.account}</span></div>
                密码：<div class='info'><span class='copy password d-block'>${item.password}</span></div>
            </div>
            <div class="tile-action">
                <button class="btn btn-error btn-sm deleteBtn s-circle">
                <i class="icon icon-delete"></i>
                </button>
            </div>
        </li>
        `;
  });
  passwordList.innerHTML = innerHTML;

  const copyList = document.querySelectorAll(
    '.passwordListItem .content .copy'
  );
  copyList.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClickBoard(e.target.innerText);
    });
  });

  const deleteBtns = document.querySelectorAll(
    '.passwordListItem .deleteBtn'
  );
  deleteBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      accountList.splice(index, 1);
      console.log(accountList);
      renderList();
      localStorage.setItem('accounts', JSON.stringify(accountList));
    });
  });

  const empty = document.querySelector('.passwordBook .empty');
  empty.className = !accountList.length ? 'empty' : 'empty  d-none'
}
renderList();

function addAccount() {
  const title = prompt('请输入标题', '');
  if (title === null || title === '') return;
  const account = prompt('请输入用户名', '');
  if (account === null || account === '') return;
  const password = prompt('请输入密码', passwordView.innerText || '');
  if (password === null || password === '') return;

  accountList.push({ title, account, password });
  renderList();
  localStorage.setItem('accounts', JSON.stringify(accountList));
}

document.getElementById('addAccount').addEventListener('click', addAccount);


const tabs = document.querySelectorAll('.tab .tab-item');
const creator = document.getElementById('creator')
const passwordBook = document.getElementById('passwordBook')
tabs && tabs.forEach(tab => {
    tab.addEventListener('click', (ev) => {
        ev.preventDefault();
        tabs.forEach(i => {
            if (i !== tab) {
                i.className = 'tab-item'
            }
        });
        tab.className = 'tab-item active'

        switch (tab.outerText) {
            case '生成器':
                creator.className = ''
                passwordBook.className = 'passwordBook panel d-none'
                break;
        
            case '密码本':
                creator.className = 'd-none'
                passwordBook.className = 'passwordBook panel'
                break;
        }
    })
});