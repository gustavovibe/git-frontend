<template>
  <div class="content">
    <span style="text-decoration: underline;"><h3>Breakdown of price:</h3></span>
    <div class="row flex">
      <div class="col-11">
        <b>Costs Flight </b>(paid to suppliers)
      </div>
      <div class="col-1" style="text-align-last: right;">
        {{ $currency(props.p_flight) }}
      </div>
    </div>
    <div class="row flex">
      <div class="col-10">
        <b>Costs Tour </b>(paid to suppliers)
      </div>
      <div class="col-2" style="text-align-last: right;">
        <span>
          <span style="cursor: pointer;">{{ $currency(props.p_tour) }}</span>
        </span>
      </div>
    </div>
    <div class="row flex">
      <div class="col-11">
        <b>Total </b>
      </div>
      <div class="col-1" style="text-align-last: right;">
        <b>{{ $currency(props.paid) }}</b>
      </div>
    </div>
    <div class="row flex" style="border-radius: 5px; border: solid 1px #82CF45;">
      <div class="col-11">
        <b style="text-decoration: underline;">Total Paid </b>
      </div>
      <div class="col-1" style="color: #82CF45; text-align-last: right;">
        <b>{{ $currency(props.paid * 1.15) }}</b>
      </div>
    </div>
    <div class="row flex" style="font-size: smaller;">
      <div class="col-11">
        <b>Markup</b>
      </div>
      <div class="col-1" style="text-align-last: right;">
        <b>{{ $currency(props.paid * 0.15) }}</b>
      </div>
    </div>
    <div class="row flex" style="font-size: smaller;">
      <div class="col-11">
        <b>Tour Commision</b>
      </div>
      <div class="col-1" style="text-align-last: right;">
        <b>{{$currency(props.commission_value_tour)}}</b>
      </div>
    </div>
    <div class="row flex" style="font-size: smaller;" v-if="props.orderPayment">
      <div class="col-11">
        <b>Strippe Fee</b>
      </div>
      <div class="col-1" style="color: #eb3862; text-align-last: right;">
        <b>-{{ $currency(props.orderPayment.data?.balance_transaction.fee/100) }}</b>
      </div>
    </div>
    <div class="row flex" style="font-size: smaller; border-radius: 5px; border: solid 1px #82CF45;" v-if="props.orderPayment">
      <div class="col-11">
        <b style="text-decoration: underline;">Net Profit</b>
      </div>
      <div class="col-1" style="color: #82CF45; text-align-last: right;">
        <b>{{ $currency(parseFloat((props.paid * 0.15)) + parseFloat(props.commission_value_tour) - parseFloat(props.orderPayment.data?.balance_transaction.fee/100)) }}</b>
      </div>
    </div>
      
    <span style="text-decoration: underline;"><h3>Transactions:</h3></span>
    <div class="row flex" v-if="props.orderPayment">
      <div class="col-2">
        Credit Card
      </div>
      <div class="col-3" >
        <div class="row" style="align-items: center; display: flex;">

          <span style="height: 2rem;">
            XXXX-XXXX-XXXX-{{ props.orderPayment.data?.payment_method_details?.card?.last4 }} 
          </span>
          <img :src="getImageSrc(props.orderPayment.data?.payment_method_details?.card?.brand)" alt="card logo" style="height: 2rem; margin-left: 0.5rem;" />
        </div>
        <span>
        </span>
      </div>
      <div class="col-3">
        {{ $dateFormat(props.orderPayment.data?.charge_details.created) }}
      </div>
      <div class="col-2">
        <b>
          {{ $currencyDecimal(props.orderPayment.data?.charge_details.amount) }}
        </b>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, watch } from 'vue';
import Button from 'primevue/button';

const props = defineProps(['orderPayment', 'p_flight', 'p_tour', 'paid', 'commission_value_tour'])

const images = import.meta.glob('~/assets/*.svg')

function getImageSrc(name) {
  return `/_nuxt/assets/${name}.svg`
}
</script>