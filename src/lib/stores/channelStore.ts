import { writable, type Writable } from 'svelte/store'

export const category_list: Writable<any> = writable({})
export const tags: Writable<any> = writable([])
export const category_assets: Writable<{
	game: object
	dev: object
}> = writable({ game: {}, dev: {} })
export const is_chat_drawer_open: Writable<boolean> = writable(false)
export const is_chat_drawer_destroy: Writable<boolean> = writable(false)
export const was_chat_drawer_closed: Writable<boolean> = writable(false)

export const is_restream_drawer_open: Writable<boolean> = writable(false)
