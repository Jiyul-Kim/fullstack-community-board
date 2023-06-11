const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const boardData = require('./data.json')
const ejsMate = require('ejs-mate');


app.use(express.static(path.join(__dirname, "public")));

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 로그인
app.get('/login', (req, res) => {
  res.render('login')
  res.redirect('/board')
})

// 회원가입
app.get('/signup', (req, res) => {
  res.render('signup')
})

// 전체 게시판
app.get("/board", (req, res) => {
  const allPosts = [
      ...boardData.notice.posts,
      ...boardData.event.posts,
      ...boardData.free.posts
  ];
  res.render("board", { posts: allPosts });
});

app.get('/board/new', (req, res) => {
  res.render('new')
})

// 서브 게시판의 종류에 따라 테이블로 표현
app.get('/:subboard', (req, res) => {
    const { subboard } = req.params;
    const data = boardData[subboard];
    // console.log(data)
    res.render('subboard', {...data})
})



// 게시글 페이지
app.get('/board/:id', (req, res) => {
  const { id } = req.params;

  // 검색하려는 게시글을 찾습니다.
  let foundPost = null;
  for (const subboard of Object.values(boardData)) {
    foundPost = subboard.posts.find(post => post.id === parseInt(id));
    if (foundPost) break;
  }

  // 게시글이 존재하는 경우 해당 게시글을 템플릿에 전달합니다.
  if (foundPost) {
    res.render("article", { post: foundPost });
  } else {
    // 게시글이 존재하지 않는 경우 에러 페이지를 표시하거나 다른 처리를 수행할 수 있습니다.
    res.status(404).send("게시글을 찾을 수 없습니다.");
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
