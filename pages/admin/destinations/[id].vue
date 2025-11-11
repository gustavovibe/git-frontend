<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      <div class="col-12 lg:col-2">
        <PanelMenuCMS/>
      </div>
      <Toast/>
      <div class="col-12 lg:col-10">
        <h2>See/Edit page</h2>
        <div style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px" class="p-4">
          <div class="card flex justify-content-start">
            Title<span style="color: red">*</span>
          </div>
          <div class=" card flex justify-content-start">
            <InputText type="text" v-model="typeCategory" class="w-full"
                       style="background-color: rgba(130, 207, 69, 0.1);"
                       disabled/>
          </div>
          <div class="card flex justify-content-start">
            Destination ID(from tour radar)
          </div>
          <div class="card flex justify-content-start">
            <InputText type="text" v-model="destination_id" class="w-full"
                       style="background-color: rgba(80, 80, 80, 0.1);"
                       disabled/>
          </div>
          <div class="card flex justify-content-start">
            Overview<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="overview" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Quick Facts<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="quick_facts" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Things To Do<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="things_to_do" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Travel Tips<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="travel_tips" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Best Time To Visit<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="best_time_to_visit" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Slug<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="slug" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Excerpt<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="excerpt" editorStyle="height: 150px"/>
          </div>
          <div class="card flex justify-content-start">
            Meta Description<span style="color: red">*</span>
          </div>
          <div class="card">
            <Editor v-model="meta_description" editorStyle="height: 150px"/>
          </div>
          <br>
          <div class="card flex justify-content-start">
            <Button label="Save" style="background-color: #FF6C0E;border: #FF6C0E; font-size:13px" class="pl-5 pr-5"
                    @click="saveDestination()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from 'primevue/editor';
import {useRoute} from 'vue-router';
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
import 'primeicons/primeicons.css'
import {useRouter} from 'vue-router';
import Button from 'primevue/button';
import {onMounted, ref} from "vue";
import InputText from 'primevue/inputtext';
import {useToast} from "primevue/usetoast";
import {useDestinationStore} from "@/store/destinationStore";

const router = useRouter();
const route = useRoute();
const orderId = ref('')
const config = useRuntimeConfig();
const url = ref(config.public.BACKEND_URL)
const toast = useToast();
const destinationStore = useDestinationStore();
const destination = computed(() => destinationStore.destination);
const destination_details = computed(() => destinationStore.destination_details);
const overview = ref('')
const quick_facts = ref('')
const things_to_do = ref('')
const travel_tips = ref('')
const best_time_to_visit = ref('')
const slug = ref('')
const excerpt = ref('')
const meta_description = ref('')
const category = ref('');
const id = ref('');
const typeCategory = ref('');
const destination_id = ref('');

const selectCategory = (category) => {
  switch (category) {
    case 'city':
      return typeCategory.value = destination.value.city_name;
    case 'country':
      return typeCategory.value = destination.value.name;
    case 'natural_destination':
      return typeCategory.value = destination.value.destination_name;
  }
};

const selectId = (category) => {
  switch (category) {
    case 'city':
      return destination_id.value = destination.value.t_city_id;
    case 'country':
      return destination_id.value = destination.value.t_country_id;
    case 'natural_destination':
      return destination_id.value = destination.value.t_natural_id;
  }
};

const notification = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  });
};

const saveDestination = async () => {
  let response;
  let data = {
    category: category.value,
    id: id.value,
    overview: overview.value,
    quick_facts: quick_facts.value,
    things_to_do: things_to_do.value,
    travel_tips: travel_tips.value,
    best_time_to_visit: best_time_to_visit.value,
    slug: slug.value,
    excerpt: excerpt.value,
    meta_description: meta_description.value
  };
  try {
    response = await destinationStore.addDestination(data, url.value);
    notification('success', 'Success', response.message);
  } catch (error) {
    notification('error', 'Error', error.message);
  }
};

onMounted(async () => {
  let itemId = route.params.id;
  let parts = itemId.split('-');
  category.value = parts[0];
  id.value = parts[1];
  await destinationStore.getDestination({id: id.value, category: category.value}, url.value);
  selectCategory(category.value);
  selectId(category.value);
  if (destination_details.value != null) {
    await nextTick();
    overview.value = destination_details.value.overview || '';
    quick_facts.value = destination_details.value.quick_facts || '';
    things_to_do.value = destination_details.value.things_to_do || '';
    travel_tips.value = destination_details.value.travel_tips || '';
    best_time_to_visit.value = destination_details.value.best_time_to_visit || '';
    slug.value = destination_details.value.slug || '';
    excerpt.value = destination_details.value.excerpt || '';
    meta_description.value = destination_details.value.meta_description || '';
  }
});
</script>
<style scoped>

:deep(.ql-editor) {
  background: rgba(130, 207, 69, 0.1) !important;
}

:deep(.p-button.p-component) {
  padding: 0.4rem;
  font-size: smaller;
}

:deep(span.p-dropdown-label.p-inputtext.p-placeholder) {
  padding: 0.4rem;
}

:deep(span.p-dropdown-label.p-inputtext) {
  padding: 0.4rem;
}

:deep(.p-multiselect-label.p-placeholder) {
  padding: 0.4rem;
}

:deep(.p-multiselect.p-multiselect-chip .p-multiselect-token) {
  padding: 0.2rem 0.75rem;
}

.sales {
  border: solid 1.3px #ff6c0e;
  border-radius: 5px;
}

.suppliers {
  border: solid 1.3px #82cf35;
  border-radius: 5px;
}

.filter-padding div {
  padding: 0 0.5rem;
}

.text_decoration_none {
  text-decoration: none;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f3faed;
}

@media only screen and (max-width: 767px) {
  .main-spacing {
    padding: 0.5rem 2rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main-spacing {
    padding: 0.5rem 2rem;
  }
}

@media only screen and (min-width: 1200px) {
  .main-spacing {
    padding: 2rem 2rem;
  }
}


</style>