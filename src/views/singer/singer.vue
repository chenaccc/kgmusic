<template>
  <div class="singer">
    <mt-cell class='song-cell singer-song-cell' v-for="item in list" @click.native='show(item)' :key="item.list" :title="item.classname"></mt-cell>
    <router-view class="singerid"></router-view>
  </div>
</template>
<script>
import {getSingers} from '@/server'
    export default {
        name: 'Singer',
        data(){
          return{
            list:[],
            classname:[],
          }
        },
       
        async created(){
          let{data} = await getSingers();
          // console.log(data)
          this.list = data.data.list;
          // this.list = data.data
          this.classname = data.classname
        },
         methods:{
          show (data) {
            // alert(1)
            // console.log(data)
            localStorage.setItem("songer",data.classid)
            console.log(localStorage.getItem('songer'))
            this.$router.push('/singerid')
          }
        },
    }
</script>
<style scoped>
  .singer-song-cell {
    border: 1px solid #e5e5e5;
    margin: .3rem;
  }
  .singer{
    margin-top: 4.5rem;
  }
</style>