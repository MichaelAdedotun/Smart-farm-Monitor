<script setup lang="ts">
definePageMeta({ layout: 'public' })

import { useForm, useField, useResetForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from 'vue-toastification'

const toast = useToast()

const registerSchema = z
    .object({
      name: z.string().min(2, 'Name is required'),
      email: z.string().email('Invalid email'),
      password: z.string().min(6, 'Minimum 6 characters'),
      confirmPassword: z.string().min(6, 'Please confirm your Password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: "Passwords don't match",
    })

type RegisterForm = z.infer<typeof registerSchema>

const { handleSubmit, errors, isSubmitting, submitCount } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(registerSchema),
})


const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')


const submitForm = handleSubmit(async () => {
  toast.success('Registration successful')
  useResetForm()
  navigateTo('/auth/login')
})

</script>

<template>
  <div class="min-h-screen flex flex-col justify-start items-start md:flex-row-reverse md:justify-center md:items-center">

    <!-- right: Image section -->
    <div class="w-full md:w-1/3 lg:w-1/2 h-96 md:h-screen bg-cover bg-center rounded-ee-4xl md:rounded-none" style="background-image: url('/images/hero-smart-farm.jpg')"></div>

    <!-- left: Form section -->
    <div class="flex items-center justify-center w-full md:w-2/3 lg:w-1/2">
      <div class="w-full px-8 py-10 md:px-17">
        <h2 class="text-3xl text-green-600 font-bold mb-6">Register</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <input
                v-model="name"
                type="text"
                placeholder="Full Name"
                class="block w-full p-2 rounded-md border-gray-400 border outline-none"
                :class="[
                        errors.name ? 'border-red-600 ' : name ? 'border-green-600' : 'border-gray-400'
                ]"
            />
            <span class="text-sm text-red-500">{{ errors.name }}</span>
          </div>

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

          <div>
            <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="block w-full p-2 rounded-md border-gray-400 border outline-none"
                :class="[
                        errors.confirmPassword ? 'border-red-600 ' : confirmPassword ? 'border-green-600' : 'border-gray-400'
                ]"
            />
            <span class="text-sm text-red-500">{{ errors.confirmPassword }}</span>
          </div>

          <button
              type="submit"
              class="w-full bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-700 transition disabled:opacity-50"
              :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Registering...</span>
            <span v-else>Register</span>
          </button>
        </form>
        <p class="mt-4 text-gray-500 text-sm text-center">Already have an account? <NuxtLink to="/auth/login" class="text-green-600">Login</NuxtLink></p>
      </div>
    </div>
 </div>
</template>

<style scoped>

</style>