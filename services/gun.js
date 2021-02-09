import Gun from 'gun/gun'

import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'

import 'gun/sea'

import store from './store/user'

/* Variables */
const peers = process.env.VUE_APP_PEERS && process.env.VUE_APP_PEERS.split(',')
const scope = process.env.VUE_APP_NAMESPACE || 'dev.helvellyn.gun'

/* Global Initialization */

const gun = Gun({ peers, localStorage: false })

const user = gun.user().recall({ sessionStorage: true }, function (ack) {
  store.afterAuth(ack)
})

/* Export */

export {
  gun,
  scope,
  user
}

export default gun
