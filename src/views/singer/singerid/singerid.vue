<template>
  <div>
      <div class="top">
          <p>{{classname}}</p>
          <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="" @click="fh()">
          
      </div>
     
    <mt-cell class="song-cell" :key="item.id" v-for="item in listFn" :title="item.singername" is-link @click.native="cf(item)">
        <img class="ran-img" slot="icon" :src="item.imgurl" width="48" height="48">
  </mt-cell>
  </div>
</template>
<script>
import {getSingerList} from '@/server'
    export default {
        name: '',
        data(){
            return{
                list:[],
                imgurl:[],
                singername:[],
                classname:''
            }
        },
        async created(){
            console.log(localStorage.getItem("songer"))
            let{data}  = await getSingerList(); 
            // console.log(data)
            this.list= data.data.singers.list.info;
            // this.list = data.data;
            this.imgurl = data.imgurl;
            this.classname = data.data.classname
        
           
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
            fh(){
                 this.$router.go(-1)
            },
            cf(data){
                console.log(data)
                localStorage.setItem("temp",data.singerid)
                // console.log(localStorage.getItem('temp'))
                this.$router.push('/singerinfo')
            }
        }
    }
</script>
<style scoped>
.top{
    z-index: 99;
    height: 3rem;
    width: 100%;
    background: black;
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
.mint-cell{
    height: 4rem;
    min-height: 4rem;
}
div{
    margin-top: 4.5rem;
}
</style>
