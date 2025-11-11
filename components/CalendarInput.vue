<script setup>
import dayjs from 'dayjs';
import ConfirmPopup from "primevue/confirmpopup";
import SelectButton from 'primevue/selectbutton';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import { useConfirm } from "primevue/useconfirm";

const emit = defineEmits(['update:datesValue']); // Declaramos el evento

const confirmCalendar = useConfirm();

const timeSlider = ref([2, 65]);
const dates = ref([]);
const startString = ref('');
const skipped = ref(false);
const props = defineProps({
  preselectedDates: { type: Array, default: null } // typed and explicit
});

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = 10;
let prevYear = 2025;
let nextMonth = 1;
let nextYear = 2026;

const date = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

console.log("minDate",minDate);	
console.log("maxDate",maxDate);
	
const selectedValue = ref({ label: '±0', value: 0 });
const lastSelectedValue = ref({ label: '±0', value: 0 });

const selectOptions = ref([
  { label: '±0', value: 0 },
  { label: '±1', value: 1 },
  { label: '±3', value: 3 },
  { label: '±5', value: 5 },
  { label: '±7', value: 7 },
  { label: '±15', value: 15 }
]);

const requireConfirmation = (event) => {
  confirmCalendar.require({
    target: event.currentTarget,
    group: 'calendarConfirmPopup',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

const onDateSelect = (date) =>{
  skipped.value = true;
  selectedValue.value = { label: '±0', value: 0 };

  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

const formatDatesInput = (startDate, endDate) => {
  const formattedStartDate = formatDateDay(startDate);
  const formattedEndDate = formatDateDay(endDate);
  const result = formattedStartDate + " - " +formattedEndDate;
  emit('update:datesValue', dates);
  return result;
};

const formatDateDay = (date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const expandRange = (days) => {
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

const reduceRange = (days) => {
  console.log("days reduced:", days);
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

const changeValue = (newValue, oldValue) => {
  if (oldValue && oldValue.value !== undefined) {
    lastSelectedValue.value = { ...oldValue };
  } else {
    lastSelectedValue.value = { ...newValue };
  }

  if (selectedValue.value.value == 0) {
    reduceRange(parseInt(lastSelectedValue.value.value));
  } else if (newValue.value !== oldValue.value) {
    reduceRange(parseInt(oldValue.value));
    expandRange(parseInt(newValue.value));
  }
}

const toggle = (value) => {
  if (value.value == null && dates.value != null) {
    onDateSelect(dates.value);
  }
};

watch(selectedValue, (newValue, oldValue) => {
  if (skipped.value) {
    skipped.value = false;
    return;
  }
  changeValue(newValue, oldValue);
});
function parseDateFromString(dateStr) {
  if (!dateStr) return null; // Manejar valores nulos o vacíos

  const parts = dateStr.split("/").map(Number);

  if (parts.length !== 3) return null; // Validar que tenga tres partes

  if (parts[0] > 31) {
    // Formato yyyy/mm/dd
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  } else {
    // Formato dd/mm/yyyy
    const [day, month, year] = parts;
    return new Date(year, month - 1, day);
  }
}

const syncDates = (rawArr) => {
  if (!rawArr || rawArr.length !== 2) return;
  const [rawStart, rawEnd] = rawArr;

  // try strict parsing with common formats first
  const parseFormats = ['YYYYMMDD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
  let d1 = dayjs(rawStart, parseFormats, true);
  let d2 = dayjs(rawEnd, parseFormats, true);

  // fallback: non-strict parsing if strict failed
  if (!d1.isValid() || !d2.isValid()) {
    d1 = dayjs(rawStart);
    d2 = dayjs(rawEnd);
  }

  if (!d1.isValid() || !d2.isValid()) {
    console.warn('CalendarInput: could not parse preselectedDates:', rawStart, rawEnd);
    return;
  }

  dates.value = [ d1.toDate(), d2.toDate() ];
  startString.value = `${d1.format('MMM DD, YYYY')} - ${d2.format('MMM DD, YYYY')}`;
  emit('update:datesValue', dates.value);
};

watch(
  () => props.preselectedDates,
  (newVal) => {
    console.log("watcher preselectedDates (child)", JSON.stringify(newVal || []));
    if (!newVal || newVal.length !== 2) return;
    syncDates(newVal);
    // ensure calendar updates DOM/reactivity before triggering the selection handler
    nextTick(() => onDateSelect(dates.value));
  },
  { immediate: true, deep: true }
);

/*
onMounted(async () => {
    console.log("onMounted preselectedDates", props.preselectedDates);
  	syncDates(props.preselectedDates);
	console.log("dates.value on calendarInput",dates.value);
  	onDateSelect(dates.value);
});
*/

</script>
<template>
  <ConfirmPopup group="calendarConfirmPopup" class="search-calendar-popup">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="grid" style="margin: 15px;">
        <h3 style="display: flex; justify-content: center; align-items: center; gap: 10px;">
          <span>
            Travel dates:
          </span>
          <span style="display: flex; justify-self: right; color: #82cf45;" v-tooltip.top="`To select your travel dates, click the start date followed by the end date. The system will show all available adventure packages within those dates.`"><i class="pi pi-info-circle"></i></span>
        </h3>
        <div class="card col-12 lg:col-12 " style="display:block">
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
            <SelectButton v-model="selectedValue" @change="toggle" :options="selectOptions"
                          optionLabel="value" dataKey="value" aria-labelledby="basic">
              <template #option="slotProps">{{ slotProps.option.label }}</template>
            </SelectButton><span>Days</span>
          </div>
          <Calendar @click.stop style="display:block;margin-top:10px" :minDate="minDate" :maxDate="maxDate" v-model="dates"
                    selectionMode="range" :manualInput="false" inline @date-select="onDateSelect" />
        </div>
        <div class="card col-12 lg:col-12 py-0" style="display:block">
        <h3 style="display: flex; justify-content: left; align-items: center; gap: 10px;">
          <span>
            Time to stay:
          </span>
          <span style="display: flex; justify-self: right; color: #82cf45;" v-tooltip.top="`To select your trip duration, use the toggle. The system will display all available adventure packages that match your specified duration.`"><i class="pi pi-info-circle"></i></span>
        </h3>
          <div class="grid" style="text-align: center;align-items: flex-end;" >
            <div class="col-2">
              <div class="slider-left">
                <input disabled v-model.number="timeSlider[0]"
                      style="width: 21px !important;border: none;background: white;" />Days
              </div>
            </div>
            <div class="col-8">
              <Slider :min='1' :max="66" v-model="timeSlider" range
                      style="width: 100%;margin: 0px auto 10px auto;" />
            </div>
            <div class="col-2">
              <div class="slider-right">
                <input disabled v-model.number="timeSlider[1]"
                      style="width: 21px !important;border: none;background: white;" />Days
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ConfirmPopup>
  <InputText
    placeholder="When are you going?"
    readonly
    type="text"
    v-model="startString"
    @click="requireConfirmation($event)"
    :pt="{ root: { class: 'inputTextDateInSearchClass' }}"
  />
</template>



<style>
search-calendar-popup
.p-highlight {
  background-color: #82cf45 !important;
}
.p-datepicker-month {
  color: #82cf45 !important;
  font-style: bold !important;
}
.p-slider-range {
  background-color: #82cf45 !important;
}

.search-calendar-popup{
	width: 35%;
}
@media only screen and (max-width:767px){
	.search-calendar-popup {
    width: 100% !important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px){

}
@media only screen and (min-width:1200px){
  .search-border{
    border-right: 1.5px solid #C8C8C8;
  }
}
</style>

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

.how:hover {
  cursor: pointer;
}
input.p-inputtext.p-component.inputTextDateInSearchClass{
  padding-right: 0!important;
}

.input-label .border-gray {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.hero-image {
  background-image: url("/images/vibeNobackground.jpg");
  height: 95vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-content {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 100%;
  padding: 1%;
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
}

.searchbar-container {
  max-width: 1440px;
  width: 90%;
  margin: 40px auto;
  background: white;
  color: black;
  align-items: center;
  border-radius: 16px;
}

.input-label img {
  width: 20px;
  height: 20px;
}

.search-button {
  font-size: 20px;
  padding: 12px 45px;
  border-radius: 8px !important;
  font-size: 18px !important;
}

.icon-name {
  display: flex;
  align-items: center;
}

.hero-content .title {
  font-family: 'Canaro';
}

.hero-content .subtitle {
  font-family: 'Interstate';
}

.input-name {
  margin-left: 5px
}

@media only screen and (max-width:767px) {
  .hero-content .title {
    font-size: 36px;
    text-align: left;
    width: 90%;
    margin: 0 auto;
  }

  .hero-content .subtitle {
    font-size: 16px;
    text-align: center
  }

  .mobile-hidden {
    display: none;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .howItWorks-card{
    width: calc((100%) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .hero-content .title {
    font-size: 40px;
  }

  .hero-content .subtitle {
    font-size: 20px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width:1200px) {
  .hero-content .title {
    font-size: 60px;
  }

  .hero-content .subtitle {
    font-size: 26px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }

  .input-box {
    border-inline-end-width: 2px;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
  font-family: interstate !important;
}

/*How it Works*/
.howItWorks-btn:hover{
  background-color: unset;
}
button.p-button.p-component.p-button-text.howItWorks-btn {
  background: unset;
  color: #FFFFFF;
  border-color: transparent;
}
.p-button.howItWorks-btn:focus {
  box-shadow: unset;
}

:deep(.howItWorks-sidebar .p-sidebar-header) {
  justify-content: end !important;
}

.p-highlight {
  background-color: #82cf45 !important;
}


</style>
