<script setup>
//@ts-nocheck
import { ref, watch } from "vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import dayjs from 'dayjs';

const emit = defineEmits();

const ptOptionsToggleButton = ref({
  box: {
    class: 'py-1'
  },
})
const ptOptionsDialog = ref({
  header: {
    class: 'pb-1'
  },
  content: {
    class: 'pb-2'
  },
})
const ptOptionsInputText = ref({
  root: {
    class: 'inputTextDateInSearchClass py-2 gray_text'
  },

})

const props = defineProps(['selectedStringDate'])
const visible = ref(false);
const datesAsString = ref(null);
const dates = ref([]);
const timeSlider = ref([2, 65]);
const checked1 = ref(false);
const checked3 = ref(false);
const checked5 = ref(false);
const checked7 = ref(false);
const checked15 = ref(false);
const stringDateWhenDone = ref(null)

function formatDate(date) {
  const clonedDate = new Date(date)
  return dayjs(clonedDate).format('YYYY/MM/DD');
};

function formatDates(startDate, endDate) {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  return [formattedStartDate, formattedEndDate];
};

function onDateSelect(date) {
  checked1.value = false;
  checked3.value = false;
  checked5.value = false;
  checked7.value = false;
  checked15.value = false;

  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  }
};

function handleCancelClick() {
  visible.value = false
  dates.value = []
  datesAsString.value = stringDateWhenDone.value
}

function handleDoneClick() {
  visible.value = false
  stringDateWhenDone.value = datesAsString.value
}

watch(checked1, (value) => {
  if (value) {
    checked3.value = false;
    checked5.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(1);
  } else {
    reduceRange(1);
  }
});

watch(checked3, (value) => {
  if (value) {
    checked1.value = false;
    checked5.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(3);
  } else {
    reduceRange(3);
  }
});

watch(checked5, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(5);
  } else {
    reduceRange(5);
  }
});
watch(checked7, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked5.value = false;
    checked15.value = false;
    expandRange(7);
  } else {
    reduceRange(7);
  }
});
watch(checked15, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked5.value = false;
    checked7.value = false;
    expandRange(14);
  } else {
    reduceRange(14);
  }
});


function expandRange(days) {
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  }
};

const reduceRange = (days) => {
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(startDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
    datesAsString.value = formattedDates;
  }
};



// event to update parent component
watch(stringDateWhenDone, (newValue) => {
  emit('update:onChange', newValue);
}, { deep: true });

// update when props change
watch(() => props.selectedStringDate, (newValue) => {
  datesAsString.value = newValue
  stringDateWhenDone.value = newValue
}, { deep: true });

</script>

<template>
  <div class="w-full">
    <InputText placeholder="When are you going?" readonly type="text" v-model="stringDateWhenDone"
      @click="visible = true" :pt="ptOptionsInputText" />

    <Dialog v-model:visible="visible" modal header="Select Dates" :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" dismissableMask :pt="ptOptionsDialog">
      <!-- buttons section -->
      <section class="w-full mb-1 flex flex-wrap gap-2">
        <ToggleButton v-model="checked1" class="w-4rem" onLabel="±1" offLabel="±1" :pt="ptOptionsToggleButton" />
        <ToggleButton v-model="checked3" class="w-4rem" onLabel="±3" offLabel="±3" :pt="ptOptionsToggleButton" />
        <ToggleButton v-model="checked5" class="w-4rem" onLabel="±5" offLabel="±5" :pt="ptOptionsToggleButton" />
        <ToggleButton v-model="checked7" class="w-4rem" onLabel="±7" offLabel="±7" :pt="ptOptionsToggleButton" />
        <ToggleButton v-model="checked15" class="w-4rem" onLabel="±15" offLabel="±15" :pt="ptOptionsToggleButton" />
      </section>

      <!-- calendar section -->
      <section class="w-full">
        <Calendar class="w-full" v-model="dates" selectionMode="range" :manualInput="false" inline
          @date-select="onDateSelect" />
      </section>

      <!-- slider section -->
      <section class="card col-12 lg:col-12 py-0">
        <h3 class="pt-0 my-0">Time of stay: </h3>

        <!-- slider with left-right labels -->
        <div class="flex align-items-center">
          <!-- left label -->
          <div class="col-2 flex justify-content-center">
            <span>{{ timeSlider[0] }} Days</span>
          </div>
          <!-- slider -->
          <div class="col-8 flex justify-content-center align-items-center">
            <Slider :min="1" :max="66" v-model="timeSlider" range class="w-full" />
          </div>
          <!-- right label -->
          <div class="col-2 flex justify-content-center">
            <span>{{ timeSlider[1] }} Days</span>
          </div>
        </div>

      </section>

      <section class="flex justify-content-center">
        <!-- Buton Cancel -->
        <Button @click="handleCancelClick()" class="mr-2" type="button" label="Cancel" severity="secondary"></Button>
        <!-- Button Done -->
        <Button @click="handleDoneClick()" type="button" label="Done" severity="warning"></Button>
      </section>
    </Dialog>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Canaro';
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

@font-face {
  font-family: 'Interstate';
  src: url(/fonts/Interstate-regular.ttf);
  font-weight: 100 !important;
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}

.red {
  background-color: red;
}

.gray_text {
  color: #505050;
}
</style>