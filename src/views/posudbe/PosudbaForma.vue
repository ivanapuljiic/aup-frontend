<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const router = useRouter()
const loading = ref(false)

const knjige = ref<any[]>([])
const clanovi = ref<any[]>([])

const posudba = reactive({
  knjiga_id: null,
  clan_id: null,
  datum_posudbe: new Date().toISOString().split('T')[0],
  datum_povrata: null
})

async function dohvatiKnjige() {
  try {
    const response = await fetch(`${API_URL}/knjige-dropdown`)
    knjige.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

async function dohvatiClanove() {
  try {
    const response = await fetch(`${API_URL}/clanovi-dropdown`)
    clanovi.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

async function spremiPosudbu() {
  if (!posudba.knjiga_id || !posudba.clan_id) return

  loading.value = true
  try {
    const response = await fetch(`${API_URL}/posudbe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posudba),
    })
    if (response.ok) {
      router.push('/posudbe')
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function odustani() {
  router.push('/posudbe')
}

onMounted(async () => {
  await dohvatiKnjige()
  await dohvatiClanove()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>Nova posudba knjige</v-card-title>
    <v-card-text>
      <v-select
        v-model="posudba.knjiga_id"
        :items="knjige"
        item-title="title"
        item-value="value"
        label="Odaberi knjigu"
        prepend-inner-icon="mdi-book-open-variant"
        class="mb-4"
      />
      <v-select
        v-model="posudba.clan_id"
        :items="clanovi"
        item-title="title"
        item-value="value"
        label="Odaberi člana knjižnice"
        prepend-inner-icon="mdi-account"
      />

    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="odustani">Odustani</v-btn>
      <v-btn color="primary" :loading="loading" @click="spremiPosudbu">Spremi posudbu</v-btn>
    </v-card-actions>
  </v-card>
</template>