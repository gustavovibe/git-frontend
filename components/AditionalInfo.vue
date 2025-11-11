<template>
    <div class="container">
        <Card>
            <template #header>
                <h3 style="color:black" >Additional info</h3>
            </template>
            <template #content>
                <div class="spaces">
                    <InputGroup>
                        <P>Special requirements</P>
                    <Textarea v-model="a_info.requirements" style="border-radius: 5px;" placeholder="Add special requirements (if any)...">
                    </Textarea>
                    </InputGroup>
                    <br>
                    <InputGroup>
                        <p>How did you hear about us?</p>
                        <Dropdown v-model="a_info.about"  :options="select" optionLabel="text" optionValue="val" style="border-radius: 5px;" placeholder="Select an option"></Dropdown>
                    </InputGroup>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import Card from "primevue/card";
import Dropdown from "primevue/dropdown";
import InputGroup from 'primevue/inputgroup';
import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';
import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits(['update:info']);

const select = ref([
    {val:1,text:'Searching online for a specific destination.'},
    {val:2,text:'I found your blog post and then checked your tours.'},
    {val:3,text:'Recommendation of a colleague, family member, or friend.'},
    {val:4,text:'Recommendation of a travel blogger.'},
    {val:5,text:'I booked with Vibe Adventures before'},
    {val:6,text:'None of those'},
    ])

 const a_info = ref({
    requirements:'',
    about:0
 }); 
 


watch(a_info, (newVal) => {
    emit('update:info', newVal);
}, { deep: true });

</script>

<style>
.spaces p{
    margin-right: 20px;
    font-weight: bold;
    color: black;
}
</style>