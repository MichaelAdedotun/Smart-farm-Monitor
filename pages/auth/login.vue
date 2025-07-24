<script setup lang="ts">
definePageMeta({ layout: 'public' })

import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters')
})

type LoginForm = z.infer<typeof loginSchema>

const { handleSubmit, errors, values } = useForm<LoginForm>({
  validationSchema: toTypedSchema(loginSchema),
})

const { email, password } = values

const onSubmit = async (formData: LoginForm) => {
  const { data, error } = await useFetch('/api/auth/login', { method: 'POST', body: formData })
  if (error.value) return alert(error.value.data.message || 'Login failed')
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- left: Form section -->
    <div class="flex items-center justify-center order-2 md:order-1">
      <div class="w-full px-8 py-5 md:px-17">
        <h2 class="text-3xl text-green-600 font-bold mb-6">Login</h2>
        <form @submit="handleSubmit(onSubmit)" class="space-y-4">
          <div>
            <input v-model="email" type="email" placeholder="Email" class="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" required  />
            <span class="text-sm text-red-500">{{ errors.email }}</span>
          </div>

          <div>
            <input v-model="password" type="password" placeholder="Password" class="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" required />
            <span class="text-sm text-red-500">{{ errors.password }}</span>
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
        <p class="mt-4 text-gray-500 text-sm text-center">Don't have an account? <NuxtLink to="/auth/register" class="text-green-600">Register</NuxtLink></p>
      </div>
    </div>

    <!-- right: Image section -->
    <div class="h-96 md:h-screen bg-cover bg-center order-1 md:order-2" style="background-image: url('/images/hero-smart-farm.jpg')"></div>
  </div>
</template>

<style scoped>

</style>