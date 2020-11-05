const hosts = {}
if (process.env.NODE_ENV === 'development') {
  hosts.loginurl = 'http://coupon.stage.ktvsky.com/bar/u/vod/wx'
  hosts.ktv_baseurl = 'http://k.stage.ktvsky.com'
  hosts.coupon_baseurl = 'https://m.ktvsky.com/'
  hosts.ws_url = 'http://m.stage.ktvsky.com'
} else {
  hosts.loginurl = 'https://wx.handle.ktvdaren.com/bar/u/vod/wx'
  hosts.ktv_baseurl = 'https://k.ktvsky.com'
  hosts.coupon_baseurl = 'https://m.ktvsky.com'
  hosts.ws_url = 'https://m.ktvsky.com'
}
export default hosts