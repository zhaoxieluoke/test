'use strict';

var print = function print(config) {

    //初始变量
    var iClientY = void 0,
        iClientX = void 0,
        iOffsetX = void 0,
        iOffsetY = void 0,
        is_start = void 0,
        drop_width = void 0,
        drop_height = void 0,
        $out_container = $('' + config.container);
    $out_container.append('\n            <input type="file">\n            <div class="container-box">\n                <div class="complete-box"></div>\n                <div class="drop-box"></div>\n                <canvas class="canvas"></canvas>\n                <canvas class="clip"></canvas>\n            </div>\n        ');
    var $container = $('.container-box');
    var $file = $out_container.find('input[type=file]');
    var $complete_box = $container.find('.complete-box');
    var $canvas = $container.find('.canvas');
    var ctx = $canvas[0].getContext('2d');
    var $clip = $container.find('.clip');
    var clip_ctx = $clip[0].getContext('2d');
    //上传 展示图片
    $file.on('change', function () {
        if (this.files.length > 0) {
            var file_type = this.files[0].type;
            var DOMString_url = URL.createObjectURL(this.files[0]);
            if (file_type.indexOf('image') > -1) {
                // $img.src = DOMString_url;
                var img = new Image();
                img.src = DOMString_url;
                //等待图片加载
                img.onload = function () {
                    //设置图片展示容器宽高
                    var img_scale = img.width / img.height;
                    img.height > 400 ? $container.height(400) : $container.height(img.height);
                    img_scale > 1 ? $container.width($container.height() * img_scale) : $container.width($container.height() / img_scale);
                    $container.css({
                        'background': 'url(' + DOMString_url + ')  center/contain no-repeat'
                    });
                    //绘制canvas图片
                    $canvas[0].height = $container.height();
                    $canvas[0].width = $container.width();

                    ctx.drawImage(img, 0, 0, $container.width(), $container.height());
                };
                return false;
            }
        }
    });

    //鼠标按下 记录初始位置 定位
    $container.on('mousedown', function (event) {
        if ($file[0].files.length === 0) return false;
        iClientY = event.pageY;
        iClientX = event.pageX;
        iOffsetX = iClientX - $container.offset().left;
        iOffsetY = iClientY - $container.offset().top;
        //
        if ($('.complete-box').css('display') == 'none') {
            is_start = true;
        }

        //开始绘制
        if (is_start) {
            //是 记录矩形起始坐标
            $('.drop-box').css({
                'top': iOffsetY + 'px',
                'left': iOffsetX + 'px',
                'display': 'block',
                'position': 'absolute'
            });
        }
        return false;
    });

    //鼠标移动  确定矩形大小
    $container.on('mousemove', function (event) {
        if ($file[0].files.length == 0) return false;
        if (is_start) {
            drop_width = event.pageX - iClientX; //鼠标X轴滑动距离, 即矩形宽
            drop_height = event.pageY - iClientY; //鼠标Y轴滑动距离, 即矩形高
            var drop_top_final = iOffsetY + drop_height,
                //滑动top终点位置
            drop_left_final = iOffsetX + drop_width,
                //滑动left终点位置
            distance_x_limit = $('.box').width() - iOffsetX,
                //x最大滑动距离
            distance_y_limit = $('.box').height() - iOffsetY; //y最大滑动距离
            //移动边界检测
            choosed_area.forEach(function (ele, index) {
                var choosed_top_final = ele.top + ele.height; //已选区域 top终点值
                var choosed_left_final = ele.left + ele.width; //已选区域 left终点值

                //移动超出边界
                // 滑动距离超出边界
                drop_height > distance_y_limit || drop_width > distance_x_limit && (is_start = false);
            });
            // 通过长宽变化绘制矩形
            $('.drop-box').css({
                'width': drop_width + 'px',
                'height': drop_height + 'px'
            });
        } else {
            //重置状态
            //移除矩形 重新进行绘制
            $('.drop-box').css({
                'width': 0,
                'height': 0,
                'display': 'none',
                'top': 0,
                'left': 0,
                'position': 'static'
            });
        }
        return false;
    });
    //鼠标抬起 重置状态 
    $container.on('mouseup', function () {
        if ($file[0].files.length === 0) return false;
        if (is_start) {

            //绘制替代矩形
            $('.complete-box').css({
                'width': drop_width + 'px',
                'height': drop_height + 'px',
                'top': iOffsetY + 'px',
                'left': iOffsetX + 'px',
                'display': 'block'
            });
            //获取canvas上绘制矩形数据
            var clipImg = ctx.getImageData(iOffsetX, iOffsetY, drop_width, drop_height);
            $clip[0].width = drop_width;
            $clip[0].height = drop_height;
            var set = clip_ctx.putImageData(clipImg, 0, 0);
            var imgurl = $clip[0].toDataURL();
            $('.save').prop('href', imgurl);
            $('.save').prop('download', imgurl);
            // 绘制状态置为false
            is_start = false;
            $('.btn').prop('disabled', false);
            var position_txt = 'top:' + iOffsetY + ', left:' + iOffsetX + ', width:' + $('.drop-box').width() + ', height:' + $('.drop-box').height();
            $('.position-txt').html(position_txt);
        }
    });
    //按钮 重置选区 保存截图
    $container.after('\n            <div style="color:gray"><span>* \u4E0A\u4F20\u56FE\u7247,\u62D6\u52A8\u9F20\u6807\u9009\u62E9\u8981\u622A\u56FE\u7684\u533A\u57DF, \u4FDD\u5B58\u622A\u56FE </span></div>\n            <div class="position-txt"></div>\n            <div class="btn-group">\n                <button  class="btn reset" type="button" disabled>\u91CD\u7F6E X</button>\n                <button class="btn save" href="javascript:;" download="pic.jpeg" disabled>\u4FDD\u5B58\u622A\u56FE</button>\n                <a class="btn save" href="javascript:;" download="pic.jpeg" style="visibility:hidden"><span class="span_save">\u4FDD\u5B58\u622A\u56FE</span></a>\n            </div>\n        ');
    //重置
    $('.reset').on('click', reset_position);
    function reset_position() {
        $('.complete-box').css({
            'width': 0,
            'height': 0,
            'top': 0,
            'left': 0,
            'display': 'none'
        });
        $('.btn').prop('disabled', true);
        $('.position-txt').html('');
    }
    $('[disabled]').on('click', function () {
        return false;
    });
    $('button.save').on('click', function () {
        $('.span_save').trigger("click");
    });
};

//调用 进行绘制
$(function () {
    print({
        container: ".box"
    });
});
//# sourceMappingURL=print_function.js.map