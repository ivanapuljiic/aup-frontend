<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const router = useRouter()
const loading = ref(false)
const posudbe = ref<any[]>([])

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Knjiga', value: 'knjiga_naslov' },
  { title: 'Član', value: 'clan_ime_prezime' },
  { title: 'Datum posudbe', value: 'datum_posudbe' },
  { title: 'Datum povrata', value: 'datum_povrata' },
  { title: 'Akcije', key: 'actions', sortable: false },
]

async function dohvatiPosudbe() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/posudbe`)
    posudbe.value = await response.json()
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

async function vratiKnjigu(id: number) {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/posudbe/${id}/vrati`, {
      method: 'POST',
    })
    if (response.ok) {
      await dohvatiPosudbe()
    }
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

onMounted(async () => {
  await dohvatiPosudbe()
})
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Posudbe knjiga

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="router.push('/posudbe/dodaj')"
      >
        Nova posudba
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="posudbe"
        :loading="loading"
      >
        <template #item.actions="{ item }">
          <v-btn
            v-if="!item.datum_povrata"
            color="success"
            size="small"
            @click="vratiKnjigu(item.id)"
          >
            Vrati knjigu
          </v-btn>
          <span v-else class="text-grey">Vraćeno</span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>