<template>
  <v-app class="bg-navy">
    <v-container
      class="d-flex flex-column align-center justify-space-between fill-height text-center"
    >
      <div class="mt-8">

        <h1 class="text-h4 font-weight-bold text-white">
          {{ t("welcome") }} 🦅
        </h1>

        <p class="mt-4 mb-12 text-body-1 text-white">
          {{ t("description") }}
        </p>

        <v-img
          :src="escudo"
          alt="Voicebot Logo"
          max-width="200"
          class="mx-auto mt-6"
        />
      </div>

      <p class="text-caption mt-4 text-grey-lighten-1">
        {{ t("project") }}
        <strong>{{ t("author") }}</strong>.
      </p>
      
      <a
        href="https://github.com/edgarhdzp"
        target="_blank"
        class="text-grey-lighten-2 text-decoration-underline"
      >
        {{ t("github") }}
      </a>

      <v-btn
        class="mb-8"
        color="yellow darken-2"
        size="large"
        rounded="xl"
        elevation="4"
        @click="goToVoicebot"
      >
        {{ t("start") }}
      </v-btn>

    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import escudo from "../assets/america-escudo.png";
const { t } = useI18n();
const router = useRouter();

function goToVoicebot() {
  router.push({ name: "Voicebot" });
}

</script>

<style scoped>
.bg-navy {
  background-color: #001f3f;
}
.text-white {
  color: #ffffff !important;
}
</style>