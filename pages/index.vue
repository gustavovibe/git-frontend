<template>
  <search />
  <topdestinations />
  <!--<popularadventures /> !-->
  <whyvibeadventures />
  <storiestipsguides />

</template>
<script>
import search from "~/components/AppHeader.vue";
import whyvibeadventures from "~/components/WhyVibeAdventures.vue";
import topdestinations from "~/components/TopDestinations.vue";
import popularadventures from "~/components/PopularAdventures.vue";
import storiestipsguides from "~/components/StoriesTipsGuides.vue";

export default {
  components: {
    search,
    whyvibeadventures,
    topdestinations,
    popularadventures,
    storiestipsguides,
  },
};
</script>
