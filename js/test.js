
$btn.click(function () {
    try {
        var
            x = parseFloat($('#x').val()),
            y = parseFloat($('#y').val()),
            r;
        if (isNaN(x) || isNaN(y)) {
            throw new Error('输入有误');
        }
        r = x + y;
        alert('计算结果：' + r);
    } catch (e) {
        alert('输入有误！');
    }
});