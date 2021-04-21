 function Qvideo(videoDom, outOptions) {
     var defaultOptions = {
         src: "",
         height: "",
         width: 680,
         muted: false, //是否默认静音
         // autoplay: true, //是否自动播放
     };
     window.volume = 0.5;
     var options = Object.assign(defaultOptions, outOptions);
     if (videoDom == undefined) {
         console.log("dom not find")
         return false;
     }
     if (typeof videoDom == "string") {
         videoDom = document.getElementById(videoDom);
     }
     if (options.src !== "") {
         videoDom.src = options.src;
     }
     var sWidth = window.screen.width;
     var width = options.width > sWidth ? sWidth : options.width;
     var elem = document.createElement('div')
     elem.style.width = width + "px"; //设置最大宽度
     elem.style.margin = "0px";
     elem.style.padding = "0px";

     videoDom.style.width = "100%"; //设置最大宽度
     videoDom.style.maxWidth = "none"; //设置最大宽度
     if (options.height == '') {
         videoDom.style.height = width * 0.61 + "px"; //设置最大高度
     } else {
         videoDom.style.height = options.height + "px"; //设置最大高度
     }

     videoDom.style.backgroundColor = "#000000"; //设置视频背景颜色
     videoDom.parentNode.replaceChild(elem, videoDom)
     videoDom.removeAttribute("controls");
     elem.appendChild(videoDom)
     var contDom = '<style>.q-icon{width:30px;height:30px;float:left;}.time{float:left;margin-top:6px;} .cont{width:100%;position:relative;line-height:20px;top:-3px;background-color: #f0f5f9;font-size:10px;} </style>' +
         '<i class="toggle icon-play q-icon" title="Toggle Video " style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAqUlEQVR4Ae3VEQwCcRiG8eAgCIPwMAzPw5zCfPny5cuXL8wX5ssXhEEQBAfXA2cfHNzt3he+Z/v5u9X/u0mWZVl3Jaz6Yo8CFjWtO1Y+g4AaR0y1g6In1vpB0Rlzn0HAG1v9oOiK0mkQ4olQD4onQjlorBPR9HDBwmHQCxuHn6zGCTOHP/UDlcOz/+GAwuEw3rB0+HR8sIOgjqcsKDxlbfEp66swVFmWZX8K/6tRkuUooAAAAABJRU5ErkJggg==); background-size: 100% 100%; background-repeat: no-repeat;  "></i>' +
         '<span class="video-start time" style="width: 39px;text-align:right;">00:00</span><span class="time" style="width: 10px;text-align:center;">/</span><span style="width: 39px" class="time video-end">00:00</span>' +
         '<div class="progress" id="progress" style=" width:calc(100% - 183px);height:50%;margin-top:7px;margin-left:3px;border:none;border-radius:25px;display: flex; float:left; background-color:#f9f7f7;">' +
         '<div class="progress__filled " style="flex-grow: 0;flex-shrink: 0;flex-basis: 0px;background-color:#ff9a3c;border-radius:25px;"></div>' +
         '</div>' +
         '<i class=" volume  q-icon" title="Volume " style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAjElEQVR4Ae3OsQ0BABhE4QdQKvXAPkYwgFGU9gD2ADqgNMTpAYCT/C+59vIR/WlR1HLDyA0jN4zcMHLDyA0jTusAhV9hxGkCVkCRF9OTu/QzAdJOIAENN1DPDbRwA63cQCM3UNMJtAPyfKD2E6A9UOekb6BOGwFlTvoW6mbfR+GGwg2FGwovlGlRFB0AjX7QVT70vksAAAAASUVORK5CYII=);background-size: 100% 100%; background-repeat: no-repeat;"></i>' +
         '<i class="fullscreen q-icon" style=" background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAANklEQVR4Ae3WAQYAQAhFwb3/pTcAgfAlmCFAPJAeQPeHyfcWgwSl7oMECcoA7pAgQT7GiyCAAsmXm2Wt3Q8gAAAAAElFTkSuQmCC);background-size: 100% 100%;background-repeat: no-repeat; "></i>';
     var contDiv = document.createElement('div')
     contDiv.className = 'cont';
     // contDiv.style.width = width + "px";
     contDiv.style.height = "33px";
     videoDom.parentNode.appendChild(contDiv);
     videoDom.parentNode.getElementsByClassName('cont')[0].innerHTML = contDom;
     var f = videoDom.parentNode;
     //获取视频时长
     videoDom.oncanplay = function() {
         var duration = videoDom.duration;
         var minute = parseInt(duration / 60);
         var sec = parseInt(duration % 60);
         minute = minute < 10 ? '0' + minute : minute;
         sec = sec < 10 ? '0' + sec : sec;
         var showTime = minute + ':' + sec;
         f.getElementsByClassName('video-end')[0].innerHTML = showTime;
     }
     var player = videoDom;

     //点击暂停
     f.getElementsByClassName("toggle")[0].onclick = function() {
         if (player.paused) {
             player.play(); //播放
         } else {
             player.pause(); //暂停
         }
     };
     //点击全屏
     f.getElementsByClassName("fullscreen")[0].onclick = function() {
         if (player.requestFullscreen) {
             player.requestFullscreen();
         } else if (player.mozRequestFullScreen) {
             player.mozRequestFullScreen();
         } else if (player.webkitRequestFullScreen) {
             player.webkitRequestFullScreen();
         }
     };
     //点击视频的时候
     videoDom.onclick = function() {
         if (player.paused) {
             player.play(); //播放
         } else {
             player.pause(); //暂停
         }
     };
     //点击进度条
     f.getElementsByClassName("progress")[0].onclick = function(e) {
         var width = f.getElementsByClassName("progress")[0].offsetWidth;
         var local = e.offsetX;
         var percent = Math.floor(local / width * 100);
         f.getElementsByClassName("progress__filled")[0].style.flexBasis = local + "px";
         player.currentTime = (player.duration / 100 * percent).toFixed(0);
     };
     //更新滚动条
     player.ontimeupdate = function() {
             var w = f.getElementsByClassName("progress")[0].offsetWidth;
             if (player.duration) {
                 var per = (player.currentTime / player.duration).toFixed(3);
                 window.per = per;
             } else {
                 per = 0;
             }
             f.getElementsByClassName("progress__filled")[0].style.flexBasis = (w * per).toFixed(0) + "px";
             var duration = player.currentTime;
             var minute = parseInt(duration / 60);
             var sec = parseInt(duration % 60);
             minute = minute < 10 ? '0' + minute : minute;
             sec = sec < 10 ? '0' + sec : sec;
             var showTime = minute + ':' + sec;
             f.getElementsByClassName('video-start')[0].innerHTML = showTime;
         }
         //当点击暂停的时候
     player.onpause = function() {
             f.getElementsByClassName("toggle")[0].style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAqUlEQVR4Ae3VEQwCcRiG8eAgCIPwMAzPw5zCfPny5cuXL8wX5ssXhEEQBAfXA2cfHNzt3he+Z/v5u9X/u0mWZVl3Jaz6Yo8CFjWtO1Y+g4AaR0y1g6In1vpB0Rlzn0HAG1v9oOiK0mkQ4olQD4onQjlorBPR9HDBwmHQCxuHn6zGCTOHP/UDlcOz/+GAwuEw3rB0+HR8sIOgjqcsKDxlbfEp66swVFmWZX8K/6tRkuUooAAAAABJRU5ErkJggg==)";
         }
         //当视频播放的时候
     player.onplay = function() {
         f.getElementsByClassName("toggle")[0].style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAOUlEQVR4Ae3WoQ0AMAwDwW7e0dsFzKyg3EthBgdzcpJ009X7opev3wMBAQEBAQEBAQEtAU09+ZL0AeYz+vn03wvkAAAAAElFTkSuQmCC)";
     };
     //点击音量按钮的时候
     f.getElementsByClassName("volume")[0].onclick = function(e) {
         if (window.volume == 0.5) {
             window.volume = 0.8;
             player.volume = 0.8;
             this.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABS0lEQVR4AezUAWRCURiG4RBCCEMIAYaLAMMACGEIA4QB4CIMMAzDEGAYhmEACGEYhhDCMIQhQAhhuPj34sf10W4u59zQywPA5+ec2qkj7tQ7btDCUWRuizs0EK0UmokVerHGGLQBZjJqh2GMMdhbH2uYy3AZeAwkqY2FXKobcgwKO8M3zH2EHIODOscvzF0FGeO0B9Sh3cPcPMgYpxmm0FpypQT/ZiVp5m6hvcJcGnvQBvpLj2BuGnWQGyBfD+YWVQxKka8Lcz9VDBojXwfm1lUM0v8mgbll7EE7tJDvGuZmsQc9QnvWb6FMkxKD5tDfuoEtzF2gFmKU9oYmtDHMfYEowKhD6sh1RqAwo4pq4lNeVx0UZlTRmCnMZejBCzNqXwmWMn4IL9woLcETMrlMiuBNoJnYoI9qkqu8oI1KW/0N2lxVoaelo2AUAABD3S6aK6xemwAAAABJRU5ErkJggg==)";
         } else if (window.volume == 0.8) {
             window.volume = 0.0;
             player.volume = 0.0;
             this.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABVUlEQVR4Ae2VAUTEUByHQwgHCAGGEMIwDHAAhCFACAFgCBAOECCEMAyHAAc4BAhwADgAhAEOIRxeHx5+2N+9uvuvsI/P8Pbs29u2dzQy4kiO/4Yn3OI1/oYOm0PdVIUhmhpVoxLEBWb7r1B6VI3BCopusPKNkpioUmIb5wWx9ow6wbWM91HoOVHXlTqTC1pM8F0fH2b+UQYSpSu1RPCNUp5jhFLqO4U5JjHFmWGX+PUFXPVEzWV+i0nMMCRqRYVog0ohY51HkBW1lrFzVHSVLx2Cdn5996gsZN6VQ9DOqBdUWplz6xdkRz2g0sj5d85BEmWjj+zGLyh9Q/7Qf5FfECRElTL+icf7/BhfE4J+svfND7Z9GApJUVMEtyhIjzpFxSUK0qMUr6g+LnDzV1FKho/4JeMDRwlGxNuwUXbQCgvjncpxELa4xMpeUY4DMkGTGOrCyMg3T+pEpBZxmCwAAAAASUVORK5CYII=)";
         } else if (window.volume == 0.0) {
             window.volume = 0.3;
             player.volume = 0.3;
             this.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAATElEQVR4Ae3OMQ0AMAzEwGdcKIX8pZAtrmRL3i/2eWaHhikNUxqmNExpmNIwXcNsgDpZkCBBgha6KNAAFRoqNFRoqNBQoaHCQsEyswdrpK9Jrx6tJQAAAABJRU5ErkJggg==)";
         } else if (window.volume == 0.3) {
             window.volume = 0.5;
             player.volume = 0.5;
             this.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAjElEQVR4Ae3OsQ0BABhE4QdQKvXAPkYwgFGU9gD2ADqgNMTpAYCT/C+59vIR/WlR1HLDyA0jN4zcMHLDyA0jTusAhV9hxGkCVkCRF9OTu/QzAdJOIAENN1DPDbRwA63cQCM3UNMJtAPyfKD2E6A9UOekb6BOGwFlTvoW6mbfR+GGwg2FGwovlGlRFB0AjX7QVT70vksAAAAASUVORK5CYII=)";
         }
     };
 }