import Vue from 'vue'
import Router from 'vue-router'

import NewSong from '@/views/new-song/new-song'

import Rank from '@/views/rank/rank'
import Rankinfo from '@/views/rank/rankinfo'

import Plistlist from '@/views/plist/plistlist'

import Test from '@/views/test/test'


import Seach from '@/views/search/search'
import Singerid from '@/views/singer/singerid/singerid'
import Singerinfo from '@/views/singer/singerid/singerinfo'

// import Details from '@/views/details'


// import NavBar from '@/components/nav-bar/index'
// import SeachBar from '@/components/seachBar'

import {routes} from './routes'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [

      ...routes,
      {
        path: '/test',
        name: 'Test',
        component:Test
      },
    {
      path: '/search',
      name: 'Search',
      components:{
        //nav:SeachBar,
        default:Seach
      } 
    }, 
     {
      path: '/singerid',
      name: 'Singerid',
      components:{
        //nav:SeachBar,
        default:Singerid
      } 
    },
    {
      path: '/singerinfo',
      name: 'Singerinfo',
      components:{
        //nav:SeachBar,
        default:Singerinfo
      } 
    },
    {
      path: '/rankinfo',
      name: 'Rankinfo',
      components:{
        //nav:SeachBar,
        default:Rankinfo
      } 
    },
    {
      path: '/plistlist',
      name: ' Plistlist',
      components:{
        //nav:SeachBar,
        default:Plistlist
      } 
    },
    // {
    //   path: '/details',
    //   name: ' details',
    //   components:{
    //     //nav:SeachBar,
    //     default:Details
    //   } 
    // }
  ]
})
