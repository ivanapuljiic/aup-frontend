import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Pocetna from '@/views/pages/Pocetna.vue'
import Autori from '@/views/autori/Autori.vue'
import AutorForma from '@/views/autori/AutorForma.vue'
import AutorPregled from '@/views/autori/AutorPregled.vue'
import Knjige from '@/views/knjige/Knjige.vue'
import KnjigaForma from '@/views/knjige/KnjigaForma.vue'
import Clanovi from '@/views/clanovi/Clanovi.vue'
import ClanForma from '@/views/clanovi/ClanForma.vue'
import Posudbe from '@/views/posudbe/Posudbe.vue'
import PosudbaForma from '@/views/posudbe/PosudbaForma.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna,
  },
  {
    path: '/autori',
    name: 'Autori',
    component: Autori,
  },
  {
    path: '/autori/dodaj',
    name: 'AutorDodaj',
    component: AutorForma,
  },
  {
    path: '/autori/:id',
    name: 'AutorPregled',
    component: AutorPregled,
  },
  {
    path: '/autori/:id/uredi',
    name: 'AutorUredi',
    component: AutorForma,
  },
  {
    path: '/knjige',
    name: 'Knjige',
    component: Knjige,
  },
  {
    path: '/knjige/dodaj',
    name: 'KnjigaDodaj',
    component: KnjigaForma,
  },
  {
    path: '/knjige/:id/uredi',
    name: 'KnjigaUredi',
    component: KnjigaForma,
  },
  {
    path: '/clanovi',
    name: 'Clanovi',
    component: Clanovi,
  },
  {
    path: '/clanovi/dodaj',
    name: 'ClanDodaj',
    component: ClanForma,
  },
  {
    path: '/clanovi/:id/uredi',
    name: 'ClanUredi',
    component: ClanForma,
  },
  {
    path: '/posudbe',
    name: 'Posudbe',
    component: Posudbe,
  },
  {
    path: '/posudbe/dodaj',
    name: 'PosudbaDodaj',
    component: PosudbaForma,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
