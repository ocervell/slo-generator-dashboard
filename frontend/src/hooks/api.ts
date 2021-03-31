/**
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
export const sloConfig = {
  async get(name: string) {
    return (await fetch(`/api/slo/${name}`)).json()
  },
  async update(name: string, data: Object) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
    return (await fetch(`/api/slo/${name}`, requestOptions)).json()
  },
  async test(name: string) {
    return (await fetch(`/api/slo/${name}/test`)).json()
  },
  async diff(name: string) {
    return (await fetch(`/api/slo/${name}/diff`)).json()
  }
}

export const slos = {
  async getKeys(query: string) {
    return (await fetch(`/api/slos/keys?q=${query}`)).json()
  },
  async getValues(query: string) {
    return (await fetch(`/api/slos/values?q=${query}`)).json()
  },
  async getLastReportCount() {
    return (await fetch(`/api/slos/last_report_count`)).json()
  },
  async getLastReport(query: string, offset: number, limit: number) {
    return (await fetch(
      `/api/slos/last_report?offset=${offset}&limit=${limit}&${query}`
    )).json()
  }
}
