<template>
  <v-container class="mt-5">
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-blue-darken-3">
          Knjižnica App — Dashboard
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Pregled osnovnih statistika knjižnice.
        </p>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto text-center pa-4" elevation="2" border color="blue-lighten-5">
          <v-icon size="48" color="blue-darken-2" class="mb-2">mdi-account-multiple</v-icon>
          <v-card-item>
            <div class="text-overline text-grey-darken-1">Ukupno Autora</div>
            <div class="text-h3 font-weight-bold text-blue-darken-3 mt-1">
              {{ statistika.autori }}
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto text-center pa-4" elevation="2" border color="green-lighten-5">
          <v-icon size="48" color="green-darken-2" class="mb-2">mdi-book-open-page-variant</v-icon>
          <v-card-item>
            <div class="text-overline text-grey-darken-1">Ukupno Knjiga</div>
            <div class="text-h3 font-weight-bold text-green-darken-3 mt-1">
              {{ statistika.knjige }}
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto text-center pa-4" elevation="2" border color="purple-lighten-5">
          <v-icon size="48" color="purple-darken-2" class="mb-2">mdi-card-account-details</v-icon>
          <v-card-item>
            <div class="text-overline text-grey-darken-1">Registrirani Članovi</div>
            <div class="text-h3 font-weight-bold text-purple-darken-3 mt-1">
              {{ statistika.clanovi }}
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto text-center pa-4" elevation="2" border color="orange-lighten-5">
          <v-icon size="48" color="orange-darken-2" class="mb-2">mdi-bookmark-check</v-icon>
          <v-card-item>
            <div class="text-overline text-grey-darken-1">Aktivne Posudbe</div>
            <div class="text-h3 font-weight-bold text-orange-darken-3 mt-1">
              {{ statistika.posudbe }}
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const statistika = ref({
  autori: 0,
  knjige: 0,
  clanovi: 0,
  posudbe: 0
})

const dohvatiStatistiku = async () => {
  try {
    const response = await fetch('http://localhost:5005/dashboard-stats')
    if (response.ok) {
      const data = await response.json()
      statistika.value = {
        autori: data.broj_autora,
        knjige: data.broj_knjiga,
        clanovi: data.broj_clanova,
        posudbe: data.broj_posudbi
      }
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  dohvatiStatistiku()
})
</script>