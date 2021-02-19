<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" />

    <ul>
      <li>还好1</li>
      <li>还好2</li>
      <li>还好3</li>
      <li>还好4</li>
      <li>还好5</li>
      <li>还好6</li>
      <li>还好7</li>
      <li>还好8</li>
      <li>还好9</li>
      <li>还好10</li>
      <li>还好11</li>
      <li>还好12</li>
      <li>还好13</li>
      <li>还好14</li>
      <li>还好15</li>
      <li>还好16</li>
      <li>还好17</li>
      <li>还好18</li>
      <li>还好19</li>
      <li>还好20</li>
      <li>还好21</li>
      <li>还好22</li>
      <li>还好23</li>
      <li>还好24</li>
      <li>还好25</li>
      <li>还好26</li>
      <li>还好27</li>
      <li>还好28</li>
      <li>还好29</li>
      <li>还好30</li>
      <li>还好31</li>
      <li>还好32</li>
      <li>还好33</li>
      <li>还好34</li>
      <li>还好35</li>
      <li>还好36</li>
      <li>还好37</li>
      <li>还好38</li>
      <li>还好39</li>
      <li>还好40</li>
      <li>还好41</li>
      <li>还好42</li>
      <li>还好43</li>
      <li>还好44</li>
      <li>还好45</li>
      <li>还好46</li>
      <li>还好47</li>
      <li>还好48</li>
      <li>还好49</li>
      <li>还好50</li>
    </ul>

  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {getHomeMultidata} from "network/home";


export default {
  name: "Home",
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar
  },
  created() {
    // 请求多个数据
    getHomeMultidata()
      .then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>
