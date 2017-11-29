var express = require('express');
var router = express.Router();

// 导入连接模块
var connection = require('../common/model.js').connection;

// 首页
router.get('/', function(req, res, next) {
    console.log(req.session.admin);
    connection.query('select count(*) as total from types', function(error, results) {
        if (error) {
            console.log('获取数据失败');
        } else {
            var page = {};

            // 总数据条数
            page.total = results[0].total;

            // 每页的数据条数
            page.every = 5;

            // 总页码
            page.pages = Math.ceil(page.total / page.every);

            // 当前的页码（可有可无的，第一次进来可能没有页码，默认第一页）
            // req.query.p从url地址栏获取的数据，如果获取的是数字数据-字符串类型的数字
            // '3' => 3 
            // Number():将纯数字字符串转换数字
            page.now = req.query.p ? Number(req.query.p) : 1;

            // 上一页
            page.prev = page.now - 1 < 1 ? 1 : page.now - 1;

            // 下一页
            page.next = page.now + 1 > page.pages ? page.pages : page.now + 1;

            // 4.查询数据
            connection.query('select * from types limit ' + (page.now - 1) * page.every + ',' + page.every, function(error, results, fields) {
                if (error) {
                    console.log('查询失败', error);
                    res.send('服务器内部错误，请联系管理员...');
                } else {
                    // 在views下的types下的index.html
                    var moment = require('moment');
                    res.render('types/index', { results: results, moment: moment, page: page, admin: req.session.admin });
                }
            })
        }
    })
});

// 添加用户的页面
router.get('/insert', function(req, res) {
    // 展示views文件夹下指定的文件
    res.render('types/insert');
})

// 获取用户的信息，并添加到数据库
router.post('/insert', function(req, res) {
    req.body.addtime = Math.floor(new Date().getTime() / 1000);
    // 4.将数据添加到数据库
    connection.query('insert into types(username,addtime) values("' + req.body.username + '",' + req.body.addtime + ')', function(error, results, fileds) {
        if (error) {
            console.log('失败', error);
            // 添加失败，跳转到上一个页面
            res.redirect('back');
        } else {
            // console.log('成功');
            // 添加成功，跳转到首页
            res.redirect('/types');
        }
    });
})

// 修改用户的界面
router.get('/update/:id', function(req, res) {
    // 只要是查询数据，哪怕只有一条数据，查询的结果都是数组
    // 通过req.params.id找到当前用户的id
    connection.query('select * from types where id = ' + req.params.id, function(error, results) {
        if (error) {
            console.log('查询该用户信息失败');
        } else {
            // console.log('查询数据成功',{results:results[0]});
            res.render('types/update', { data: results[0] });
        }
    });
})

// 获取用户修改的信息，执行修改
router.post('/update', function(req, res) {
    // 接受信息并修改
    console.log(req.body);
    connection.query('update types set username="' + req.body.username + '" where id=' + req.body.id, function(error, results) {
        if (error) {
            // console.log('修改失败');
            res.redirect('back');
        } else {
            // console.log('修改成功');
            res.redirect('/types');
        }
    })
})

// 删除用户
router.get('/delete/:id', function(req, res) {
    // 接受信息并修改
    console.log('delete from types where id = ' + req.params.id);
    connection.query('delete from types where id = ' + req.params.id, function(error) {
        if (error) {
            // res.send('删除失败');
            res.redirect('back');
        } else {
            res.redirect('/types');
        }
    });
})

// 添加头像的页面
router.get('/image/:id', function(req, res) {
    console.log(req.session.admin);

    // 传递的值就是id一个普通的数字变量，模板页直接使用id就可以
    res.render('types/image', { id: req.params.id });
})

var multer = require('multer');
var upload = multer({
    dest: 'public/upload' // 设置
    // 将上传的图片放在upload里面，方便后期的头像管理
})

/*
{ 
    fieldname: 'photo', // 表单的name值
    originalname: '2.jpg',  // 图片名称
    encoding: '7bit',   // 文件的编码
    mimetype: 'image/jpeg',  // 文件的类型
    destination: 'public/upload', // 文件存放的位置
    filename: '3d329473b853a69cb84b69f30cc26203', // 文件存放之后的名字
    path: 'public\\upload\\3d329473b853a69cb84b69f30cc26203', // 文件存放的完整路径
    size: 58261     // 文件的大小
}
*/
router.post('/image', upload.single('photo'), function(req, res) {
    // console.log(req.file);
    console.log(req.body.id);

    // 判断文件大小是否符合要求（100kb为界限）
    // canot read size property of undefined
    if (req.file.size > 102400) {
        res.send('文件过大，请重新上传');
    }

    // 判断文件的类型
    // console.log(req.file.mimetype); // txt->text/plain html->text/html md->application/octet-stream
    var arr = ['image/png', 'image/gif', 'image/jpeg'];
    if (arr.indexOf(req.file.mimetype) === -1) {
        res.send('上传的文件不符合类型');
    }

    // 给文件设置后缀名
    var fs = require('fs');
    var path = require('path');

    // 拼接老名字和新名字，使用rename进行改名
    var oldname = path.join('public/upload', req.file.filename);
    // 补充文件的后缀名
    var filename = req.file.filename + path.extname(req.file.originalname);
    var newname = path.join('public/upload', filename);

    fs.rename(oldname, newname, function(error) {
        if (error) {
            console.log('修改失败', error);
        } else {
            // 将名字保存到数据库
            connection.query('update types set photo="' + filename + '" where id=' + req.body.id, function(error) {
                if (error) {
                    console.log('修改用户头像数据失败');
                } else {
                    // res.send('上传成功');
                    res.redirect('/types');
                }
            })
        }
    })

    // res.send('接收头像');
})

module.exports = router;