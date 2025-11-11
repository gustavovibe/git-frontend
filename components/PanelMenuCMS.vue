<template>
    <div v-if="!isLargeScreen" @click="toggleMenu" class="mb-3">
        <div class="card flex justify-content-center w-full">
            <Button :label="isMenuVisible ? 'Hide menu' : 'See menu'" class="w-full cms-menu-btn"/>
        </div>
    </div>
    <div v-if="isLargeScreen || isMenuVisible" class="card flex justify-content-center">
        <PanelMenu :model="items" class="w-full lg:w-20rem">
            <template #item="{ item }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple class="flex align-items-center cursor-pointer text-color px-3 py-2" :href="href" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2 text-color">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple class="flex align-items-center cursor-pointer text-color px-3 py-3" :href="item.url" :target="item.target">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
                </a>
            </template>
        </PanelMenu>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PanelMenu from 'primevue/panelmenu';
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const userId=ref(0);
const router = useRouter();
const route = useRoute();

const items = ref([
    {
        label: 'Reports',
        icon: 'pi pi-book',
        url: '/admin/reports'
    },
    {
        label: 'Inventory',
        icon: 'pi pi-box',
        items: [
            {
                label: 'Adventures',
                icon: 'pi pi-star',
                url: '/admin/adventures'
            },
            {
                label: 'Operators',
                icon: 'pi pi-user',
                url: '/admin/operators'
            },
            {
                label: 'Destinations',
                icon: 'pi pi-tag',
                url: '/admin/destinations'
            },
            {
                label: 'Travel Styles',
                icon: 'pi pi-star',
                url: '/admin/travel-styles'
            }
        ]
    },
    {
        label: 'Orders',
        icon: 'pi pi-th-large',
        url: '/admin/orders'
    },
    {
        label: 'Travelers',
        icon: 'pi pi-users',
        url: '/admin/travelers'
    },
    {
        label: 'Settings',
        icon: 'pi pi-wrench',
        items: [
            {
                label: 'Users',
                icon: 'pi pi-user',
                url: '/admin/users'
            },
            {
                label: 'Email',
                icon: 'pi pi-envelope',
                url: '/admin/email'
            },
            {
                label: 'Account',
                icon: 'pi pi-lock',
                url: `/admin/account?user_id=${userId.value}`
            },
            {
                label: 'Action Logs',
                icon: 'pi pi-clock',
                url: '/admin/action-logs'
            },
        ]
    }
]);

const isMenuVisible = ref(false);
const isLargeScreen = ref(false);

const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
};

const updateScreenSize = () => {
    isLargeScreen.value = window.innerWidth >= 1024;
};

onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
	
    userId.value = route.query.user_id;
/* 

	items.value = items.value.map(item => {
        if (item.label === 'Settings') {
            return {
                ...item,
                items: item.items.map(subItem => {
                    if (subItem.label === 'Account') {
                        return {
                            ...subItem,
                            url: `/admin/account?user_id=${userId.value}`
                        };
                    }
                    return subItem;
                })
            };
        }
        return item;
    }); */
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<style scoped>
a {
    text-decoration: none;
    font-family: 'Canaro';
    font-weight: 500;
    color: #000 !important;
}

.pi {
    color: #82cf35;
}

.text-primary {
    color: #82cf35 !important;
}
.p-button:not(:disabled):hover {
    background: #82cf35;
    color: #ffffff;
    border-color: #82cf35;
}
.p-button {
    color: #ffffff;
    background: #82cf35;
    border: 1px solid #82cf35;
}
.p-button:focus {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #82cf35, 0 1px 2px 0 black;
}
.cms-menu-btn{
    padding: 0.75rem 1.25rem !important;
    font-size: 14px !important;
}
</style>
