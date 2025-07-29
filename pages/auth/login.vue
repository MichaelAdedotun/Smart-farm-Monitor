<script setup lang="ts">
definePageMeta({ layout: 'public' })

import {useForm, useField, useResetForm} from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from 'vue-toastification'

const toast = useToast()

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters')
})

type LoginForm = z.infer<typeof loginSchema>

const { handleSubmit, errors, isSubmitting, submitCount } = useForm<LoginForm>({
  validationSchema: toTypedSchema(loginSchema),
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const submitForm = handleSubmit(async () => {
  toast.success('Login successful')
  useResetForm()
  navigateTo('/admin/dashboard')
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-start items-start md:flex-row-reverse md:justify-center md:items-center">

    <!-- right: Image section -->
    <div class="w-full md:w-1/3 lg:w-1/2 h-96 md:h-screen bg-cover bg-center rounded-ee-4xl md:rounded-none" style="background-image: url('/images/hero-smart-farm.jpg')"></div>

    <!-- left: Form section -->
    <div class="flex items-center justify-center w-full md:w-2/3 lg:w-1/2">
      <div class="w-full px-8 py-10 md:px-17">
        <h2 class="text-3xl text-green-600 font-bold mb-6">Login</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="block w-full p-2 rounded-md border-gray-400 border outline-none"
                :class="[
                        errors.email ? 'border-red-600 ' : email ? 'border-green-600' : 'border-gray-400'
                ]"
            />
            <span class="text-sm text-red-500">{{ errors.email }}</span>
          </div>

          <div>
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="block w-full p-2 rounded-md border-gray-400 border outline-none"
                :class="[
                        errors.password ? 'border-red-600 ' : password ? 'border-green-600' : 'border-gray-400'
                ]"
            />
            <span class="text-sm text-red-500">{{ errors.password }}</span>
          </div>

          <button
              type="submit"
              class="w-full bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-700 transition disabled:opacity-50"
              :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>
        <p class="mt-4 text-gray-500 text-sm text-center">Don't have an account? <NuxtLink to="/auth/register" class="text-green-600">Register</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>