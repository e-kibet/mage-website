import { getUserDetails } from '$lib/stores/authStore'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const userId = event.url.searchParams.get('userId') || event.cookies.get('userId') || ''
	let token = event.url.searchParams.get('token') || event.cookies.get('token') || ''
	let user

	if (event.locals && event.locals.user) {
		user = event.locals.user.user
	}

	if (!token || !userId) {
		return await resolve(event)
	}

	if (token && userId) {
		if (!user) {
			const response = await getUserDetails(token, userId)
			if (response) {
				if (response.freshJwt) {
					token = response.freshJwt
				}
				user = response
			}
		}

		event.cookies.set('token', token)
		event.cookies.set('userId', userId)
		event.locals.user = {
			userId,
			token,
			user
		}
	}

	return await resolve(event)
}

export function handleError({ error, event }) {
	console.log('error', error)
	return {
		message: 'Whoops something wrong!'
	}
}

// const isAdminPage = /^\/admin\/(.*)/.test(route.id)
// const isProfilePage = /^\/profile\/(.*)/.test(route.id)
// const isPremiumPage = /^\/premium\/(.*)/.test(route.id)
// await getRemoteConfigs()
// if (isMaintenanceModeEnabled) {
//     if (locals.user.user.isAdmin) {
//         throw redirect(302, '/maintenance')
//     }
// } else {
//     if (!locals.user) {
//         throw redirect(302, '/browse')
//     } else {
//         if (locals.user.user.isBanned) {
//             throw redirect(308, '/banned')
//         }

//         if (isAdminPage && !locals.user.user.isAdmin) {
//             throw redirect(302, '/browse')
//         }
//     }
// }

// import { remoteConfigStore } from '$lib/stores/remoteConfigStore'
// import type { Handle, HandleServerError, RequestEvent } from '@sveltejs/kit'
// import type { MaybePromise } from '@sveltejs/kit/types/private'
// import { authStore } from '$lib/stores/authStore'

// export const handle = (async ({ event, resolve }: { event: RequestEvent, resolve: MaybePromise<Response> }) => {
//     const isAdminPage = /^\/admin\/(.*)/.test(event.url.pathname)
//     const isHomePage = /^\/home\/(.*)/.test(event.url.pathname)
//     const isProfilePage = /^\/profile\/(.*)/.test(event.url.pathname)
//     const isPremiumPage = /^\/premium\/(.*)/.test(event.url.pathname)
//     const isChannelPage = /^\/channel\/(.*)/.test(event.url.pathname)
//     await remoteConfigStore.getRemoteConfigs()
//     const isMaintenanceModeEnabled = remoteConfigStore.isMaintenanceModeEnabled

//     const jwtToken = event.url.searchParams.get('token')
//     const userId = event.url.searchParams.get('userId')

//     if (jwtToken) authStore.setJWT({ jwt: jwtToken })
//     if (userId) authStore.setUserId({ userId })
//     const user = await authStore.me()
//     if (user) {
//         if (user.status == 401 || user.status == 500) {
//             await authStore.logout()
//         } else if (user.isBanned) {
//             // this.snackBar.open(
//             //     'Your account is banned. Please contact support if you have any questions',
//             //     null,
//             //     { duration: 10000 }
//             // )
//             await authStore.logout()
//         } else {
//             // try {
//             //     const onConnectionSuccess = async () => {
//             //         await this.socket.emitUserConnection(user._id, true)
//             //         this.socket.listenToUserConnection(user._id).subscribe(async (data) => {
//             //             authStore.setUser(data.user)
//             //         })
//             //     }
//             //     if (this.socket.apiSocket.readyState == WebSocket.OPEN) await onConnectionSuccess()

//             // } catch (e) {
//             //     console.log(e)
//             // }
//             return {
//                 status: 302,
//                 redirect: '/home'
//             }
//         }
//     } else {
//         return {
//             status: 302,
//             redirect: '/login'
//         }
//     }

//     // if (
//     //     !event.locals.session.user &&
//     //     (isAdminPage || isHomePage || isProfilePage || isPremiumPage || isChannelPage)
//     // ) {
//     //     return {
//     //         status: 302,
//     //         redirect: '/login'
//     //     }
//     // } else {
//     //     if (isMaintenanceModeEnabled) {
//     //         if (!event.locals.session.user.isAdmin) {
//     //             return {
//     //                 status: 302,
//     //                 redirect: '/maintenance'
//     //             }
//     //         } else return { props: {} }
//     //     } else return { props: {} }
//     // }
// })

// export const handleError = (({ error, event }) => {
//     const errorId = crypto.randomUUID();
//     // example integration with https://sentry.io/
//     // Sentry.captureException(error, { event, errorId });

//     return {
//         message: 'Whoops!',
//         errorId
//     };
// }) satisfies HandleServerError;
