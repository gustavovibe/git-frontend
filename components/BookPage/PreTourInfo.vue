<template>
  <Accordion :activeIndex="isMobile ? null : 0">
    <AccordionTab>
      <template #header>
        <div class="flex align-items-center" style="padding-top: 40px;">
          <span class="green-dot-sm mr-2"></span>
          <span class="daily_itinerary_title">Pre/post-tour accommodations</span>
        </div>
      </template>
      <div class="flex justify-content-center mt-5">
        <span>
          To ensure smooth logistics, extra nights (<b>not included</b> but bookable after your booking with us) are added between your flights and the first/last tour days. By default, packages include 1 pre-tour night (arrival the day before Day 1) and 1 post-tour night (departure the day after the last day). You can adjust this for more flexibility (which may affect the package price) or to change your stay length. Choosing 0 pre-tour nights requires flights arriving by 6 AM on Day 1; 0 post-tour nights requires departures after 9 PM on the last day or next day—both limit flight options.
          <br /><br />
          <b>Note:</b> Accommodations listed in the tour description are subject to change by the operator. The final day-to-day itinerary with accommodations is usually shared in the trip notes about 2 weeks before departure.
        </span>
      </div>

      <!-- START: Inlined ExtraDaysTour -->
      <div class="custom_gray_box py-2 mt-2">
        <div class="mx-2 flex align-items-center">
          <div class="tour-list-wrapper" role="list" style="width: 100%;">
            <div
              v-for="(item, idx) in items"
              :key="item.id ?? idx"
              class="tour-item"
              role="listitem"
            >
              <img
                :src="item.image || placeholderDataUri"
                :alt="item.alt || item.title || 'img'"
                class="thumb"
                @error="onImgError"
              />

              <div class="info">
                <div class="title-row">
                  <span class="title font-semibold">{{ item.title }}</span>
                  <span class="location">In <span class="text-green-vibe font-semibold">{{ item.location }}</span></span>
                </div>
                <p v-if="item.caption" class="caption">{{ item.caption }}</p>
              </div>

              <div class="controls" aria-live="polite">
                <Button
                  type="button"
                  class="icon-btn"
                  aria-label="restar"
                  :disabled="item.quantity <= (item.min ?? props.quantityRange.min ?? 0)"
                  @click="changeQuantity(item, item.quantity - (item.step ?? 1))"
                >
                  <i class="pi pi-minus" aria-hidden="true"></i>
                </Button>

                <div class="count" :aria-label="`cantidad ${item.title}`">{{ item.quantity }}</div>

                <Button
                  type="button"
                  class="icon-btn"
                  aria-label="sumar"
                  :disabled="item.quantity >= (item.max ?? props.quantityRange.max ?? 0)"
                  @click="changeQuantity(item, item.quantity + (item.step ?? 1))"
                >
                  <i class="pi pi-plus" aria-hidden="true"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Inlined ExtraDaysTour -->

      <div class="py-2 mt-2">
        <div class="flex justify-content-center gap-2">
          <div class="mx-2 flex align-items-center">
            <SunIcon />
            <span class="mx-2 font-bold">{{ tour?.tourLengthDays + 2 }}</span>
            <span>days including flights</span>
          </div>
          <div class="mx-2 flex align-items-center">
            <HikingIcon />
            <span class="mx-2 font-bold">{{ tour?.tourLengthDays }}</span>
            <span>days in destination on the adventure</span>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex align-items-center">
          <Itinerary :items="itinerary" />
        </div>
      </div>

    </AccordionTab>
  </Accordion>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Itinerary from './Itinerary.vue'
import dayjs from 'dayjs'

const props = defineProps({
  tour: Object,
  duffelSelected: Object,
  flightSelected: Object,
  // <-- accept quantityRange
  quantityRange: { type: Object, default: () => ({ min: 1, max: 10 }) }
});
const emit = defineEmits(['update:modelValue', 'change']);
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile);
})

/* helper clamp */
const clamp = (v, min = 1, max = Infinity) => {
  const n = Number(v)
  if (Number.isNaN(n)) return min
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

/* helper to format a day string */
function dayFormatted(input) {
  if (!input) return '-'
  return dayjs(input, 'DD/MM/YYYY').format('MMM D, YYYY')
}

/* departure / arrival from selected flights (duffelSelected) */
const departureDateFromFirstSelectedFlightComputed = computed(() => {
  const departure = props.duffelSelected?.slices?.at(0)?.segments?.at(0)?.departing_at
  if (departure) {
    const departureDate = dayjs(departure)
    return departureDate.format('DD/MM/YYYY')
  }
  return '-'
})

const arrivalDateFromLastSelectedFlightComputed = computed(() => {
  const arrival = props.duffelSelected?.slices?.at(-1)?.segments?.at(-1)?.arriving_at
  if (arrival) {
    const arrivalDate = dayjs(arrival)
    return arrivalDate.format('DD/MM/YYYY')
  }
  return '-'
})

const tourDatesComputed = computed(() => {
  const date = props.tour?.departure?.date
  if (!date) return '-'
  const departureDate = dayFormatted(dayjs(date))
  const endDate = dayFormatted(dayjs(date).add(props.tour.tourLengthDays, 'days'))
  return `${departureDate} - ${endDate}`
})

/* itinerary computed (keeps in sync with deps) */
const itinerary = computed(() => [
  {
    title: 'Travel to Destination',
    icon: 'pi pi-send',
    date: dayFormatted(departureDateFromFirstSelectedFlightComputed.value),
    details: [
      { label: 'Flights', status: 'Included' },
      { label: 'Accommodation', status: 'Not Included' }
    ]
  },
  {
    title: `Tour (Days 1-${props.tour?.tourLengthDays ?? '?'})`,
    icon: 'pi pi-map',
    date: tourDatesComputed.value,
    highlight: true,
    details: [{ label: 'Accommodations', status: 'Included' }]
  },
  {
    title: 'Return Travel',
    icon: 'pi pi-send',
    date: dayFormatted(arrivalDateFromLastSelectedFlightComputed.value),
    details: [
      { label: 'Flights', status: 'Included' },
      { label: 'Accommodation', status: 'Not Included' }
    ]
  }
])

/* start / end city strings */
const startCity = computed(() => {
  const startCity = props.tour?.start_city?.city_name ?? ''
  const countryCode = props.tour?.start_city?.country_code ?? ''
  return `${startCity}, ${countryCode}`
})

const endCity = computed(() => {
  const endCity = props.tour?.end_city?.city_name ?? ''
  const countryCode = props.tour?.end_city?.country_code ?? ''
  return `${endCity}, ${countryCode}`
})

/*
  items must be writable because we inlined the ExtraDaysTour v-model.
  Initialize itemsRef from the parent modelValue if provided, otherwise from the tour.
*/
const items = ref(
  Array.isArray(props.modelValue) && props.modelValue.length
    ? props.modelValue.map(i => ({ ...i }))
    : [
        {
          id: 1,
          title: 'Pre-Tour Nights',
          location: startCity.value,
          image: props.tour?.images?.at(0) ?? null,
          quantity: 1,
          min: props.quantityRange?.min ?? 1,
          max: props.quantityRange?.max ?? 10,
          step: 1
        },
        {
          id: 2,
          title: 'Post-Tour Nights',
          location: endCity.value,
          image: props.tour?.images?.at(-1) ?? null,
          quantity: 1,                      // <-- add quantity
          min: props.quantityRange?.min ?? 1, // <-- don't re-declare min/max later
          max: props.quantityRange?.max ?? 10,
          step: 1
        }
      ]
)

watch(
  () => props.quantityRange,
  (newRange) => {
	console.log("props.quantityRange",props.quantityRange);  
    const min = newRange?.min ?? 1
    const max = newRange?.max ?? 10
    let changed = false

    items.value = items.value.map(it => {
      // if item explicitly declares min/max, respect it; otherwise use global
      const itemMin = it.min ?? min
      const itemMax = it.max ?? max
      const clampedQ = clamp(it.quantity ?? 0, itemMin, itemMax)
      if (clampedQ !== it.quantity || itemMin !== it.min || itemMax !== it.max) changed = true
      return { ...it, min: itemMin, max: itemMax, quantity: clampedQ }
    })

    if (changed) {
      // notify parent of updated items (clamped)
      emit('update:modelValue', items.value.map(i => ({ ...i })))
    }
  },
  { immediate: true, deep: true }
);

// Keep items in sync when parent passes a new modelValue
watch(
  () => props.modelValue,
  (v) => {
    if (Array.isArray(v) && v.length) {
      items.value = v.map(i => ({ ...i }))
    }
  },
  { deep: true }
)

// Keep locations/images updated when tour changes (without overwriting user quantities)
watch(
  () => [props.tour?.start_city, props.tour?.end_city, props.tour?.images],
  () => {
    items.value = items.value.map((it) => {
      if (it.id === 1) {
        return {
          ...it,
          location: startCity.value,
          image: props.tour?.images?.at(0) ?? it.image
        }
      }
      if (it.id === 2) {
        return {
          ...it,
          location: endCity.value,
          image: props.tour?.images?.at(-1) ?? it.image
        }
      }
      return it
    })
    // notify parent that items location/image may have changed
    emit('update:modelValue', items.value.map(i => ({ ...i })))
  }
)

/* changeQuantity copied from the original child but now operates on `items` ref */
function changeQuantity(item, rawValue) {
  const min = item.min ?? props.quantityRange?.min ?? 1
  const max = item.max ?? props.quantityRange?.max ?? 10
  const step = item.step ?? 1

  let value = Math.round(rawValue / step) * step
  value = clamp(value, min, max)

  items.value = items.value.map(it => it.id === item.id ? { ...it, quantity: value } : it)

  emit('update:modelValue', items.value.map(i => ({ ...i })))
  emit('change', { id: item.id, quantity: value })
}

function onImgError(e) {
  e.target.src = placeholderDataUri
}

/* Data URI sencillo (SVG) para placeholder si no se proporciona imagen */
const placeholderDataUri =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><rect fill='#f3f4f6' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#cbd5e1' font-family='Arial' font-size='14'>No image</text></svg>`
  )
</script>

<style scoped>
/* Parent styles */
.red { background-color: red; }

.daily_itinerary_title {
  color: #333;
  font-family: Canaro;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  line-height: 30px;
  position: relative;
}
.daily_itinerary_title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  background-color: #333;
}

/* child (ExtraDaysTour) styles merged */
:root {
  --card-border: #e7e7ea;
  --bg: #ffffff;
  --accent: #8fd86d;
}
.custom_gray_box {
  border-radius: 10px;
  border: 1px solid #E0E0E0;
}
.tour-list-wrapper {
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.02);
}
.tour-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  min-height: 88px;
}
.thumb {
  width: 136px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  background: #f3f4f6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}
.info { flex: 1; min-width: 0; }
.title-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.title { margin: 0; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.location { color: var(--accent); }
.caption { margin: 6px 0 0; color: #6b7280; }
.controls { display: flex; align-items: center; gap: 12px; margin-left: 12px; flex-shrink: 0; }
.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: none;
  box-shadow: none;
}
.icon-btn .pi { font-size: 1.05rem; color: #111827; }
.count { text-align: center; }

/* keep other parent styles */
.custom_border { border: 1px solid #9CA3AF; }
.background_green { background: rgba(130, 207, 69, 0.10); }
.custom_footer { border-radius: 5px; background: rgba(130, 207, 69, 0.10); }
.this_calendar_is {
  color: #696969; font-family: Canaro; font-size: 14px; font-style: normal; font-weight: 300; line-height: 20px;
}

/* responsive */
@media (max-width: 640px) {
  .tour-item { gap: 12px; padding: 12px 0; }
  .thumb { width: 96px; height: 64px; }
  .icon-btn { width: 36px; height: 36px; }
}
@media (max-width: 768px) {
  .acc-header { font-size: 11px; line-height: 1.3; word-break: break-word; padding: 8px 2px; }
  .table-header-row { min-width: 100%; }
  .responsive-table-container { -webkit-overflow-scrolling: touch; }
  .flex > .col-2, .flex > .col-3, .flex > .col-4 { padding: 8px 2px; }
  .flex.align-items-center.justify-content-center svg { transform: scale(0.8); }
}
</style>
