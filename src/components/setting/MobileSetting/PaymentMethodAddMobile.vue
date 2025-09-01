<template>
  <div class="min-h-screen bg-[#F6F7F9] p-4 pb-28">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <button @click="goBack" class="text-gray-800 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="text-lg font-semibold">Add New Card</h1>
    </div>

    <!-- Form -->
    <form class="space-y-5" @submit.prevent="connectCard">
      <!-- Holder -->
      <div>
        <label class="block text-sm text-gray-700 mb-2">Card Holder Name</label>
        <input
          v-model.trim="holder"
          type="text"
          autocomplete="cc-name"
          placeholder="Siti Tirta Dinar"
          class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#2563EB] outline-none"
        />
      </div>

      <!-- Brand picker -->
      <div>
        <label class="block text-sm text-gray-700 mb-2">Card Types</label>
        <button
          type="button"
          class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left flex items-center justify-between"
          @click="openPicker = true"
        >
          <span class="flex items-center gap-3">
            <img :src="selected.logo" class="w-7 h-5 object-contain" />
            <span class="text-[15px]">{{ selected.label }}</span>
          </span>
          <i class="fas fa-chevron-down text-gray-400"></i>
        </button>
      </div>

      <!-- Card number -->
      <div>
        <label class="block text-sm text-gray-700 mb-2">Card Number</label>
        <input
          :value="cardNumber"
          @input="onCardNumberInput(($event.target && $event.target.value) || '')"
          inputmode="numeric"
          autocomplete="cc-number"
          placeholder="4032 8739 0081 6621"
          class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[15px] tracking-wider focus:ring-2 focus:ring-[#2563EB] outline-none"
        />
        <p v-if="cardNumberRaw && !isCardNumberValid" class="mt-1 text-xs text-red-600">
          Invalid card number.
        </p>
      </div>

      <!-- Expiry & CVV -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-gray-700 mb-2">Expired Date</label>
          <input
            :value="expiry"
            @input="onExpiryInput(($event.target && $event.target.value) || '')"
            inputmode="numeric"
            autocomplete="cc-exp"
            placeholder="12/28"
            class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#2563EB] outline-none"
          />
          <p v-if="expiry && !isExpiryValid" class="mt-1 text-xs text-red-600">
            Invalid expiry (MM/YY).
          </p>
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-2">CVV</label>
          <input
            :value="cvv"
            @input="onCvvInput(($event.target && $event.target.value) || '')"
            :maxlength="selected.cvv"
            inputmode="numeric"
            autocomplete="cc-csc"
            :placeholder="selected.cvv === 4 ? '1234' : '342'"
            class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#2563EB] outline-none"
          />
          <p v-if="cvv && !isCvvValid" class="mt-1 text-xs text-red-600">
            CVV must be {{ selected.cvv }} digits.
          </p>
        </div>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="!isFormValid || loading"
        class="mt-2 w-full bg-[#2563EB] hover:bg-[#1E55D6] text-white font-semibold py-4 rounded-2xl disabled:bg-[#9CB9F5] disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Connect Card</span>
        <span v-else class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"/>
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
          </svg>
          Processing…
        </span>
      </button>
    </form>

    <!-- Bottom sheet -->
    <transition name="fade">
      <div v-if="openPicker" class="fixed inset-0 z-50 bg-black/30" @click.self="openPicker = false">
        <div class="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl p-4 shadow-xl">
          <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div
            v-for="b in brands"
            :key="b.id"
            class="flex items-center justify-between px-2 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100"
            @click="selectBrand(b)"
          >
            <div class="flex items-center gap-3">
              <img :src="b.logo" class="w-8 h-6 object-contain" />
              <span class="text-[15px]">{{ b.label }}</span>
            </div>
            <i v-if="b.id === brand" class="fas fa-check text-[#2563EB]"></i>
          </div>
          <button class="mt-2 w-full text-center px-3 py-3 rounded-xl border border-gray-200" @click="openPicker = false">
            Cancel
          </button>
        </div>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg">
        {{ toast }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// gunakan import (bukan require) agar aman di Vite/webpack
import mcLogo from "@/assets/pay-mastercard.png";
import visaLogo from "@/assets/pay-visa.png";
import appleLogo from "@/assets/pay-apple.png"; // pastikan file ada

const router = useRouter();

/* state */
const holder = ref("Siti Tirta Dinar");
const brand = ref("mastercard");
const openPicker = ref(false);

const brands = [
  { id: "mastercard", label: "Master Card", cvv: 3, mask: "#### #### #### ####", logo: mcLogo },
  { id: "visa", label: "Visa", cvv: 3, mask: "#### #### #### ####", logo: visaLogo },
  { id: "apple", label: "Apple Pay", cvv: 4, mask: "#### ###### #####", logo: appleLogo },
];

const selected = computed(() => brands.find(b => b.id === brand.value));

const cardNumber = ref("");
const cardNumberRaw = ref("");
const expiry = ref("");
const cvv = ref("");

const loading = ref(false);
const toast = ref("");
let toastTimer;

function goBack(){ router.back(); }
function flash(msg){ toast.value = msg; clearTimeout(toastTimer); toastTimer = setTimeout(()=> toast.value="",1600); }
function onlyDigits(s){ return (s || "").replace(/\D+/g, ""); }
function formatByMask(digits, mask){
  let out = "", di = 0;
  for (let i=0; i<mask.length && di<digits.length; i++){
    out += mask[i] === "#" ? digits[di++] : mask[i];
  }
  return out;
}
function luhnOK(numStr){
  let sum=0, dbl=false;
  for(let i=numStr.length-1;i>=0;i--){
    let d=+numStr[i]; if(dbl){ d*=2; if(d>9)d-=9; } sum+=d; dbl=!dbl;
  }
  return sum%10===0;
}

/* handlers */
function onCardNumberInput(v){
  const digits = onlyDigits(v);
  cardNumberRaw.value = digits;
  cardNumber.value = formatByMask(digits, selected.value.mask);
}
function onExpiryInput(v){
  let d = onlyDigits(v).slice(0,4);
  if (d.length >= 1){
    let mm = d.slice(0,2);
    if (mm.length === 1 && +mm > 1) mm = "0"+mm;
    if (mm.length === 2){
      let m = +mm; if (m === 0) mm = "01"; if (m > 12) mm = "12";
    }
    d = mm + d.slice(mm.length);
  }
  expiry.value = d.length <= 2 ? d : d.slice(0,2)+"/"+d.slice(2);
}
function onCvvInput(v){ cvv.value = onlyDigits(v).slice(0, selected.value.cvv); }
function selectBrand(b){
  brand.value = b.id;
  onCardNumberInput(cardNumberRaw.value);
  onCvvInput(cvv.value);
  openPicker.value = false;
}

/* validation */
const isHolderValid = computed(()=> holder.value.trim().length >= 3);
const isCardNumberValid = computed(()=>{
  const lenOK = brand.value === "amex" ? cardNumberRaw.value.length === 15
                                       : cardNumberRaw.value.length === 16;
  return lenOK && luhnOK(cardNumberRaw.value);
});
const isExpiryValid = computed(()=>{
  if(!/^\d{2}\/\d{2}$/.test(expiry.value)) return false;
  const [mm, yy] = expiry.value.split("/").map(n=>+n);
  if(mm<1 || mm>12) return false;
  const now = new Date();
  const y = 2000 + yy;
  const end = new Date(y, mm, 0); end.setHours(23,59,59,999);
  return end >= now;
});
const isCvvValid = computed(()=> cvv.value.length === selected.value.cvv);
const isFormValid = computed(()=> isHolderValid.value && isCardNumberValid.value && isExpiryValid.value && isCvvValid.value);

/* submit */
async function connectCard(){
  if(!isFormValid.value || loading.value) return;
  loading.value = true;
  try{
    // TODO: panggil API/tokenisasi
    await new Promise(r=>setTimeout(r,900));
    flash("Card connected");
    router.replace("/payment");
  }catch(e){
    flash("Failed to connect card");
  }finally{
    loading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .18s ease; }
.fade-enter-from,.fade-leave-to{ opacity:0; }
</style>
