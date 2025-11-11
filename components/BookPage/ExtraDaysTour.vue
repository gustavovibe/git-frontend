<template>
  <div class="tour-list-wrapper" role="list" style="width: 100%;">
    <div
      v-for="(item, idx) in localItems"
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
          :disabled="item.quantity <= (item.min ?? 0)"
          aria-label="restar"
          @click="changeQuantity(item, item.quantity - (item.step ?? 1))"
        >
          <i class="pi pi-minus" aria-hidden="true"></i>
        </Button>

        <div class="count" :aria-label="`cantidad ${item.title}`">{{ item.quantity }}</div>

        <Button
          type="button"
          class="icon-btn"
          :disabled="item.quantity >= (item.max ?? Infinity)"
          aria-label="sumar"
          @click="changeQuantity(item, item.quantity + (item.step ?? 1))"
        >
          <i class="pi pi-plus" aria-hidden="true"></i>
        </Button>
      </div>
      <br>
    </div>
  </div>
</template>

<script setup>
/*
  Uso:
    <TourList v-model="items" />
  Cada item (ejemplo):
  {
    id: 1,
    title: 'Pre-Tour Nights',
    location: 'Istanbul, Turkey',
    image: 'https://...',
    alt: 'Hagia Sophia',
    caption: 'Opcional',
    quantity: 1,
    min: 0,
    max: 10,
    step: 1
  }
*/

import { ref, watch } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  // color y placeholder opcionales
  accentColor: { type: String, default: '#8fd86d' },
  placeholder: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'change'])

// Copia local para evitar mutar la prop directamente
const localItems = ref(props.modelValue.map(i => ({ ...i })))

watch(
  () => props.modelValue,
  (v) => {
    localItems.value = v.map(i => ({ ...i }))
  },
  { deep: true }
)

function changeQuantity(item, rawValue) {
  const min = item.min ?? 0
  const max = item.max ?? Infinity
  const step = item.step ?? 1

  // Asegurar múltiplos del step y límites
  let value = Math.round(rawValue / step) * step
  if (value < min) value = min
  if (value > max) value = max

  // Actualizar localItems y emitir cambio
  localItems.value = localItems.value.map((it) =>
    it.id === item.id ? { ...it, quantity: value } : it
  )

  emit('update:modelValue', localItems.value.map(i => ({ ...i })))
  emit('change', { id: item.id, quantity: value })
}

function onImgError(e) {
  e.target.src = placeholderDataUri
}

/* Data URI sencillo (SVG) para placeholder si no se proporciona imagen */
const placeholderDataUri =
  props.placeholder ||
  'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><rect fill='#f3f4f6' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#cbd5e1' font-family='Arial' font-size='14'>No image</text></svg>`
    )
</script>

<style scoped>
:root {
  --card-border: #e7e7ea;
  --bg: #ffffff;
  --accent: #8fd86d; /* se puede sobreescribir pasando prop accentColor y aplicar dinámicamente si quieres */
}

/* Contenedor general (imita card con bordes redondeados) */
.tour-list-wrapper {
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.02);
}

/* Cada fila/tour */
.tour-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  min-height: 88px;
}

/* Imagen izquierda */
.thumb {
  width: 136px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  background: #f3f4f6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

/* Info central */
.info {
  flex: 1;
  min-width: 0; /* para truncar texto si hace falta */
}
.title-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.title {
  margin: 0;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location {
  color: var(--accent);
}

/* Texto menor opcional */
.caption {
  margin: 6px 0 0;
  color: #6b7280;
}

/* Controles (derecha) */
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
  flex-shrink: 0;
}

/* Botones circulares estilo "ghost" gris */
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

/* Si usas PrimeVue Button con clases, se aplica este estilo también */
.icon-btn .pi {
  font-size: 1.05rem;
  color: #111827;
}

/* Contador en medio */
.count {
  text-align: center;
}

/* Divider entre items */
.divider {
  border: none;
  border-top: 1px solid var(--card-border);
  margin: 6px 0 6px 0;
}

/* Respuesta móvil */
@media (max-width: 640px) {
  .tour-item { gap: 12px; padding: 12px 0; }
  .thumb { width: 96px; height: 64px; }
  .icon-btn { width: 36px; height: 36px; }
}
</style>
