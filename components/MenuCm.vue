<template>
  <div class="mx-3 menu-wishlist">
    <h2 class="canaro-font font-semibold my-0 pl-3">Hello {{ name }},</h2>
    <div id="menu" class="card flex justify-content-center">
      <Menu :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="selectItem(item)"
              :class="{ 'selected-item': route.path === item.url }">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" @click="selectItem(item)"
            :class="{ 'selected-item': route.path === item.url }">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from 'primevue/menu';
import { useRoute } from 'vue-router';

const route = useRoute();

const userId = ref(null);
const name = ref(null);
const selectedItem = ref(null);

const items = ref([
  { label: 'My Trips', icon: 'pi pi-send', url: '/my-trips' },
  { label: 'Inbox', icon: 'pi pi-inbox', url: '/inbox' },
  { label: 'Wishlist', icon: 'pi pi-heart', url: '/wishlist' },
  { label: 'Personal details', icon: 'pi pi-user', url: '/personal-details' }
]);

const selectItem = (item) => {
  selectedItem.value = item; 
  localStorage.setItem('selectedItem', JSON.stringify(item));
};



onMounted(() => {
  userId.value = localStorage.getItem('user_id');
  name.value = localStorage.getItem('name');
  const storedItem = localStorage.getItem('selectedItem');
  if (storedItem) {
    selectedItem.value = JSON.parse(storedItem);
  }
});
</script>

<style scoped>
:deep(span.p-menuitem-text) {
  font-weight: 700;
}

:deep(.p-menu.p-component) {
  width: 100%;
}

:deep(.p-menu) {
  padding: 0;
}

:deep(.p-menu .p-menuitem > .p-menuitem-content .p-menuitem-link) {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

:deep(.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover) {
  background-color: #82cf45;
  color: #fff;
}

:deep(li span:hover) {
  color: #fff;
}

:deep(li .p-menuitem-icon) {
  color: #82cf45;
}

:deep(li .p-menuitem-text) {
  color: #000;
  font-family: 'Canaro';
  font-weight: 500;
}

button.p-button.p-component {
  background-color: #FF6C0F;
  border-color: #FF6C0F;
}

/* Estilo para el ítem seleccionado */
.selected-item {
  background-color: #82cf45; 
  color: white;
  font-weight: bold;
}

@media only screen and (max-width:768px) {
	.menu-wishlist{
		margin-top: 7rem;
	}
}
</style>
