# qvideo
一个极简的js视频播放器
纯javascript编写，只有一个控制器而已，而且控制器是常驻的，我不喜欢鼠标放入才显示的那种
目前全屏没有做规划，所以必须点击原生控制台的播放按钮才能播放

### 使用id创建实例
```
 <video id="video"><source src="../html-test/assets/genhe.mov"></video>
//注意引入放在后面
    <script src="qvideo.js"></script>
    <script>
        Qvideo("video", {
            width: 690
        });
    </script>
```
### 使用dom实体创建实例
```
 <video id="video"><source src="../html-test/assets/genhe.mov"></video>
//注意引入放在后面
    <script src="qvideo.js"></script>
    <script>
         var video = document.getElementsByTagName('video');
        Qvideo(video[0], {
            width: 690
        });
       
    </script>
```