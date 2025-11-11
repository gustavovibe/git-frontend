<script setup>
import ConfirmPopup from "primevue/confirmpopup";
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import { useConfirm } from "primevue/useconfirm";
import Button from 'primevue/button';
import dayjs from 'dayjs';	
 const startOfDay   = date => dayjs(date).startOf('day').toDate();
 const subDays      = (date, amount) => dayjs(date).subtract(amount, 'day').toDate();
 const startOfWeek  = date => dayjs(date).startOf('week').toDate();
 const endOfWeek    = date => dayjs(date).endOf('week').toDate();
 const startOfMonth = date => dayjs(date).startOf('month').toDate();
 const endOfMonth   = date => dayjs(date).endOf('month').toDate();
 const startOfYear  = date => dayjs(date).startOf('year').toDate();
 const endOfYear    = date => dayjs(date).endOf('year').toDate();

const props= defineProps({
	preselectedDates: Array,
  type: String,
});

const emit = defineEmits(['update:datesValue']); // Declaramos el evento

const confirmCalendar = useConfirm();

const dateRange = ref(null)
const datesSelected = ref('');

const today = startOfDay(new Date())

const options = [
  { name: 'All times', code: 0 },
  { name: 'Today', code: 1 },
  { name: 'Yesterday', code: 2 },
  { name: 'Last 7 days', code: 3 },
  { name: 'Last 30 days', code: 4 },
  { name: 'This week', code: 5 },
  { name: 'Last week', code: 6 },
  { name: 'This month', code: 7 },
  { name: 'Last month', code: 8 },
  { name: 'This year', code: 9 },
  { name: 'Last year', code: 10 }
]

// Mapa de funciones para cada código
const rangeMap = {
  0: () => null,
  1: () => [today, today],
  2: () => {
    const y = subDays(today, 1)
    return [y, y]
  },
  3: () => [subDays(today, 6), today],
  4: () => [subDays(today, 29), today],
  5: () => [startOfWeek(today, { weekStartsOn: 1 }), endOfWeek(today, { weekStartsOn: 1 })],
  6: () => {
    const start = subDays(startOfWeek(today, { weekStartsOn: 1 }), 7)
    const end = subDays(startOfWeek(today, { weekStartsOn: 1 }), 1)
    return [start, end]
  },
  7: () => [startOfMonth(today), endOfMonth(today)],
  8: () => {
    const lastMonth = subDays(startOfMonth(today), 1)
    return [startOfMonth(lastMonth), endOfMonth(lastMonth)]
  },
  9: () => [startOfYear(today), endOfYear(today)],
  10: () => {
    const lastYear = new Date(today.getFullYear() - 1, 0, 1)
    return [startOfYear(lastYear), endOfYear(lastYear)]
  }
}

const rangeSelected = ref(0);

const setRange = (code) => {
  rangeSelected.value = code
  dateRange.value = rangeMap[code]?.() ?? null
  onDateSelect(dateRange.value, false);
}

const requireConfirmation = (event) => {
  confirmCalendar.require({
    target: event.currentTarget,
    group: 'calendarConfirmPopup',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

const onDateSelect = (date, changeRange = true) => {
  if (changeRange) {
    rangeSelected.value = null;
  }

  if (rangeSelected.value == 0) {
    datesSelected.value = "All times"
    return;
  }
  
  if (dateRange.value.length === 2 && dateRange.value[1] == null) {
    const startDate = new Date(dateRange.value[0]);
    const endDate = new Date(dateRange.value[0]);
    const formattedDates = formatDatesInput(startDate, endDate);
    datesSelected.value = formattedDates;
  }
  if (dateRange.value.length === 2 && dateRange.value[1] >= dateRange.value[0]) {
    const startDate = new Date(dateRange.value[0]);
    const endDate = new Date(dateRange.value[1]);
    const formattedDates = formatDatesInput(startDate, endDate);
    datesSelected.value = formattedDates;
  }
};

const formatDatesInput = (startDate, endDate) => {
  const formattedStartDate = formatDateDay(startDate);
  const formattedEndDate = formatDateDay(endDate);
  const result = formattedStartDate + " - " +formattedEndDate;
  console.log(datesSelected.value)  
  emit('update:datesValue', {dataRange: [...dateRange.value], type: props.type});
  return result;
};

const formatDateDay = (date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

</script>
<template>
  <ConfirmPopup group="calendarConfirmPopup" style="max-width: 500px;">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex">
        <div class="cols-8" style="margin: 15px;">
          <div class="card col-12 lg:col-12 " style="display:block">
            <Calendar 
              style="display:block;margin-top:10px"
              @click.stop 
              v-model="dateRange"
              selectionMode="range" 
              :manualInput="false" 
              inline 
              @date-select="onDateSelect" 
            />
          </div>
        </div>
        <div class="cols-4 mt-5">
          <div class="card col-12 lg:col-12 " style="display:block">
            <Button
              v-for="item in options"
              class="text-xs px-3 py-1 my-1"
              :outlined="rangeSelected != item.code"
              size="small"
              :key="item.code"
              :label="item.name"
              @click="setRange(item.code)"
            />
          </div>
        </div>
      </div>
    </template>
  </ConfirmPopup>

  <InputText 
    placeholder="Select Dates" 
    readonly 
    type="text" 
    v-model="datesSelected"
    @click="requireConfirmation($event)"
    style="width: 200px;"
  />
</template>