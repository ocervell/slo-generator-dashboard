# Copyright 2021 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#            http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from utils import load_slo_configs

# Environment
BIGQUERY_LAST_REPORT_TABLE_ID = os.environ['BIGQUERY_LAST_REPORT_TABLE_ID']
ERROR_BUDGET_POLICY_PATH = os.environ['ERROR_BUDGET_POLICY_PATH']
SLO_REPO_PATH = os.environ['SLO_REPO_PATH']
SLO_CONFIGS_PATHS = os.environ['SLO_CONFIGS_PATHS'].split(',')

# Computed
BIGQUERY_FILTER_KEYS = [
    "service_name",
    "feature_name",
    "slo_name",
    "alert",
    "window",
    "metadata",
]
SLO_CONFIGS = load_slo_configs(SLO_CONFIGS_PATHS)
