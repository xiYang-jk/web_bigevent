$(function () {
    $('#res-link').on('click', function () {
        $('.res-box').show()
        $('.login-box').hide()
    })
    $('#login-link').on('click', function () {
        $('.res-box').hide()
        $('.login-box').show()
    })
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '请输入6-12位密码，且不能有空格'],
        respwd: function (value) {
            let pwdval = $('.res-box [name=password]').val();
            if (value !== pwdval) {
                return '两次密码输入不一致'
            }
        }
    })
    // 链接注册接口
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                console.log(res.message);
            }
            console.log('注册成功');
        })
    })
    // 链接登陆接口
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res, reg) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})