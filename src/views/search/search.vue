<template>
  <div class="ss">
     <div class="top">
          <p>搜索</p>
          <img src="http://m.kugou.com/v3/static/images/index/goback.png" alt="" @click="fh()">  
      </div>
      <div class="search_box">
          <div class="searchForm">
              <span class="search-icon"></span>
              <input type="text" placeholder="歌手/歌名/拼音" name="keyword" value="" id="keyword" class="search-keyword" v-model="find">
              <input type="submit" value="搜索" class="search-btn" id="searchBtn" @click="ssa()">
          </div>
      </div>
      <div class="search-result-hd">
          <p v-if="show">共有{{total}}条结果 </p>
      </div>
    <mt-cell class='song-cell' v-for="item in list" :key="item.hash" :title=item.filename is-link></mt-cell>
  </div>
</template>
<script>
import axios from 'axios'
// import {search} from '@/server'
    export default {
        name: 'Search',
        data(){
            return{
             find:'',
             list: [],
             total: '',
             show:false,
            }
        },
        
  
         methods:{
             fh(){
                 this.$router.go(-1)
            },
            ssa(){
                 if(!this.find){
                        alert(不能为空)
                    } else {
                        axios(`/search/api/v3/search/song?format=json&keyword=${this.find}&page=1&pagesize=30&showtype=1&callback=kgJSONP701373522`).then(({data}) => {
                    // console.log(data.data.total)
                    this.total =data.data.total
                    this.list = data.data.info;
                    // console.log(this.list)
                    this.show = true
                })
                    }
                
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
.ss{
  margin-top: 4.5rem;
}
.search_box{
   padding: .7143rem;
       background: #fbfbfb;

}
.searchForm{
    position: relative;
}
.search-icon{
    width: 1.2143rem;
    height: 1.9285rem;
    display: block;
    position: absolute;
    top: 1px;
    left: .3714rem;
    background: url(http://m.kugou.com/v3/static/images/index/search_icon.png) no-repeat;
    background-size: 100%;
}
.search-keyword{
    width: 75%;
    padding: .4rem .0714rem .4rem 1.7rem;
    margin-right: 3%;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    font-size: 1rem;
    background: #ffffff;
}
.search-btn{
        width: 17.25%;
    height: 2.0714rem;
    line-height: 2.0714rem;
    border: none;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    font-size: 1rem;
    text-align: center;
    color: #959595;
    background: #e5e5e5;
}
.search-result-hd{
    height: 1.5714rem;
    line-height: 1.5714rem;
    background: #e6e6e6;
    padding-left: .9rem;
    font-size: .7857rem;
    color: #5d5d5d;
}

</style>
