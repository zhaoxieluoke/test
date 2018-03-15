    let print = function print(config) {
        
        //初始变量
        let 
            iClientY,
            iClientX,
            iOffsetX,
            iOffsetY,
            is_start,
            drop_width,
            drop_height,
            $out_container = $(`${config.container}`);
        $out_container.append(`
            <input type="file">
            <div class="container-box">
                <div class="complete-box"></div>
                <div class="drop-box"></div>
                <canvas class="canvas"></canvas>
                <canvas class="clip"></canvas>
            </div>
        `);
        let $container = $('.container-box');
        let $file = $out_container.find('input[type=file]');
        let $complete_box = $container.find('.complete-box');
        let $canvas = $container.find('.canvas');
        let ctx = $canvas[0].getContext('2d');
        let $clip = $container.find('.clip');
        let clip_ctx = $clip[0].getContext('2d');
        //上传 展示图片
        $file.on('change', function(){
            if(this.files.length > 0){
                let file_type = this.files[0].type;
                let DOMString_url = URL.createObjectURL(this.files[0]);
                if(file_type.indexOf('image') > -1) {
                    // $img.src = DOMString_url;
                    let img = new Image();
                    img.src = DOMString_url;
                    //等待图片加载
                    img.onload = function() {
                        //设置图片展示容器宽高
                        let img_scale = img.width / img.height;
                        img.height > 400 ? $container.height(400): $container.height(img.height);
                        img_scale > 1 ? $container.width( $container.height() * img_scale ) : $container.width( $container.height() / img_scale );
                        $container.css({
                            'background': `url(${DOMString_url})  center/contain no-repeat`
                        })
                        //绘制canvas图片
                        $canvas[0].height = $container.height();
                        $canvas[0].width = $container.width();
                       
                       ctx.drawImage(img, 0, 0, $container.width(), $container.height());
                    }
                    return false;
                }
            }
        })

        //已经选择的区域信息存储
        let choosed_area = [
                {
                    title: '第一版',
                    left: 100,
                    top: 100,
                    width: 100,
                    height: 100
                }
            ];
        
        //鼠标按下 记录初始位置 定位
        $container.on('mousedown', function(event){
            if($file[0].files.length === 0) return false;
            iClientY = event.pageY;
            iClientX = event.pageX;
            iOffsetX = iClientX - $container.offset().left;
            iOffsetY = iClientY - $container.offset().top;
            //
            if($('.complete-box').css('display') == 'none') {
                is_start = true;
            }
            //起始位置边界检测
            let print_top = iClientY - $container.offset().top; //当前选定区域 top
            let print_left = iClientX - $container.offset().left; //当前选定区域 left

            //开始绘制
            if(is_start) {
                //是 记录矩形起始坐标
                $('.drop-box').css({
                    'top': `${iOffsetY}px`,
                    'left': `${iOffsetX}px`,
                    'display': `block`,
                    'position': `absolute`
                });
            }
            return false;
        });

        //鼠标移动  确定矩形大小
        $container.on('mousemove', (event)=> {
            if($file[0].files.length == 0) return false;
            if(is_start) {
                    drop_width = event.pageX-iClientX;//鼠标X轴滑动距离, 即矩形宽
                    drop_height = event.pageY-iClientY; //鼠标Y轴滑动距离, 即矩形高
                let drop_top_final = iOffsetY + drop_height, //滑动top终点位置
                    drop_left_final = iOffsetX + drop_width, //滑动left终点位置
                    distance_x_limit = $('.box').width() - iOffsetX, //x最大滑动距离
                    distance_y_limit = $('.box').height() - iOffsetY; //y最大滑动距离
                //移动边界检测
                choosed_area.forEach((ele, index)=>{
                    let choosed_top_final = ele.top + ele.height; //已选区域 top终点值
                    let choosed_left_final = ele.left + ele.width; //已选区域 left终点值
                    
                    //移动超出边界
                    // 滑动距离超出边界
                    (drop_height > distance_y_limit)|| (drop_width > distance_x_limit) && (is_start = false);
                })
                // 通过长宽变化绘制矩形
                $('.drop-box').css({
                    'width': `${drop_width}px`,
                    'height': `${drop_height}px`
                })

            }else {
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
        $container.on('mouseup', ()=>{
            if($file[0].files.length === 0) return false;
            if(is_start){
                
                //绘制替代矩形
                $('.complete-box').css({
                    'width': `${drop_width}px`,
                    'height': `${drop_height}px`,
                    'top': `${iOffsetY}px`,
                    'left': `${iOffsetX}px`,
                    'display': 'block'
                });
                //获取canvas上绘制矩形数据
                var clipImg = ctx.getImageData( iOffsetX, iOffsetY, drop_width, drop_height);
                $clip[0].width = drop_width;
                $clip[0].height = drop_height;
                var set = clip_ctx.putImageData(clipImg, 0, 0);  
                var imgurl = $clip[0].toDataURL();
                $('.save').prop('href', imgurl);
                $('.save').prop('download', imgurl);
                // 绘制状态置为false
                is_start = false;
                $('.btn').prop('disabled', false);
                let position_txt = `top:${iOffsetY}, left:${iOffsetX}, width:${$('.drop-box').width()}, height:${$('.drop-box').height()}`;
                $('.position-txt').html(position_txt);
            }
            
        });
        //按钮 重置选区 保存截图
        $container.after(`
            <div style="color:gray"><span>* 上传图片,拖动鼠标选择要截图的区域, 保存截图 </span></div>
            <div class="position-txt"></div>
            <div class="btn-group">
                <button  class="btn reset" type="button" disabled>重置 X</button>
                <button class="btn save" href="javascript:;" download="pic.jpeg" disabled>保存截图</button>
                <a class="btn save" href="javascript:;" download="pic.jpeg" style="visibility:hidden"><span class="span_save">保存截图</span></a>
            </div>
        `);
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
        $('[disabled]').on('click', function(){
            return false;
        })
        $('button.save').on('click', function(){
            $('.span_save').trigger("click");
        })
        
    }
    //数据绑定
    function bindModelInput(obj, property, domElem) {
        Object.defineProperty(obj, property, {
            get: function() { return domElem.value; }, 
            set: function(newValue) { domElem.value = newValue; },
            configurable: true
        });
    }

    //<input id="foo">
    let user = {};
    bindModelInput(user,'name',document.getElementById('foo'));
    //调用 进行绘制
    $(function(){
        print({
            container: ".box"
        });
    })
    