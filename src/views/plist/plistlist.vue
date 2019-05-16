<template>
  <div class="exj">
    <div class="top">
        <p>{{specialname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="" @click="fh()">
    </div>
    <div class="ph" :style="{backgroundImage: 'url(' + img + ')' }">
      </div>
        <div class="jj" @click="toggle"  :class="{'taller':isChoose}">
            <p>{{intro}}</p>
            <span class="zk" :class="{'sh':isChoose}"></span>
        </div>
    <mt-cell class='song-cell' v-for="item in list" :key="item.hash" :title="item.filename"  is-link >
        <i class="dw"><img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt=""></i>
    </mt-cell>
  </div>
</template>
<script>
import {getPlistid} from '@/server'
    export default {
        name: '',
        data(){
            return{
            list:[],
            filename:[],
            img:'',
            specialname:'',
            isChoose: false,
            intro:''
            }
        },
        async created(){
            console.log(localStorage.getItem("temp"));
            let {data} = await getPlistid();
            console.log(data);
            this.list= data.data.list.list.info
            this.filename = data.data.filename;
            this.imgurl = data.data.info.list.imgurl;
            this.img = this.imgurl.split('{size}')[0] + '400' + this.imgurl.split('{size}')[1];
            this.specialname = data.data.info.list.specialname;
            // console.log(this.specialname)
            this.intro = data.data.info.list.intro
            console.log(this.intro)
            
        },
        methods:{
             fh(){
                 this.$router.go(-1)
            },
             toggle (index) {
             this.isChoose = !this.isChoose
            }
        }
    }
</script>
<style scoped>
.top{
    z-index: 99;
    height: 3rem;
    width: 100%;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    top: 1.5rem;
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
.ph{
    height: 15rem;
    width: 100%;
    margin-top: 1rem;
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: 100% auto;
}
.mint-cell{
    height: 4rem;
    min-height: 4rem;
}
.jj{
    height:1.8rem ;
    width: 100%;
    background: #ffffff;
    position: relative;
    padding: 0 1.8rem 0 .7rem;
}
.jj p {
/* display: inline; */
font-size: 1.2rem
}
.jj span{
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: .5rem;
    top: .2rem
}
 .exj .taller{
    height: 100%;
}
.zk{
    background:url(http://m.kugou.com/v3/static/images/index/close_icon.png) no-repeat;
    background-position: center center;
    background-size: 100% auto;
}
.exj .sh{
    
    background:url(http://m.kugou.com/v3/static/images/index/open_icon.png) no-repeat;
    background-position: center center;
    background-size: 100% auto;

}
</style>
