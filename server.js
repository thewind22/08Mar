const express = require('express');
const app = express();

// Sử dụng EJS làm templating engine
app.set('view engine', 'ejs');

// Định nghĩa các route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Xử lý các URL không hợp lệ
app.use((req, res) => {
  res.status(404).render('404');
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
