var express = require('express');
var router = express.Router();
var connection = require('../common/model.js').connection;

// 首页
// router.get('/', function(req, res, next) {
//     connection.query('select count(*) as total from articles',function(error,results){
//         if(error){
//             console.log(error);
//         }else {
//             var page={};
//             page.total = results[0].total;

//             page.every=5;
//             page.pages = Math.ceil(page.total/page.every);
//             page.now = req.query.p ? Number(req.query.p) : 1;
//             page.prev = page.now-1 < 1 ? 1 : page.now-1;
//             page.next = page.now+1 > page.pages ? page.pages : page.now+1;
//             connection.query('select * from articles limit '+(page.now-1)*page.every+','+page.every,function(error,results1,fields){
//                 if(error){
//                     console.log(error);
//                 }else {


//                     var where = '';
//                     if (req.query.tid) {
//                         where = ' where tid='+req.query.tid;
//                     }

//                     // 查询文章
//                     connection.query('select * from articles'+where,function(error,results2){
//                         if (error) {
//                             console.log('查询失败',error);
//                         } else {
//                             // 查询分类
//                             connection.query('select * from types',function(err,results3){
//                                 if (err) {
//                                     console.log('查询失败',error);
//                                 } else {
//                                     res.render('index',{results:results,results1:results1,results2:results2,results3:results3,page:page, moment: require('moment')}); 

//                                 }
//                             })
//                         }
//                     })




//                 }
//             })
//         }
//     })
//     // connection.query('select * from articles', function(error, results) {
//     //     if (error) {
//     //         console.log(error);
//     //     } else {

//     //     }
//     // })

// });
router.get('/', function(req, res, next) {
    var where = '';
    var param = ''; // &tid=3
    if (req.query.tid) {
        where = ' where tid=' + req.query.tid;

        // 获取到搜索条件
        param = '&tid=' + req.query.tid;
    }
    connection.query('select count(*) as total from articles' + where, function(error, results) {
        if (error) {
            console.log(error);
        } else {
            var page = {};
            page.total = results[0].total;

            page.every = 5;
            page.pages = Math.ceil(page.total / page.every);
            page.now = req.query.p ? Number(req.query.p) : 1;
            page.prev = page.now - 1 < 1 ? 1 : page.now - 1;
            page.next = page.now + 1 > page.pages ? page.pages : page.now + 1;
            var limit = ' limit ' + (page.now - 1) * page.every + ',' + page.every;
            connection.query('select * from articles ' + where + limit, function(error, results1, fields) {
                if (error) {
                    console.log(error);
                } else {


                    // 查询文章
                    connection.query('select * from articles' + where, function(error, results2) {
                        if (error) {
                            console.log('查询失败', error);
                        } else {
                            // 查询分类
                            connection.query('select * from types', function(err, results3) {
                                if (err) {
                                    console.log('查询失败', error);
                                } else {
                                    res.render('index', { results: results, results1: results1, results2: results2, results3: results3, page: page, moment: require('moment'), param: param });

                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
// router.get('/show/:id', function(req, res) {
//     var where='';
//     var param='';
//     if(req.query.tid){
//         where='where tid='+req.query.tid;
//         param='&tid='+req.query.tid;
//     }
//     connection.query('select * from articles where id='+req.params.id+'',function(error,results){
//         if(error){
//             console.log(error);
//         }else {
//             connection.query('select count(*) as sum from articles where tid='+req.query+tid+'',function(error,results5){
//                 if(error){
//                     console.log(error);
//                 }else {
//                     var page={};
//                     page.t=results5[0].t;
//                     page.every=1;
//                     page.pages=Math.ceil(page.t/page.every);
//                     page.now = req.query.p ? Number(req.query.p) : 1;
//                     page.prev = page.now-1 < 1 ? 1 : page.now-1;
//                     page.next = page.now+1 > page.pages ? page.pages : page.now+1;
//                     connection.query('select * from articles where id='+req.params.id+' limit '+(page.now-1)*page.every+','+page.every,function(error,results6){
//                         if(error){
//                             console.log(error);
//                         }else {
//                             var moment=require('moment');
//                             res.render('show',{data:results[0],moment:moment,page:page,param:param});
//                         }
//                     })
//                 }
//             })
//             // console.log(results);

//         }
//     })
// })
router.get('/show/:id', function(req, res) {
    connection.query('select * from articles where id=' + req.params.id + '', function(error, results) {
        if (error) {
            console.log(error);
        } else {
            // console.log(results);
            var page = {};
            var moment = require('moment');
            res.render('show', { data: results[0], moment: moment, page: page });
        }
    })
})
router.get('/list', function(req, res) {
    // 在此处使用同样的方式来获取数据
    console.log(req.session.username);

    console.log('admin的值是:', req.session.admin);
    // 拿到上面的张三
    res.render('list');
})

// 注册页面
router.get('/reg', function(req, res) {
    res.render('reg');
})

// 提交数据并添加到数据库
router.post('/reg', function(req, res) {
    // 先判断验证码是否正确，再将数据添加到数据库
    // 判断提交的验证码和生成的验证码是否一致
    // console.log(typeof req.body.code);
    // console.log(typeof req.session.code);
    if (Number(req.body.code) === req.session.code) {
        // 加密密码
        req.body.password = require('../common/common.js').md5(req.body.password);
        req.body.addtime = Math.floor(new Date().getTime() / 1000);
        // 接收数据
        connection.query('insert into users(username,password,phone,addtime) values("' + req.body.username + '","' + req.body.password + '","' + req.body.phone + '",' + req.body.addtime + ')', function(error) {
            if (error) {
                console.log('添加失败', error);
            } else {
                // res.send('注册成功');
                // 注册成功，跳转到登录页面
                res.redirect('/login');
            }
        })
    } else {
        // 验证码错误
        res.redirect('back');
    }
})

// 登录页面
router.get('/login', function(req, res) {
    res.render('login');
})

// 执行登录操作
router.post('/login', function(req, res) {
    req.body.password = require('../common/common.js').md5(req.body.password);
    // 接收用户名和密码，判断用户名和密码是否正确（链接数据库）
    connection.query('select * from users where username = "' + req.body.username + '" and password="' + req.body.password + '"', function(error, results) {
        if (error) {
            console.log('查询失败', error);
        } else {
            // console.log(results);
            // 程序进入到else路线，不一定用户名和密码就是正确的
            // 查询到数据 [{username:"zhangsan"...}]
            // 查询不到数据 []
            if (results.length === 0) {
                // 没有数据，意味着用户名和密码不匹配
                res.redirect('back');
            } else {
                // 表示用户登录成功
                req.session.admin = results[0];

                // 有数据，用户名和密码匹配
                res.redirect('/users');
            }
        }
    })
})

// 检验用户名是否存在
router.post('/check', function(req, res) {
    connection.query('select * from users where username = "' + req.body.username + '"', function(error, results) {
        if (error) {
            console.log('查询数据失败');
        } else {
            // console.log('查询数据成功',results);
            // 存在=>y(1 zhangsan123#12zhangsan#zhangsan789)=>json数据
            if (results.length === 1) {
                // res.send('y');
                res.json({ "success": 1, "more": ['zhangsan123', '12zhangsan', 'zhangsan789'] })
            } else {
                // res.send('n');
                res.json({ "success": 0 });
            }
        }
    })
})

// 发送手机短信
router.post('/msg', function(req, res) {
    // 接收手机号码，生成随机的验证码，将验证码发送给短信运营商发送
    // req.body.phone
    console.log(req.body);

    // 4位
    function rand(m, n) {
        return Math.floor(Math.random() * (n - m + 1) + m);
    }
    // 获取随机数
    var code = rand(1000, 9999);
    // 将验证码保存到session中，长久保存，方便做验证码的判断
    req.session.code = code;

    // 通过阿里大于发送短信
    TopClient = require('../common/alidayu/topClient.js').TopClient;

    // 这是我个人的阿里大于账户和密钥（不要修改直接用）
    var client = new TopClient({    
        'appkey': '23341634',
            'appsecret': '7e30a1c2c254c9a109f283067e8d5e18',
            'REST_URL': 'http://gw.api.taobao.com/router/rest'
    }); 
    client.execute('alibaba.aliqin.fc.sms.num.send', {    
        'extend': '123456',
            'sms_type': 'normal',
        // 签名：本网站的标识符，不能改变
            'sms_free_sign_name': '俊哥技术小站',
        // 短信模板中的code参数
            'sms_param': '{\"code\":\"' + code + '\"}',
            'rec_num': req.body.phone,
        // 短信模板的编号
            'sms_template_code': 'SMS_105890028'
    }, function(error, response) {    
        if (error) {
            // console.log('发送失败',error);
            res.json({ success: 0 });
        } else {
            // console.log('发送成功');
            res.json({ success: 1 });
        }
    })
})

// 点击退出 - 清除admin的值就可以
router.get('/logout', function(req, res) {
    req.session.admin = null;
    res.redirect('/login');
})
var multer = require('multer');
var upload = multer({
    dest: 'public/upload/articles'
})
router.post('/upload', upload.single('editormd-image-file'), function(req, res) {
    var fs = require('fs');
    var path = require('path');
    var oldname = path.join('public/upload/articles', req.file.filename);
    // 补充文件的后缀名
    var filename = req.file.filename + path.extname(req.file.originalname);
    var newname = path.join('public/upload/articles', filename);
    fs.rename(oldname, newname, function(error) {
        if (error) {
            res.json({ success: 0, message: '上传失败', url: '' });
        } else {
            var newpath = path.join('/upload/articles', filename);
            res.json({ success: 1, message: '上传成功', url: newpath })
        }
    })
});

router.post('/aselect', function(req, res) {
    connection.query('select * from articles where articles like "%' + req.body.search + '%"', function(error, results7) {
        if (error) {
            console.log('查询失败', results7);
            console.log('查询标题失败');
        } else {
            console.log('数据', results7);
            if (results7 == '') {
                console.log('空字符串');
                res.json({ success: 0 });
            } else {
                res.json({ success: 1, results7: results7 });
            }
        }
    });

})
module.exports = router;