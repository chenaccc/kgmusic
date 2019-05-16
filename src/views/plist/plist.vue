<template>
<div class="plist">
  <mt-cell class="song-cell" v-for="item in listFn" :key="item.list" :title="item.specialname"  is-link  @click.native="show(item)">
    
    <img class="plist-img" slot="icon" :src="item.imgurl" width="24" height="24">
    <div class="nr">
      <i class="icon-music"></i>
      <span>{{item.playcount}}</span>
    </div>
  </mt-cell>
</div>
</template>
<script>
 import {getPlist} from '@/server'
    export default {
        name: 'Plist',
        data(){
          return{
            list:[],
            imgurl:[],
            playcount:[]
          }
        },
         async created(){
           let {data} = await getPlist();
           console.log(data)
           this.list = data.data;
           this.imgurl = data.imgurl;
           this.playcount = data.playcount;
        },
        computed:{
           listFn () {
           let list = this.list
           list.forEach(el => {
             el.imgurl = el.imgurl.split('{size}')[0] + '400' + el.imgurl.split('{size}')[1]
           })          
          return list
         }
       },
        methods:{
          show (data) {
            // alert(1)
            console.log(data)
            localStorage.setItem("temp",data.specialid)
            console.log(localStorage.getItem('temp'))
            this.$router.push('/plistlist')
          }
       }
    }
</script>
<style scoped>
  .plist-img {
    width: 6rem;
    height: 6rem;
     margin-right: 15px;
     float: left;
  }
  .plist-cell {
    padding: 5px 0;

  }
  .song-cell {
    padding: 0.2rem 0;
    min-height: 7rem;
    
  }

  .song-cell .icon-music {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('http://m.kugou.com/v3/static/images/index/icon_music.png') no-repeat;
    background-size: 100%;
  }
  .plist{
    margin-top: 4.5rem
  }
  .nr{
    position: absolute;
    left: 7.5rem;
    bottom: 2rem;
  }


  
</style>