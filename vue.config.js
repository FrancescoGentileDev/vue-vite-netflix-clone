const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,  
})
module.exports = {
  devServer: {
      proxy: 'https://maadhav-ytdl.herokuapp.com'
  } }