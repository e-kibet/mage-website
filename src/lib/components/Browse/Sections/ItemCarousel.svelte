<script lang="ts">
	import IconViews from '$lib/assets/icons/IconViews.svelte'
	import IconViewers from '$lib/assets/icons/IconViewers.svelte'
	import IconDrawerVerification from '$lib/assets/icons/drawer/IconDrawerVerification.svelte'
	import { category_list } from '$lib/stores/channelStore'
	import { getNumberInThousands } from '$lib/utils'

	export let channel: any = {}

	let bg_cover = channel.thumbnail || '/placeholder/programming-placeholder.jpg'
</script>

<a
	class="swiper-slide rounded-md bg-black h-fit"
	href="/channel/{channel._id}"
	style="background-image: url({bg_cover}); background-size: cover; background-repeat: no-repeat;">
	<div class="flex flex-col justify-between p-3 w-full h-full">
		<div class="flex flex-row justify-between">
			<div class="flex gap-2 mb-3">
				{#if channel.isLive}
					<span
						class="btn btn-sm rounded-md font-medium text-white border-none flex items-center bg-red-700 hover:bg-red-700">
						LIVE
					</span>
				{/if}
				<div
					class="tooltip"
					data-tip="{getNumberInThousands(channel.viewDetails?.count || 0)} views">
					<span class="btn btn-sm rounded-md font-medium gap-2 btn-neutral text-white border-none">
						<IconViews />
						{getNumberInThousands(channel.viewDetails?.count || 0)}
					</span>
				</div>
				<div class="tooltip" data-tip="{getNumberInThousands(channel.memberCount || 0)} watching">
					<span class="btn btn-sm rounded-md font-medium gap-2 btn-neutral text-white border-none">
						<IconViewers />
						{getNumberInThousands(channel.memberCount || 0)}
					</span>
				</div>
			</div>
			<div class="flex flex-wrap">
				{#if channel.category && channel.category.length}
					{#each channel.category as category}
						<div class="tooltip" data-tip={category}>
							<img src={$category_list[category]} alt="" class="h-7 w-7 m-1" />
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="space-y-2">
			<p class="text-2xl truncate text-white font-semibold">{channel.title || ''}</p>
			<div class="flex flex-row items-center gap-2">
				<div class="avatar">
					<div
						class="w-14 mask {channel?.planDetails?.planTier > 1
							? 'mask-hexagon'
							: 'mask-squircle'}">
						<img src={channel.userDetails.avatar} alt="" />
					</div>
				</div>
				<div class="w-4/5 flex gap-1">
					<p class="truncate text-white">
						@{channel.userDetails.username}
					</p>
					{#if channel.planDetails?.planTier > 1}
						<div class="text-accent font-bold">
							<IconDrawerVerification />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</a>
