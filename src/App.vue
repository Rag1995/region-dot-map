<script setup lang="ts">
import _data from '@/assets/json/雲市集A區地圖資料.json'
import _mainMapData from '@/assets/json/response_1699418450408.json'
import _sumMapData from '@/assets/json/response_1699418973152.json'
import { PointExpression } from 'leaflet'

const data = ref(_data)
const mainMapData = ref(_mainMapData)
const sumMapData = ref(_sumMapData)

const center = ref<PointExpression>([23.83012792456308, 120.92954073665844])

</script>

<template>
  <h1>CompanyDotMap</h1>
  <CompanyDotMap
    :zoom="8"
    :center="center"
    :data="mainMapData.dataList"
    map-title="這邊是地圖標題"
    legend-title="圖例標題"
    color="#b91c1c"
    style="width: 800px; height: 300px; margin-bottom: 2rem;"
  />
  <!-- <CompanyDotMap
    :zoom="8"
    :center="center"
    :data="sumMapData.dataList"
    map-title="這邊是地圖標題"
    legend-title="圖例標題"
    color="#b91c1c"
    style="width: 800px; height: 300px; margin-bottom: 2rem;"
  /> -->

  <h1>RegionDotMap</h1>
  <div class="container">
    <RegionDotMap
      :zoom="6"
      :center="center"
      :data="data"
      map-title="數位轉型補助地圖"
      legend-title="核定補助金額(千元)"
      color="#059669"
      class="example-map"
    />
    <RegionDotMap
      :zoom="6"
      :center="center"
      :data="data"
      map-title="數位轉型家數地圖"
      legend-title="縣市上雲百分比"
      color="#3b82f6"
      style="width: 400px; height: 500px;"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
}

.example-map {
  width: 400px;
  height: 500px;
}

</style>
