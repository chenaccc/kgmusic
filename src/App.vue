<template>
  <div id="app">
    <mt-header fixed class="kugou-header">
        <router-link class="logo" to="/" slot="left">
            <img src="http://m.kugou.com/v3/static/images/index/logo.png" />
        </router-link>
        <mt-button @click="gotoSearch" icon="search" slot="right"></mt-button>
    </mt-header>
    <router-view class="navbar" name="navBar"></router-view>
    
    <div class="content">
        <mt-spinner type="triple-bounce" v-show="$store.state.isLoading"></mt-spinner>
        <router-view></router-view>
    </div>
    <!-- <div class="bf" v-if="bft"  @update = 'update'>
        <a href="javascript:" @click="jinru">
            <div class="tp"><img :src="this.$store.state.songName.imgUrl" alt=""></div>
            <div class="wz">
                <p>{{$store.state.songName.songName}}</p>
                <p>{{$store.state.songName.singerName}}</p>
            </div>
        </a>
        <div class="btn">
            <i class="zt"></i>
            <i class="next"></i>
            <i class="xz"></i>
        </div>
    </div> -->
    <div><bf v-show="bft" @updatemusicoff = "updatemusicoff"></bf></div>
    <div class="music" v-show="musicoff"><musicc @updatemusicoff = "updatemusicoff"></musicc></div>
  </div>
</template>
<script>
import bf from './views/bf'
import musicc from './views/musicc'
export default {
  name: 'App',
  data(){
        return{
            bft:false,
            musicoff: false
        }
  },
  components: {
      musicc,
      bf
  },
  methods: {
      gotoSearch(){
          this.$router.push('/search')
      },
      up(data){
          this.bft = data
      },
      updatemusicoff(data){
          this.musicoff = data
      },
  },
  provide(){
        return{
            up : this.up
        }
      },
  created(){
      console.log(this)
  }
}
</script>
<style>
.music{
    position: fixed;
    z-index: 99;
    top: 1.9rem;
    width: 100%;
    /* height: 30rem */
    height: 100%;
}
.music .play{
    display: block
}

  body {
     margin: 0;
  }
  .logo img{
      width: 100%;
      display: inline-block;
      vertical-align: middle;
  }
  .kugou-header {
    height: 3.5rem;
    line-height: 3.5rem;
  }
  #app .navbar {
    top: 1.4rem;
  }
  .content {
    padding-top: 2rem;
  }
  /* .bf{
      height: 4.2rem;
      width: 100%;
      position: fixed;
      bottom: 0;
      background: rgba(0,0,0,.9);
      color: #fff;
      font-size: 0;
  }
  .bf a{
      display: block;
      width: 65%;
      height: 100%;
      
  }
  .tp{
    width: 3.75rem;
    height: 3.75rem;
    margin: .2143rem .535rem .2143rem .2143rem;
    float: left;
  }
  .tp img{
      width: 100%;
  }
  .wz{
      width: 65%;
    display: inline-block;
    vertical-align: middle;
  }
  .wz p{
    width: 100%;
    line-height: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .8571rem;
    color: #fff;
  }
  .btn{
    position: absolute;
    top: 1.0714rem;
    right: .7143rem;
    width: 35%;
    height: 100%;
  }
  .btn i{
    width: 1.786rem;
    height: 1.786rem;
    margin-left: .9rem;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  .zt{
      background: url(http://m.kugou.com/v3/static/images/index/play_icon.png) no-repeat;
      background-size: 100%;
  }
    .next{
      background: url(http://m.kugou.com/v3/static/images/index/next_icon.png) no-repeat;
      background-size: 100%;
  }
    .xz{
      background: url(http://m.kugou.com/v3/static/images/index/download_icon.png) no-repeat;
      background-size: 100%;
  }
      .song-cell .dw{
      width: 1.3rem;
      position: absolute;
      right: 1rem;
  }
  .dw img{
      width: 100%;
  }

  .yd-badge-danger{
    position: absolute;
    left: .5rem;
 } */

  /* .song-cell .plist-img {
      display: inline-block;
  }
  .song-cell .mint-cell-text {
    max-width: 80%;
    display: inline-block;  
  }
  .song-cell .mint-cell-label {
      display: inline-block;
  }

  .song-cell .mint-cell-value {
      position: absolute;
      left: 2.3rem;
      top: 1.5rem;
  }

  .mint-spinner-triple-bounce {
      text-align: center;
  } */

  
</style>
