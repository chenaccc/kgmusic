<template>
  <div>
    <div class="new-song-swipe">
      <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in banner" :key="item.id">
              <img :src="item.imgurl" />
          </mt-swipe-item>
      </mt-swipe>
  </div>
    <div class="song-list">
      <mt-cell class='song-cell' :key="item.hash" v-for="item in list" :title="item.filename"  @click.native="bf(item)">
        <i class="dw"><img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt=""></i>
      </mt-cell>
  </div>
</div>
</template>
<script>
  import {getNewSongs} from '@/server'
    export default {
      name :'NewSongs',
      inject:['up'],
      data(){
        return{
          banner:[],
          list:[]
        }
      },
      async created(){
        let {data} = await getNewSongs({laoding:1});
        console.log(data)
        this.banner = data.banner;
        this.list = data.data
      },
      methods:{
        bf(data){
          // console.log(data)
          this.$store.commit('pudateMusicThis', 1)
          this.$store.commit('pudateMusicList', data)
          // // alert(1)
          this.up(true)
        }
      }
    }
</script>
<style scoped>
  .new-song-swipe {
    height: 10rem;
    margin-top: 4.3rem;
  }
  .new-song-swipe img {
    width: 100%;
  }
  .mint-cell{
    height: 4rem;
    min-height: 4rem;
  }
  /* .song-cell .dw{
      width: 1.5rem;
      position: absolute;
      right: 1rem;
  }
  .dw img{
      width: 100%;
  } */
  

  
</style>
