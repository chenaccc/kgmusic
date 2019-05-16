<template>
    <div class="play">
        <div class="top">
        <p>{{$store.state.songName.songName}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="" @click="fh()">
    </div>
        <div class="playimg">
            <img :src="this.$store.state.songName.imgUrl" alt="">
        </div>
        <div class="lyrics" ref="wrapper">
            <div class="lyrBox" ref="lrcBox">
                <p v-for="item in lrc" :key="item.time">{{item.txt}}</p>
            </div>
        </div>
        <div class="jindu">
            <div class="s">
                {{thisS}}
            </div>
            <div class="jinduBox" @touchend="out" @touchstart="up">
                <mt-range v-model="rangeValue" :step="0.1"></mt-range>
            </div>
            <div class="leng">
                {{songLeng}}
            </div>
        </div>
        <div class="BtnBox">
            <div class="playoperate">
                <i class="prev" @click="pudateMusicThis(-1)"></i>
                <i class="musicplay" @click="musicplay" :class="{ playplay : $store.state.isshow }"></i>
                <i class="next" @click="pudateMusicThis(1)"></i>
        </div>
        </div>
        <audio 
            :src="$store.state.songName.url"
            autoplay
            id="music"
            >
        </audio>
    </div>
</template>
<script>
import axios from 'axios'
import Lyric from 'lyric-parser'
import BScroll from 'better-scroll'
export default {
    name: 'musicc',
        data(){
            return{
                rangeValue: 0 ,
                time: "",
                isshow: false,
                songLeng: '00:00',
                thisS: '00:00',
                lrc: [],
                s: 0
            }
        },
    methods:{
        pudateMusicThis (data) {
            this.$store.commit('pudateMusicThis', data)
        },
        fh(){
            this.$emit('updatemusicoff', false)
        },
        musicShow (data) {
            let id = data
            axios(`/proxy/app/i/krc.php?cmd=100&keyword=&hash=${id}&timelength=253000`).then(({data})=>{
                // console.log(data)
                let lyric = new Lyric(data)
                console.log(lyric.lines)
                this.lrc = lyric.lines
            })
            axios(`/proxy/api/v1/song/get_song_info?cmd=playInfo&hash=${id}&from=mkugou&apiver=2&mid=96d25d639d8c552143b5fd2b60b7bed3&userid=0`).then(({data})=>{
            console.log(data)
            this.$store.state.songName = data
            console.log(data.singerName)
            this.$store.state.songName.imgUrl = 'http://singerimg.kugou.com/uploadpic/softhead/400' + data.imgUrl.split('{size}')[1]
            console.log(this.$store.state.songName.imgUrl)
          })
        },
        out () {
           clearInterval(this.time)
            let music = document.getElementById('music')
            let duration
            let s
            let This = this
            duration = music.duration
            console.log()
            music.currentTime = this.rangeValue * (duration / 100)
            this.time = setInterval (function(){
                s = music.currentTime
                // console.log(duration, s)
                // console.log(s / duration * 100)
                This.rangeValue = s / duration * 100
                This.TimeFn(s, 's')
                This.s = s
                // console.log(this)
            }, 500)
        },
        up () {
           clearInterval(this.time)
        },
        musicplay () {
            let music = document.getElementById('music')
            this.$store.state.isshow = !this.$store.state.isshow
            if(this.$store.state.isshow) {
                 music.pause()
            } else {
                music.play()
            }
        },
        TimeFn (s, off) {
            // 计算分钟
            // 算法：将秒数除以60，然后下舍入，既得到分钟数
            var h
            h = Math.floor(s / 60)
            // 计算秒
            // 算法：取得秒%60的余数，既得到秒数
            s = (s % 60).toFixed(0)
            // 将变量转换为字符串
            h += ''
            s += ''
            // 如果只有一位数，前面增加一个0
            h = (h.length === 1) ? '0' + h : h
            s = (s.length === 1) ? '0' + s : s
            if (off === 'h') {
                this.songLeng = h + ':' + s
            } else {
                this.thisS = h + ':' + s
            }
        },
        
    },
    mounted () {
        let music = document.getElementById('music')
        let duration
        let s
        let This = this
        // 播放开始
        console.log(10, this)
         music.addEventListener('canplay', function () {
             console.log(20, This.rangeValue)
             duration = music.duration
             This.TimeFn(duration, 'h')
            if (This.time === "") {
                This.time = setInterval (function(){
                    s = music.currentTime
                    // console.log(duration, s)
                    // console.log(s / duration * 100)
                    This.rangeValue = s / duration * 100
                    This.TimeFn(s, 's')
                    This.s = s
                }, 500)
            } 
        }, false);
        // 播放结束
         music.addEventListener('ended', function () {
          alert()
        }, false);
        this.$nextTick(() => {
        //$refs绑定元素
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
            //开启点击事件 默认为false
            click:true
        })
        // console.log(this.scroll)
        }else if(!this.$refs.wrapper){
            return
        }
        else{
            this.scroll.refresh()
        }
      })
    },
    computed: {
        musicThis () {
            return this.$store.state.musicThis
        },
        musicList () {
            return this.$store.state.songList
        }
    },
    watch: {
        musicThis () {
            // console.log(to, this.musicList[to])
            let id
          if (this.musicList.length  <= this.musicThis) {
            this.$store.state.musicThis = 0
          }
          if (this.musicThis <= -1) {
              this.$store.state.musicThis = this.musicList.length - 1
          }
          if (this.musicList[this.musicThis].hash) {
                id = this.musicList[this.musicThis].hash
            }
            this.musicShow(id)
        },
        s (to) {
            let lrcBox = this.$refs.lrcBox.children
            let lrc = this.lrc
            // for (var i = 0; i < lrc.length;i++) {
            //     console.log(lrc[i])
            //     console.log(i)
            // }
            let num = -1
            lrc.forEach(function (el, index) {
                // console.log(to)
                lrcBox[index].style.color = ''
                if (to * 1000 >= el.time) {
                    num++
                    console.log(el.txt)
                }
                // console.log(index)
            })
            lrcBox[num].style.color = 'red'
            if (num >= 3) {
                this.scroll.scrollToElement(lrcBox[num - 3], 500)
            }
            // lrc.forEach((el, index) => {
                
            // })
            // console.log(lrcBox)
            // console.log(to)
        }
    }
}
</script>
<style scoped>

.play{
    width: 100%;
    height: 100%;
    background: darkcyan;

   
}
.top{
    z-index: 99;
    height: 3rem;
    width: 100%;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    top: 1.3rem;
    position: fixed;
    margin-top: 2rem;
    text-align: center;
    line-height: 3rem;
}
.top p{
    color: #ffffff;
    font-size: 16px;
}
.top img{
    position: absolute;
    left: 0;
    top: 0;
    width: .85714rem;
    height: 1.42857rem;
    margin-top: .687265rem;
    display: inline-block;
    margin-left: .5rem; 
}
.playimg{
    width: 10.7143rem;
   
   margin: 1.4286rem auto 0;
}
.playimg img{
    width: 100%;
    margin-top: 70%;
}
.lyrics{
    height: 11rem;
    margin-top: 1rem;
    overflow: hidden;
    text-align: center;
    color: #ffffff;
    font-size: .9rem;
    line-height: 2
}
.s, .leng{
    width: 12.5%;
    float: left;
    text-align: center;
    line-height: 2.3;
    font-size: .9rem
}
.jinduBox{
    width: 75%;
    float: left;
}
.jindu{
    height: 1rem;
    margin-bottom: 5rem;
    width: 100%;
    margin: 0 auto;
}

.playoperate{
    height: 5rem;
    width: max-content;
    margin: 0 auto ;
    line-height: 5rem 
}
.prev{    
    width: 2.3214rem;
    height: 2.4rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
    background: url(http://m.kugou.com/v3/static/images/index/play_prev.png)no-repeat;
    background-size: 100%;
}
.playoperate .playplay{    
    width: 3.2143rem;
    height: 3.2143rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
    background: url(http://m.kugou.com/v3/static/images/index/play_play.png)no-repeat;
    background-size: 100%;
}
.musicplay{
    width: 3.2143rem;
    height: 3.2143rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
    background: url(http://m.kugou.com/v3/static/images/index/play_pause.png)no-repeat;
    background-size: 100%;
}
.next{    
    width: 2.3214rem;
    height: 2.4rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
    background: url(http://m.kugou.com/v3/static/images/index/play_next.png)no-repeat;
    background-size: 100%;
}
</style>

