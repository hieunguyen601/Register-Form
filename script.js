// Step 1 — register form
const step1Form = document.getElementById('step1Form');
if (step1Form) {
  step1Form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name) { document.getElementById('name').focus(); return; }
    if (!email) { document.getElementById('email').focus(); return; }
    localStorage.setItem('regName', name);
    localStorage.setItem('regEmail', email);
    window.location.href = 'step2index.html';
  });
}

// Step 2 — topic selection
const topicBtns = document.querySelectorAll('.topic-btn');
if (topicBtns.length) {
  topicBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.classList.toggle('selected');
    });
  });

  document.querySelector('.continueButton').addEventListener('click', function () {
    const selected = Array.from(document.querySelectorAll('.topic-btn.selected'))
      .map(function (btn) { return btn.dataset.topic; });
    localStorage.setItem('regTopics', JSON.stringify(selected));
    window.location.href = 'step3index.html';
  });
}

// Step 3 — summary
const summaryName = document.getElementById('summaryName');
if (summaryName) {
  summaryName.textContent = localStorage.getItem('regName') || '';
  document.getElementById('summaryEmail').textContent = localStorage.getItem('regEmail') || '';

  const topics = JSON.parse(localStorage.getItem('regTopics') || '[]');
  const list = document.getElementById('topicsList');
  topics.forEach(function (topic) {
    const li = document.createElement('li');
    li.textContent = topic;
    list.appendChild(li);
  });

  document.querySelector('.continueButton').addEventListener('click', function () {
    localStorage.removeItem('regName');
    localStorage.removeItem('regEmail');
    localStorage.removeItem('regTopics');
    window.location.href = 'index.html';
  });
}
