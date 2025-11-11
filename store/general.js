import {defineStore} from 'pinia';

export const generalFunctions = defineStore('general', () => {
    
     function emailValidate(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function emailConfirm(email,confirm){
        return email==confirm? true:false;
    }

    function roundUpToNextMultipleOfTen(value) {
        return Math.ceil(value / 10) * 10;
      }

    return {
        emailValidate,
        emailConfirm,
        roundUpToNextMultipleOfTen,
    }
});