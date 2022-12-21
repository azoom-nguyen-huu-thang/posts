<template>
  <div class="register-page">
    <form class="register-form">
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label" for="name">Name*</label>
        <input
          id="name"
          v-model.trim="$v.name.$model"
          class="input"
          :class="{
            'input--error': $v.name.$error,
          }"
        />
        <div v-if="$v.name.$error" class="error">
          <span v-if="!$v.name.required">Field is required</span>
          <span v-if="!$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Date of birth*</label>
        <input
          v-model.trim="$v.dob.$model"
          type="date"
          class="input"
          :class="{
            'input--error': $v.dob.$error,
          }"
        />
        <div v-if="$v.dob.$error" class="error">
          <span v-if="!$v.dob.required">Field is required</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Gender*</label>
        <div class="flex">
          <input
            id="male"
            v-model.trim="$v.gender.$model"
            type="radio"
            class="input"
            value="Male"
            name="gender"
          />
          <label for="male">Male</label>
          <input
            id="female"
            v-model.trim="$v.gender.$model"
            type="radio"
            class="input"
            value="Female"
            name="gender"
            style="margin-left: 1rem"
          />
          <label for="female">Female</label>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Address*</label>
        <input
          v-model.trim="$v.address.$model"
          type="text"
          class="input"
          :class="{
            'input--error': $v.address.$error,
          }"
        />
        <div v-if="$v.address.$error" class="error">
          <span v-if="!$v.address.required">Field is required</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Email*</label>
        <input
          v-model.trim="$v.email.$model"
          type="text"
          class="input"
          :class="{
            'input--error': $v.email.$error,
          }"
        />
        <div v-if="$v.email.$error" class="error">
          <span v-if="!$v.email.required">Field is required</span>
          <span v-if="!$v.email.email">Invalid email</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Graduation date</label>
        <input
          v-model.trim="$v.graduationDate.$model"
          type="date"
          class="input"
          :class="{
            'input--error': $v.graduationDate.$error,
          }"
        />
        <div v-if="$v.graduationDate.$error" class="error">
          <span v-if="!$v.graduationDate.isValid">
            Graduation date must be behind date of birth
          </span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Phone number*</label>
        <input
          v-model.trim="$v.phoneNumber.$model"
          type="tel"
          class="input"
          :class="{
            'input--error': $v.phoneNumber.$error,
          }"
        />
        <div v-if="$v.phoneNumber.$error" class="error">
          <span v-if="!$v.phoneNumber.required"> Field is required </span>
          <div v-if="!$v.phoneNumber.validPhoneNumber">
            Invalid phone number format
          </div>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Password *</label>
        <input
          v-model.trim="$v.password.$model"
          type="password"
          class="input"
          :class="{
            'input--error': $v.password.$error,
          }"
        />
        <div v-if="$v.password.$error" class="error">
          <span v-if="!$v.password.required">Field is required</span>
          <span v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </span>
          <span v-if="!$v.password.isValid">
            Password must contain at least 1 uppercase letter and 1 special
            character
          </span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="label">Confirm password *</label>
        <input
          v-model.trim="$v.rePassword.$model"
          type="password"
          class="input"
          :class="{
            'input--error': $v.rePassword.$error,
          }"
        />
        <div v-if="$v.rePassword.$error" class="error">
          <span v-if="!$v.rePassword.required"> Field is required </span>
          <span v-if="!$v.rePassword.isValid">
            Confirmed password must be same as password
          </span>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <button
          class="submit-button"
          :disabled="submitStatus === 'PENDING'"
          type="submit"
          @click.prevent="submitForm"
        >
          Register
        </button>
        <p v-if="submitStatus === 'OK'" style="color: red">
          Thanks for your submission!
        </p>
        <p v-if="submitStatus === 'ERROR'" style="color: red">
          Please fill the form correctly.
        </p>
        <p v-if="submitStatus === 'PENDING'" style="color: red">Sending...</p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      dob: '',
      gender: 'Male',
      address: '',
      email: '',
      graduationDate: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
      submitStatus: null,
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    dob: {
      required,
    },
    gender: {
      required,
    },
    address: {
      required,
    },
    email: {
      required,
      email,
    },
    graduationDate: {
      isValid: (value, vm) => value > vm.dob,
    },
    phoneNumber: {
      required,
      validPhoneNumber: (value) =>
        !!value.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
    },
    password: {
      required,
      minLength: minLength(6),
      isValid: (value) => !!value.match(/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/),
    },
    rePassword: {
      required,
      isValid: (value, vm) => value === vm.password,
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }

      const {
        name,
        dob,
        gender,
        address,
        email,
        graduationDate,
        phoneNumber,
        password,
      } = this
      return console.log({
        name,
        dob,
        gender,
        address,
        email,
        graduationDate,
        phoneNumber,
        password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.register-page {
  background-color: #fff;
  padding: 2rem 0;
  min-height: 100vh;
}

.register-form {
  width: 300px;
  margin: 0 auto;
  border: 2px solid black;
}

.submit-button {
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  cursor: pointer;
}

.form-group {
  margin: 0.5rem 0;
  padding: 0 2rem;

  & > .input {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 1rem;

    &--error {
      border: 2px solid red;
    }
  }
}

.error {
  color: red;
  display: flex;
  flex-direction: column;
}
</style>
