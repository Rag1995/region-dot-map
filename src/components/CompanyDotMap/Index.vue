<script setup lang="ts">
import { LCircleMarker, LControl } from '@vue-leaflet/vue-leaflet'
import { GeoJsonObject } from 'geojson'
import { LatLngExpression, PointExpression } from 'leaflet'
import { DataRow } from './types'
import { colorMix, useSupercluster } from './utils'


const props = withDefaults(defineProps<{
  zoom?: number
  center?: PointExpression
  mapTitle?: string
  legendTitle?: string
  color?: string
  data?: DataRow[]
}>(), {
  zoom: 8,
  center: () => [23.83012792456308, 120.92954073665844],
  mapTitle: '',
  legendTitle: '',
  color: '#059669',
  data: () => ([]),
})

const _zoom = ref(props.zoom)

// 色標
const colorScaleWeight = ref([0.4, 0.55, 0.7, 0.85, 1])
const colorScaleCount = computed(() => colorScaleWeight.value.length)
const colorScale = computed(() => {
  return colorScaleWeight.value.map(weight => {
    return colorMix(props.color, '#fafafa', weight)
  })
})


const geojson = computed(() => {
  return props.data.map((row) => {
    const { xValueN = '0', yValueN = '0', ...properties } = row

    return {
      type: 'Feature',
      properties: {
        amount: 1,
        ...properties,
      },
      geometry: {
        type: 'Point',
        coordinates: [Number(xValueN), Number(yValueN)],
      },
    }
  }) as GeoJsonObject[]
})
const { clusters } = useSupercluster(geojson, _zoom, [-180, -90, 180, 90], {
  radius: 150,
  reduce(acc, cur) {
    acc.amount += cur.amount
  },
})

const minAmount = ref(0)
const maxAmount = computed(() => {
  return Math.max(...clusters.value.map(({ properties: { amount } }) => amount))
})
const markers = computed(() => {
  return clusters.value.map(({ id, properties, geometry }) => {
    const [lng, lat] = geometry.coordinates

    return {
      id: Symbol(id),
      latLng: [lat, lng] as LatLngExpression,
      properties,
    }
  }) ?? []
})

const calcRadius = (amount: number) => {
  const maxRadius = 50
  const minRadius = 8
  const diff = maxAmount.value - minAmount.value
  if(!(diff > 0)) return maxRadius
  return minRadius + Math.ceil(amount / diff * (maxRadius - minRadius))
}
const getColor = (amount: number) => {
  const diff = maxAmount.value - minAmount.value
  if(!(diff > 0)) return colorScale.value.slice(-1)[0]
  const index = Math.min(Math.floor(amount / diff * colorScaleCount.value), colorScaleCount.value - 1)
  return colorScale.value[index]
}

</script>

<template>
  <BaseMap
    v-model:zoom="_zoom"
    :center="center"
  >
    <LCircleMarker
      v-for="{ id, latLng, properties: { amount } } in markers"
      :key="id"
      :lat-lng="latLng"
      :radius="calcRadius(amount)"
      :color="getColor(amount)"
      :opacity="0.8"
      :fill-opacity="0.7"
      :weight="2"
    />

    <!-- 地圖標題 -->
    <LControl position="topleft">
      <h2 class="map-title">
        {{ mapTitle }}
      </h2>
    </LControl>

    <!-- 圖例色標 -->
    <LControl
      position="bottomleft"
      class="legend"
    >
      <div class="legend-title">
        {{ legendTitle }}
      </div>

      <div class="color-scale">
        <div v-thousands-separator="minAmount" />
        <div class="color-scale-bar">
          <div
            v-for="i in colorScale"
            :key="i"
            :style="{ background: i }"
          />
        </div>
        <div v-thousands-separator="maxAmount" />
      </div>
    </LControl>
  </BaseMap>
</template>

<style lang="scss" scoped>
.map-title {
  user-select: none;
  margin: 0;
  font-weight: bolder;
  color: #0a0a0a;
}

.legend {
  user-select: none;

  &-title {
    margin-bottom: .25rem;
    color: #4b5563;
    text-align: left;
  }

  .color-scale {
    display: flex;
    gap: .25rem;
    align-items: center;
    justify-content: flex-start;

    font-weight: bolder;
    color: #0a0a0a;

    &-bar {
      display: flex;
      align-items: stretch;
      width: 6em;
      height: 1.2em;

      div { flex-grow: 1;}
    }
  }
}

</style>