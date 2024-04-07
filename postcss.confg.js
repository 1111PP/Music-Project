module.exports = {
  plugins: {
    autoprefixer: {},
    // flexible配置
    'postcss-pxtorem': {
      rootValue: 25, // 设计稿宽度的1/10，假设设计稿的宽度为750px
      proplist: ['*'], //需要作转化处理的属性：如height、width、margin
    },
  },
}
