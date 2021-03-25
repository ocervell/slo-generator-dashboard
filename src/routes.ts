/* *
 * Copyright 2021 Google Inc.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *            http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "./views/Login.vue";
import SLOs from "./views/SLOs.vue";
import SLOView from "./views/SLOView.vue";
import SLOEdit from "./views/SLOEdit.vue";
import Alerts from "./views/Alerts.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/alerts",
    name: "Alerts",
    component: Alerts,
  },
  {
    path: "/slos",
    name: "SLOs",
    component: SLOs,
  },
  {
    path: "/slo/:name/view",
    name: "SLO View",
    component: SLOView,
    props: true
  },
  {
    path: "/slo/:name/edit",
    name: "SLO Edit",
    component: SLOEdit
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
