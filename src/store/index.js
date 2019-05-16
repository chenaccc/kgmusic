import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state:{
    isLoading: true,
    songName: {},
    // 音乐播放列表
    songList: [],
    musicThis: -1,
    isshow : false
  },
  mutations: {
    updatedIsLoading(state,loading){
      state.isLoading = loading;
    },
    // 添加歌曲
    pudateMusicList (state, data) {
      state.songList.splice(state.musicThis, 0, data)
      console.log(state.songList)
    },
    pudateMusicThis (state, data) {
      state.musicThis += data
    }
  }
})

export default store;