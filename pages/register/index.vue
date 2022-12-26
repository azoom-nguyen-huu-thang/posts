<template>
  <div class="register-page">
    <form class="register-form">
      <div class="form-group" :class="{ 'form-group -error': $v.name.$error }">
        <label class="label" for="name">Name*</label>
        <input
          id="name"
          v-model.trim="name"
          class="input"
          :class="{
            'input -error': $v.name.$error,
          }"
          @blur="onInputBlur('name')"
        />
        <div v-if="$v.name.$error" class="error">
          <span v-if="!$v.name.required">Field is required</span>
          <span v-if="!$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group -error': $v.dob.$error }">
        <label class="label">Date of birth*</label>
        <input
          v-model.trim="dob"
          type="date"
          class="input"
          :class="{
            'input -error': $v.dob.$error,
          }"
          @blur="onInputBlur('dob')"
        />
        <div v-if="$v.dob.$error" class="error">
          <span v-if="!$v.dob.required">Field is required</span>
        </div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.gender.$error }"
      >
        <label class="label">Gender*</label>
        <div class="input-group">
          <input
            id="male"
            v-model.trim="gender"
            type="radio"
            class="input"
            value="Male"
            name="gender"
            @blur="onInputBlur('gender')"
          />
          <label for="male">Male</label>
          <input
            id="female"
            v-model.trim="gender"
            type="radio"
            class="input"
            value="Female"
            name="gender"
            style="margin-left: 1rem"
            @blur="onInputBlur('gender')"
          />
          <label for="female">Female</label>
        </div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.address.$error }"
      >
        <label class="label">Address*</label>
        <input
          v-model.trim="address"
          type="text"
          class="input"
          :class="{
            'input -error': $v.address.$error,
          }"
          @blur="onInputBlur('address')"
        />
        <div v-if="$v.address.$error" class="error">
          <span v-if="!$v.address.required">Field is required</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group -error': $v.email.$error }">
        <label class="label">Email*</label>
        <input
          v-model.trim="email"
          type="text"
          class="input"
          :class="{
            'input -error': $v.email.$error,
          }"
          @blur="onInputBlur('email')"
        />
        <div v-if="$v.email.$error" class="error">
          <span v-if="!$v.email.required">Field is required</span>
          <span v-if="!$v.email.email">Invalid email</span>
        </div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.graduationDate.$error }"
      >
        <label class="label">Graduation date</label>
        <input
          v-model.trim="graduationDate"
          type="date"
          class="input"
          :class="{
            'input -error': $v.graduationDate.$error,
          }"
          @blur="onInputBlur('graduationDate')"
        />
        <div v-if="$v.graduationDate.$error" class="error">
          <span v-if="!$v.graduationDate.isValid">
            Graduation date must be behind date of birth
          </span>
        </div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.phoneNumber.$error }"
      >
        <label class="label">Phone number*</label>
        <input
          v-model.trim="phoneNumber"
          type="tel"
          class="input"
          :class="{
            'input -error': $v.phoneNumber.$error,
          }"
          @blur="onInputBlur('phoneNumber')"
        />
        <div v-if="$v.phoneNumber.$error" class="error">
          <span v-if="!$v.phoneNumber.required"> Field is required </span>
          <div v-if="!$v.phoneNumber.validPhoneNumber">
            Invalid phone number format
          </div>
        </div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.password.$error }"
      >
        <label class="label">Password *</label>
        <input
          v-model.trim="password"
          type="password"
          class="input"
          :class="{
            'input -error': $v.password.$error,
          }"
          @blur="onInputBlur('password')"
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
      <div
        class="form-group"
        :class="{ 'form-group -error': $v.rePassword.$error }"
      >
        <label class="label">Confirm password *</label>
        <input
          v-model.trim="rePassword"
          type="password"
          class="input"
          :class="{
            'input -error': $v.rePassword.$error,
          }"
          @blur="onInputBlur('password')"
        />
        <div v-if="$v.rePassword.$error" class="error">
          <span v-if="!$v.rePassword.required"> Field is required </span>
          <span v-if="!$v.rePassword.isValid">
            Confirmed password must be same as password
          </span>
        </div>
      </div>
      <div class="form-buttons">
        <button
          class="submit-button"
          :class="{
            'submit-button -disabled':
              submitStatus === 'PENDING' || !submitStatus,
          }"
          :disabled="submitStatus === 'PENDING' || !submitStatus"
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
    onInputBlur(value) {
      return this.$v[value].$touch()
    },
  },
}
</script>

<style lang="scss" scoped>
.register-page {
  background-color: #fff;
  padding: 2rem 0;
  min-height: 100vh;

  > .register-form {
    margin: 0 auto;
    width: 300px;
  }
}

.register-form {
  border: 2px solid black;

  > .form-group {
    margin: 0.5rem 0;
  }
}

.submit-button {
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &.-disabled {
    background: #999;
    transition: background 0.3s ease-in-out;
  }
}

.form-group {
  padding: 0 2rem;

  > .input {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 1rem;

    &.-error {
      border: 2px solid red;
    }
  }

  &.-error {
    color: red;
    display: flex;
    flex-direction: column;
  }
}

.input-group {
  display: flex;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .submit-button {
    margin: 0.5rem 0;
  }
}
</style>
