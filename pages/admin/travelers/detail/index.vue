<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      <div class="col-12 lg:col-2">
        <PanelMenuCMS />
      </div>
			<div class="col-12 lg:col-10">
				<TravelerD   />
			</div>

    </div>
  </div>
</template>

<script setup>
import TravelerD from "~/components/TravelerD.vue";
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";

</script>
