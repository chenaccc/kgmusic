<template>
<div class="rank">
  <mt-cell class="song-cell" :key="item.list" v-for="item in listFn" :title="item.rankname" is-link @click.native="show(item)">
        <img class="ran-img" slot="icon" :src="item.imgurl" width="48" height="48">
  </mt-cell>
</div>
</template>
<script>
 import {getRankList} from '@/server'
    export default {
        name: 'Rank',
       data(){
         return{
          imgurl:[],
          list:[]
         }
       },
       async created(){
         let {data} = await getRankList();
         console.log(data)
         this.imgurl = data.imgurl;
         this.list = data.data;
       },
       computed: {
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
            localStorage.setItem("temp",data.rankid)
            console.log(localStorage.getItem('temp'))
            this.$router.push('/rankinfo')
          }
       }
    }
   

</script>
<style scoped>
  .ran-img {
    width: 6rem;
    height: 6rem;
    margin-right: 15px;
  }
  .rank-cell {
    padding: 5px 0;

  }
  .song-cell {
    padding: 0.2rem 0;
     
  }
  .rank{
    margin-top: 4.5rem;
  }
  .song-cell{
    min-height: 7rem;
  }
  .mint-cell .song-cell{
    font-size: 20px;
  }
</style>