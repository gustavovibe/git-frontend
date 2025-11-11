<template>
    <div
			style="
				flex: 0.3;
				border-style: solid;
				border-color: #82cf45;
				padding: 1rem;
				border-radius: 10px;
			"
		>
			<img
				src="/public/images/destinations/europe/spain.jpg"
				alt=""
				style="width: 100%; border-radius: 10px"
			/>
			<h1>Best of Southern Spain</h1>
			<div style="display: flex; align-items: center; gap: 0.5rem">
				<p style="display: flex; align-items: center; margin: 0">
					<svg
						class="w-5 h-5 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 20 26"
						style="padding-left: 5px; padding-right: 5px"
					>
						<path
							stroke="#F9E51B"
							stroke-width="2"
							d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
						/>
					</svg>
					<label
						style="
							background-color: #82cf45;
							padding: 5%;
							border-radius: 5px;
							color: white;
						"
					>
					 {{travelData.qualification}}
					</label>
				</p>

				<p style="margin: 0">{{ travelData.reviews }} reviews</p>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem; margin-top:5%">
				<p style="display: flex; align-items: center; margin: 0">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="#82CF45"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
						/>
					</svg>
				</p>
				<label>Starts on:{{ travelData.starts }}</label>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem; margin-top:5%">
				<p style="display: flex; align-items: center; margin: 0">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="#82CF45"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
						/>
					</svg>
				</p>
				<label>Ends on:{{ travelData.ends }}</label>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem; margin-top:5%">
				<p style="display: flex; align-items: center; margin: 0">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="#82CF45"
							stroke-linecap="round"
							stroke-width="2"
							d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
					</svg>
				</p>
				<label>Travelers:  <a>{{travelData.adults}}</a> adults, <a>{{travelData.kids}}</a> kids, <a>{{travelData.infants}}</a> infants</label>
			</div>
			<div style="display: flex; align-items: center; gap: 0.5rem; margin-top:5%">
				<p style="display: flex; align-items: center; margin: 0">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="#82CF45"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z"
						/>
					</svg>
				</p>
				<label>Operated by: {{ travelData.operator }}</label>
			</div>
			<div
				class="col-4 lg:col-2 flex align-content-center flex-wrap"
				style="width: 80%"
			>
				<button
					class="font-interstate back-orange-vibe text-white mx-auto border-round"
					style="padding: 0.8rem 3rem; margin-top:5%"
					@click="test()"
				>
					View Adventure
				</button>
			</div>
		</div>
</template>

<script setup>

const props=defineProps({
	travelD:{
		type:Object,
		Required:true
	}
});


const travelData = props.travelD;
/* 	adults: 2,
	kids: 2,
	infants: 0,
	operator: "TruTravels",
	starts: "18/01/2024",
	ends: "18/01/2024",
	qualification: 4.8,
	reviews: 54, */

</script>