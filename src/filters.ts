import Vue from 'vue'
import TimeAgo from 'timeago.js'
import { cry } from 'thor-devkit'
import BigNumber from 'bignumber.js'

const timeAgo = TimeAgo()

Vue.filter('locale', (value: number) => value.toLocaleString())
Vue.filter('date', (timestamp: number) => new Date(timestamp * 1000).toLocaleString())
Vue.filter('ago', (timestamp: number) => timeAgo.format(timestamp * 1000))
Vue.filter('abbr', (id: string) => {
    if (id.length === 66) {
        return `${id.slice(0, 10)}...${id.slice(60)}`
    } else if (id.length === 42) {
        id = cry.toChecksumAddress(id)
        return `${id.slice(0, 8)}...${id.slice(36)}`
    }
    return id
})
Vue.filter('amount', (val: string) => new BigNumber(val).div('1' + '0'.repeat(18)).toFormat())
Vue.filter('checksum', (val: string) => {
    try {
        return cry.toChecksumAddress(val)
    } catch{
        return val
    }
})
