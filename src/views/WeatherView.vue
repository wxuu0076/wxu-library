<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const city = ref('')
const weatherData = ref(null)
const errorMessage = ref('')

const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : null,
)

const iconUrl = computed(() =>
  weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : null,
)

const fetchWeatherData = async (url) => {
  if (!apiKey) {
    errorMessage.value = 'OpenWeather API key is missing.'
    return
  }

  try {
    errorMessage.value = ''
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    console.error('Error fetching weather data')
    errorMessage.value = error.response?.data?.message || 'Unable to get weather data.'
  }
}

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported by this browser.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      await fetchWeatherData(url)
    },
    () => {
      errorMessage.value = 'Unable to get the current location.'
    },
  )
}

const searchByCity = async () => {
  const cityName = city.value.trim()

  if (!cityName) {
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
  await fetchWeatherData(url)
}

onMounted(fetchCurrentLocationWeather)
</script>

<template>
  <section class="mx-auto" style="max-width: 40rem">
    <h1>Weather App</h1>

    <form class="d-flex gap-2 my-3" @submit.prevent="searchByCity">
      <input
        v-model="city"
        class="form-control"
        type="text"
        placeholder="Enter city name"
        aria-label="City"
      />
      <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <img :src="iconUrl" :alt="weatherData.weather[0].description" />
      <p>{{ temperature }} °C</p>
      <p>{{ weatherData.weather[0].description }}</p>
    </main>
  </section>
</template>
