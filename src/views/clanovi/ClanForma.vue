<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const clan = reactive<any>({
  ime: '',
  prezime: '',
  broj_iskaznice: '',
  email: ''
})

const jeUredivanje = computed(() => !!route.params.id)
const naslovStranice = computed(() => jeUredivanje.value ? 'Uredi člana' : 'Dodaj člana')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi člana')

async function dohvatiClana() {
  if (!route.params.id) return
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/clanovi/${route.params.id}`)
    const data = await response.json()
    Object.assign(clan, data)
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

async function spremiClana() {
  if (!clan.ime || !clan.prezime || !clan.broj_iskaznice) return

  loading.value = true
  const url = jeUredivanje.value ? `${API_URL}/clanovi/${route.params.id}` : `${API_URL}/clanovi`
  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clan),
    })

    if (response.ok) {
      router.push('/clanovi')
    } else {
      console.log("Greška pri spremanju:", await response.text())
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function odustani() {
  router.push('/clanovi')
}

onMounted(async () => {
  await dohvatiClana()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>{{ naslovStranice }}</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="clan.ime"
        label="Ime"
        prepend-inner-icon="mdi-account"
      />
      <v-text-field
        v-model="clan.prezime"
        label="Prezime"
        prepend-inner-icon="mdi-account-card-details"
      />
      <v-text-field
        v-model="clan.broj_iskaznice"
        label="Broj članske iskaznice"
        prepend-inner-icon="mdi-card-account-details"
      />
      <v-text-field
        v-model="clan.email"
        label="E-mail adresa"
        prepend-inner-icon="mdi-email"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="odustani">Odustani</v-btn>
      <v-btn color="primary" :loading="loading" @click="spremiClana">{{ tekstGumba }}</v-btn>
    </v-card-actions>
  </v-card>
</template>