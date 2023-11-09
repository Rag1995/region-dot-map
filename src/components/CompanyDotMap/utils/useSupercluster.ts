
import Supercluster from 'supercluster'
import { MaybeRef } from '@vueuse/core'
import { BBox, GeoJsonObject } from 'geojson'

export const useSupercluster = (
  points: MaybeRef<GeoJsonObject[]>,
  zoom: MaybeRef<number>,
  bounds: MaybeRef<BBox>,
  options?: MaybeRef<Supercluster.Options<any, any>>,
) => {
  const supercluster = ref<Supercluster>()

  const init = () => {
    supercluster.value = new Supercluster(unref(options))
    supercluster.value.load(unref(points) as Supercluster.PointFeature<Supercluster.AnyProps>[])
  }

  const clusters = computed(() => {
    if(!supercluster.value) return []
    return supercluster.value.getClusters(unref(bounds), unref(zoom))
  })

  watchEffect(() => {
    init()
  })

  return { clusters }
}