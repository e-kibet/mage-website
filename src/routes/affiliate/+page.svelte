<script lang="ts">
	import ItemPlan from '$lib/components/Affiliate/ItemPlan.svelte'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { env } from '$env/dynamic/public'

	let plans: any = [
		{
			name: 'Free',
			// description:
			// 	'Great for individuals just getting started with streaming and learning the platform.',
			price: 0,
			features: [
				'Unlimited channels',
				'Up to 9 guests in a live-stream',
				'AI chat fully enabled',
				'Up to 100 messages in chat history',
				'Record and view streaming stats'
			],
			features2: []
		},
		{
			name: 'Affiliate',
			// description:
			// 	'Perfect for dedicated streamers looking to grow their brand and expand their reach.',
			price: 4,
			features: [
				'Everything in Free Tier',
				'Expanded reach for brand growth',
				'GPT-4 access (once available)',
				'Unlimited chat history',
				'Dedicated support'
			],
			features2: ['An affiliate badge', 'Modified avatar', 'Sponsor contributions (once available)']
		}
	]

	onMount(() => {})
</script>

<!-- <section>
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold">Designed for dedicated streamers</h2>
			<p class="mb-5 font-light text-gray-500 sm:text-xl">
				Collaborative streaming powered by AI. Expand your reach and grow your brand.
			</p>
			<div class="flex gap-2 justify-center">
				<span>
					<a class="mb-5 link link-secondary" href={env.PUBLIC_STRIPE_BILLING_URL}
						>Manage your subscription</a>
					🔹
					<a class="mb-5 link link-secondary" href="https://forms.gle/mBtByR6jdoJeQd367"
						>Apply for verification</a>
				</span>
			</div>
		</div>

		<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
		<stripe-pricing-table
			pricing-table-id="prctbl_1NbAbPGCjE5yZMc3D6mOSbxd"
			publishable-key="pk_test_zNzh2o1OkU21yGQAhUW6W0Yp00Z19jXMyA"
			client-reference-id={$page.data.user?.userId} />
	</div>
</section> -->

<section>
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
			<h2 class="mb-4 text-4xl tracking-tight font-extrabold">Designed for dedicated streamers</h2>
			<p class="mb-5 font-light text-gray-500 sm:text-xl">
				Collaborative streaming powered by AI. Our platform is designed to expand your reach and
				grow your brand.
			</p>
			<div class="flex gap-2 justify-center">
				<span>
					<a class="mb-5 link link-secondary" href={env.PUBLIC_STRIPE_BILLING_URL}
						>Manage your subscription</a>
					🔹
					<a class="mb-5 link link-secondary" href="https://forms.gle/mBtByR6jdoJeQd367"
						>Apply for verification</a>
				</span>
			</div>
		</div>
		<div class="md:flex">
			{#each plans as plan}
				<ItemPlan {plan} />
			{/each}
		</div>
	</div>
</section>
