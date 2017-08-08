/*

20170807
mean stack from front to back

사용 기술
passportjs
json web token -> jwt ->token generation & authentication
cors
mongoose odm
angular 2 / angular cli
angular router, http module
angular2 jwt
auth guard
angular flash message module
deploy -> heroku


// cors -> different domain name 에서 데이터를 읽을 수 있게 한다.
search cors npm

// angular 2 use
- angular 2 crash course 를 추천.. 이거 끝나면 보고 다시 이해해보자.
- 사용하기
npm install -g angular-cli
ng new angular-src // angular-src 는 원하는 파일이름으로 생성하면 된다.
nodemon // backend 를 돌린다.

다른 터미널에서-
cd ./angular-src
ng serve
-> port 4200 에서 앱이 열림 -> 확인한다.

모든 것들은 components로 된다.
component 생성하기
4200-
cd src/app/components
ng g component navbar // g -> generate

서비스 생성하기 -> ng g service validate // in services folder














//////////// error list

* can't set headers after they are sent.
* -> 왜 이게 발생하는지 아직 모르겠다. 찾아보니 response를 두 번 보낼 때 나는 에러라고 하는데 어떻게 고칠지 생각해보자.
* -> 해결 : 맨 밑에 res.send()가 있었는데 이게 콜백보다 먼저 실행되어서 그런 것.
*
- 에러가 발생하면 메시지를 한 번만 띄워야 되는데 엄청 많이 나온다



----
- 나중에 html들을 pug로 다 바꿀 수 있을까?...

 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
    console.log('connected to database ' + config.database);
});
mongoose.connection.on('error', (err) =>{
    console.log('database error ' + err);
});


const app = express();

const users = require('./routes/users');

//const port = 3000;
const port = process.env.PORT || 8080; // for heroku deployment

app.use(cors());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// body parser middlware
app.use(bodyParser.json());

app.use('/users', users);

// set static folder
app.use(express.static(path.join(__dirname, 'public'))); // or client

// index routes
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('server started on port ' + port);
});







