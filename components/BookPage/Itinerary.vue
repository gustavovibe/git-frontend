<template>
  <div class="itinerary-wrapper">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="itinerary-item"
      :class="{ active: item.highlight }"
    >
      <!-- Icono -->
      <div class="icon">
        <i :class="item.icon"></i>
      </div>

      <!-- Contenido -->
      <div class="content">
        <div class="header">
          <h3 class="title">{{ item.title }}</h3>
          <span class="date">{{ item.date }}</span>
        </div>

        <!-- Detalles -->
        <ul class="details">
          <li v-for="(detail, j) in item.details" :key="j">
            {{ detail.label }}
            <span
              class="status"
              :class="{
                included: detail.status === 'Included',
                not: detail.status === 'Not Included'
              }"
            >
              {{ detail.status }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mensaje inferior -->
    <div class="info-box">
      <i class="pi pi-info-circle mr-2 text-orange-500"></i>
      <span>
        This summary provides an <strong>overview of flights and accommodations</strong>. 
        It does not show other tour inclusions (activities, transportation, meals, etc.)—
        please check the itinerary for those details.
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<style scoped>
.itinerary-wrapper {
  background: #fff;
  border: 1px solid #e7e7ea;
  border-radius: 12px;
  overflow: hidden;
}

/* Cada bloque */
.itinerary-item {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.itinerary-item:last-child {
  border-bottom: none;
}
.itinerary-item.active {
  background: #e9f8e9; /* verde claro de highlight */
}

/* Icono */
.icon {
  flex-shrink: 0;
  color: #6bd36b;
  font-size: 24px;
  margin-right: 16px;
  display: flex;
  align-items: flex-start;
}

/* Contenido */
.content {
  flex: 1;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
}
.title {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
}
.date {
  font-weight: 600;
  font-size: 15px;
  color: #111;
}
.details {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}
.details li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 4px;
}

/* Estado */
.status {
  font-weight: 600;
}
.status.included {
  color: #6bd36b;
}
.status.not {
  color: #f97316;
}

/* Caja info */
.info-box {
  border-top: 2px solid #f97316;
  background: #fff8f2;
  padding: 12px 16px;
  color: #444;
  font-size: 14px;
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: flex-start;
}
.info-box strong {
  font-weight: 700;
}
</style>
