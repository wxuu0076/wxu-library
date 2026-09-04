<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">W5. Library Registration Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="form-control"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}
              </div>
            </div>

            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                v-model="formData.gender"
                class="form-select"
                @blur="() => validateGender(true)"
                @change="() => validateGender(true)"
              >
                <option value="" disabled>Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="form-control"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>

            <div class="col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                id="confirm-password"
                v-model="formData.confirmPassword"
                type="password"
                class="form-control"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  @change="() => validateResident(true)"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
              <div v-if="errors.resident" class="text-danger">
                {{ errors.resident }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              v-model="formData.reason"
              class="form-control"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
            <div v-if="reasonMentionsFriend" class="text-success">
              Great to have a friend
            </div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input
              id="suburb"
              type="text"
              class="form-control"
              v-bind:value="formData.suburb"
            />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="submittedUsers.length" class="row mt-5 mb-5">
      <div class="col-12">
        <h2 class="text-center mb-3">Submitted User Information</h2>
        <DataTable :value="submittedUsers" striped-rows scrollable>
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="resident" header="Australian Resident"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const emptyForm = () => ({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
})

const emptyErrors = () => ({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const formData = ref(emptyForm())
const submittedUsers = ref([])
const errors = ref(emptyErrors())

const reasonMentionsFriend = computed(() =>
  formData.value.reason.toLowerCase().includes('friend'),
)

const validateName = (blur) => {
  if (formData.value.username.trim().length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const isValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!isValid) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    }
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'Australian residency must be confirmed'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.trim().length < 5) {
    if (blur) errors.value.reason = 'Reason must be at least 5 characters'
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  const formIsValid = Object.values(errors.value).every((error) => !error)

  if (formIsValid) {
    submittedUsers.value.push({
      username: formData.value.username,
      password: formData.value.password,
      resident: formData.value.isAustralian ? 'Yes' : 'No',
      gender: formData.value.gender,
      reason: formData.value.reason,
    })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = emptyForm()
  errors.value = emptyErrors()
}
</script>
