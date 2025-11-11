<style scoped>
@font-face {
  font-family: "Canaro";
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

@font-face {
  font-family: "Interstate";
  src: url(/fonts/Interstate-regular.ttf);
  font-weight: 100 !important;
}

* {
  font-family: "Canaro";
  font-size: 18px;
}

.p-0 {
  padding: 0;
}

.social-button {
  width: 100%;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  color: white;
}

.google-button {
  background: #4286f7;
}

.facebook-button {
  background: #505050;
}

.login-button {
  background: #82cf45;
  margin-bottom: 20px;
}

.divisor {
  color: black;
  width: 100%;
  height: 1px;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

.login-link {
  text-decoration: underline;
  text-decoration-color: #82cf45;
  text-decoration-thickness: 2px;
}

.justify-center {
  text-align: center;
}

.input-container {
  margin: 20px auto;
}

.input-container .p-inputtext {
  width: 100%;
}

.items-center {
  margin-top: 20px;
}

.login-box {
  padding: 2rem;
  margin-top: 30px;
}

.text-black {
	color: black;
}

/* #google-signin div {
    width: 110% !important;
		height: 50%;
    min-width: 300px !important;

  } */

iframe{
  margin: auto !important;
}
</style>

<template>
  <Toast/>
  <TabView :pt="{ inkbar: { class: 'hidden login-tab' } }" v-model:activeIndex="activeTabIndex">
    <TabPanel v-if="!isLoggedIn"  header="Log in">
      <div class="login-box">
        <!-- Google button -->
        <div class="flex justify-center mt-20 justify-content-center">
          <div id="google-signin-login"></div>
        </div>

        <!-- facebook button -->
        <div class="flex justify-center mt-3">
<!--          <Button outlined class="border-0 facebook-button social-button">
            <img src="/facebook.svg"/>
            Continue with Facebook
          </Button>-->
        </div>

        <!-- or -->
        <div class="flex items-center">
          <hr class="divisor"/>
          <div class="middle-or">or</div>
          <hr class="divisor"/>
        </div>

        <!-- Form -->
        <div class="card input-container">
          <FloatLabel>
            <InputText id="email" v-model="email"/>
            <label for="email">Enter your Email</label>
          </FloatLabel>
        </div>
				<div class="card input-container">
						<FloatLabel>
							<InputGroup>
								<InputText
									:type="showPassword ? 'text' : 'password'"
									id="password"
									v-model="password"
								/>
								<Button 
									 :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
									@click="togglePassword(1)"
									severity="secondary"
									outlined
								/>
							</InputGroup>
							<label for="password">Enter your Password</label>
						</FloatLabel>
					</div>

        <div class="flex justify-center mt-2">
          <Button
              outlined
              class="border-0 login-button social-button"
              @click="login()"
          >
            Log in
          </Button>
        </div>
				<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
        <div class="col-12 justify-center">
          <p class="login-text"  >Forgot your password?</p>
          <a class="login-link cursor-pointer" @click.prevent="reset_pass = true">Click here to reset</a>
        </div>
      </div>
    </TabPanel>
    <TabPanel v-if="!isLoggedIn" header="Sign up">
      <div class="login-box">
        <!-- Google button -->
        <div class="flex justify-center mt-20 justify-content-center">
          <div id="google-signin-signup"></div>
        </div>

        <!-- facebook button -->
        <div class="flex justify-center mt-3">
<!--          <Button outlined class="border-0 facebook-button social-button">
            <img src="/facebook.svg"/>
            Continue with Facebook
          </Button>-->
        </div>

        <!-- or -->
        <div class="flex items-center">
          <hr class="divisor"/>
          <div class="middle-or">or</div>
          <hr class="divisor"/>
        </div>

        <!-- Form -->
        <div class="card input-container">
          <FloatLabel>
            <InputText id="name" v-model="name"/>
            <label for="name">Full name</label>
          </FloatLabel>
        </div>
        <div class="card input-container">
          <FloatLabel>
            <InputText id="email" v-model="email"/>
            <label for="email">Email address</label>
          </FloatLabel>
        </div>
				<div class="card input-container">
						<FloatLabel>
							<InputGroup>
								<InputText
									:type="showPassword ? 'text' : 'password'"
									id="password"
									v-model="password"
								/>
								<Button 
									 :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
									@click="togglePassword(1)"
									severity="secondary"
									outlined
								/>
							</InputGroup>
							<label for="password">Enter your Password</label>
						</FloatLabel>
					</div>
				<div class="card input-container">
						<FloatLabel>
							<InputGroup>
								<InputText
									:type="showPassword2 ? 'text' : 'password'"
									id="password"
									v-model="confirmpassword"
								/>
								<Button 
									 :icon="showPassword2 ? 'pi pi-eye-slash' : 'pi pi-eye'"
									@click="togglePassword(2)"
									severity="secondary"
									outlined
								/>
							</InputGroup>
							<label for="password">Confirm Password</label>
						</FloatLabel>
					</div>
   <!--      <div class="card input-container">
          <FloatLabel>
            <InputText id="confirmpassword" v-model="confirmpassword"/>
            <label for="confirmpassword">Confirm Password</label>
          </FloatLabel>
        </div> -->
        <div class="card input-container">
          <FloatLabel>
            <Dropdown style="width: 100%;" id="country" editable  v-model="country" :options="country_list" optionLabel="name" optionValue="t_country_id"/>
            <label for="country">Country</label>
          </FloatLabel>
        </div>
        <div class="col-12 justify-center">
          <p class="interstate-font text-base text-black">
            By proceeding, you accept our
          	<a class="interstate-font text-base text-green-vibe" href="https://vibeadventures.com/privacy-policy/" target="_blank">Data Policy.</a>
          </p>
        </div>
        <div class="flex justify-center mt-2">
          <Button
              outlined
              class="border-0 login-button social-button"
              @click="submitRegistry()"
          >
            Sign up
          </Button>
        </div>
				<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
      </div>
    </TabPanel>
		<TabPanel  v-if="isLoggedIn" header="Log out">
			<div style="text-align: center;">
				<h2>Are you sure you want to continue?</h2>
			</div>
			<p> This will log you out on the selected devices.</p>
			<hr>
			<Button style="height: 50px;"
              outlined
              class="border-0 login-button social-button"
              @click="logout()"
          >
            Log out
          </Button>
					<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
		</TabPanel>
  </TabView>

	<Dialog v-model:visible="reset_pass" header="Reset Password" dismissableMask modal style="width: 400px;">
    <div style="margin-top: 2%; padding: 2%;">
			<ResetPassword />
		</div>  
        </Dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import { useAuthStore } from "~/store/autStore";
import { useToast } from "primevue/usetoast";
import { useProfileStore } from "~/store/profileStore";
import { useRuntimeConfig } from "#app";
import { useRouter,useRoute } from 'vue-router';
import ProgressBar from "primevue/progressbar";
import Dialog from "primevue/dialog";
import { generalFunctions } from "~/store/general";
import { useDestinationStore } from '~/store/destinationStore';
import Dropdown from 'primevue/dropdown';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const destinationStore = useDestinationStore();
const generalFunction=generalFunctions();
const reset_pass=ref(false);
const loading =ref(false);
const isLoggedIn = ref(false);
const config = useRuntimeConfig();
const url = ref(config.public.BACKEND_URL);
const googleClientId = config.public.GOOGLE_CLIENT_ID;
const profileStore = useProfileStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();
const activeTabIndex = ref(0);
const userProfile = ref(null);

const authStore = useAuthStore();
const email = ref(null);
const password = ref(null);
const confirmpassword = ref(null);
const name = ref(null);
const country = ref(null);
const country_list = ref(null);



const showPassword = ref(false);
const showPassword2 = ref(false);

const togglePassword = (val) => {
	if(val==1){
		showPassword.value = !showPassword.value;
	}else{
		showPassword2.value = !showPassword2.value;
	}
};

// Function to handle Google login response and save user details
const handleCredentialResponse = async (response) => {
  const token = response.credential;

  try {
		loading.value=true;	
		if (window.abortAllPendingRequests) window.abortAllPendingRequests();
    const userData = await submitGoogle(token);
    console.log("User data from Google:", userData);


    // Store user data in localStorage
    localStorage.setItem("user_id", userData.user.id);
    localStorage.setItem("name", userData.user.name);
    localStorage.setItem("email", userData.user.email);
    localStorage.setItem("profile_id", userData.user.profile_id);
    localStorage.setItem("access_token", userData.access_token);

	

    userProfile.value = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      imageUrl: userData.imageUrl,
    };

    showNotification("success", "Login", `Welcome, ${userData.user.name}!`);

    setTimeout(() => {
      profileStore.closeModalProfile();
      /* router.push(`/my-trips?user_id=${userData.id}`); */
	  	window.location.href = '/';
    }, 3000);

  } catch (error) {
    console.error("Google login error:", error);
    showNotification("error", "Login", "Google login failed");
  }finally{
		loading.value=false;
	}
};

// Function to render Google Sign-In button
const renderGoogleButton = () => {
  let googleSignInElement;

  if (activeTabIndex.value === 0) {
    googleSignInElement = document.getElementById("google-signin-login");
  } else if (activeTabIndex.value === 1) {
    googleSignInElement = document.getElementById("google-signin-signup");
  }

  if (googleSignInElement) {
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(googleSignInElement, { theme: "outline", size: "large" });
  }
};

const clearGoogleButton = () => {
  const loginElement = document.getElementById("google-signin-login");
  const signupElement = document.getElementById("google-signin-signup");
  if (loginElement) loginElement.innerHTML = "";
  if (signupElement) signupElement.innerHTML = "";
};


const logout = async () => {
	try {
		loading.value = true;
		if (window.abortAllPendingRequests) window.abortAllPendingRequests();

		// Aplicar un timeout de 10s para evitar que se quede colgado
		const response = await Promise.race([
			authStore.LogOut(url.value),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error("Request timeout")), 10000)
			),
		]);

		console.log("contenido logout:", response);
			setTimeout(() => {
				showNotification("success", "Logout", `See you later`);
				profileStore.closeModalProfile();
				window.location.href = "/";
			}, 3000);
	} catch (error) {
		console.log("error:", error);
		showNotification("error", "Logout error", error.message || "An error occurred.");
	} finally {
		["access_token", "user_id", "name", "email", "profile_id"].forEach(key => localStorage.removeItem(key));
		loading.value = false;
		console.log("Token después de eliminar:", localStorage.getItem("access_token"));
	}
};



watch(activeTabIndex, () => {
  clearGoogleButton();
  renderGoogleButton();
});

// Function to show notifications
const showNotification = (severity, title, message) => {
  toast.add({ severity: severity, summary: title, detail: message, life: 3000 });
};

// Manual registration function
const submitRegistry = async () => {
  const params = {
    name: name.value,
    email: email.value,
    password: password.value,
    country: country.value,
  };
	try{
		const evalidate=generalFunction.emailValidate(params.email);
		const econfirm= generalFunction.emailConfirm(password.value,confirmpassword.value);
		if(evalidate && econfirm){

			loading.value=true;
			if (window.abortAllPendingRequests) window.abortAllPendingRequests();
			const userId = await authStore.submitRegistry(params, url.value);
			if(!userId.success){
				console.log('error de registro',userId.message);
				showNotification("error", "Sign up", userId.message, 8000);
				return 2;
			}
			if(userId.status){

				localStorage.setItem("access_token", userId.access_token);
        localStorage.setItem("user_id", userId.user.id);
        localStorage.setItem("name", userId.user.name);
        localStorage.setItem("email", userId.user.email);
        localStorage.setItem("profile_id", userId.user.profile_id);
        showNotification("success", "Sign up", "Successful registration");

        profileStore.closeModalProfile();
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);

			}else{
				showNotification("error", "Sign up", userId.message);
			}
			
			
		}else{
			toast.add({ severity: 'error', summary: 'Oppss!!', detail: !evalidate?'The current email doesnt have a validate format':'Please confirm password', life: 3000 });

		}
		
	}catch{
		showNotification("error", "Sign up", "Sign up failed");
	}finally{
		["access_token", "user_id", "name", "email", "profile_id"].forEach(key => localStorage.removeItem(key));
		loading.value=false;
		//window.location.reload();
	}
			
};

// Manual login function
const login = async () => {

  const params = { email: email.value, password: password.value };
  try {

		loading.value=true;
		if (window.abortAllPendingRequests) window.abortAllPendingRequests();

    const userId = await authStore.login(params, url.value);
		console.log('login data:',userId);
		if(userId.status){
		
			localStorage.setItem("access_token", userId.access_token);	
			localStorage.setItem("user_id", userId.user.id);
			localStorage.setItem("name", userId.user.name);
			localStorage.setItem("email", userId.user.email);
			localStorage.setItem("profile_id", userId.user.profile_id);
			showNotification("success", "Login", `Successful login, welcome ${userId.user.name}`);

			profileStore.closeModalProfile();
			setTimeout(() => {
        window.location.href = '/';
      }, 1000);

		} else {
      showNotification("error", "Login", "Unsuccessful login");
    }
		

  } catch {
    showNotification("error", "Login", "Unsuccessful login");
  }finally{
		loading.value=false;
	}
};

// Google sign-in API call
const submitGoogle = async (token) => {

  if (window.abortAllPendingRequests) window.abortAllPendingRequests();

  const resp = await fetch(`${url.value}/api/google-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return resp.json();
};



const countryList = async ()=>{
	try{
     const response= await destinationStore.GetCountries({},url.value); 
		 if(response.success){
			country_list.value=response.data;
			console.log('contenido de country',country_list.value)
		 }
	}catch(error){
		console.log(error);
	}
}


onMounted(() => {
  renderGoogleButton();
  if (typeof countryList === 'function') countryList();
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('access_token');	
	console.log('contenido de token',token)
  isLoggedIn.value = !!userId; 
	if (!window.__fetchPatched) {
    const originalFetch = window.fetch.bind(window);
    window.__abortControllers = [];
    window.fetch = (input, init = {}) => {
      try {
        if (init && init.signal) {
          return originalFetch(input, init);
        }
        const controller = new AbortController();
        const newInit = Object.assign({}, init, { signal: controller.signal });
        window.__abortControllers.push(controller);
        return originalFetch(input, newInit).finally(() => {
          const idx = window.__abortControllers.indexOf(controller);
          if (idx > -1) window.__abortControllers.splice(idx, 1);
        });
      } catch (err) {
        return originalFetch(input, init);
      }
    };
    window.abortAllPendingRequests = () => {
      try {
        (window.__abortControllers || []).forEach(c => {
          try { c.abort(); } catch (e) {}
        });
      } finally {
        window.__abortControllers = [];
      }
    };
    window.__fetchPatched = true;
  }
});
</script>

