const Koa = require('koa');
const app = new Koa();
var nodejieba = require("nodejieba");
const convert = require('koa-convert')
nodejieba.load({
  userDict: './userDict/SogouLabDic.txt',
  stopWordDict: './userDict/Stopword.txt'
})
nodejieba.load({
  userDict: './userDict/dict_baidu_utf8.txt',
})
nodejieba.load({
  userDict: './userDict/dict_pangu.txt',
})
nodejieba.load({
  userDict: './userDict/dict_sougou_utf8.txt',
})
nodejieba.load({
  userDict: './userDict/dict_tencent_utf8.txt',
})
nodejieba.load({
  userDict: './userDict/my_dict.txt',
})

var cors = require('koa2-cors');
app.use(cors())

const koaLogger = require('koa-logger')
app.use(convert(koaLogger()))

const body = require('koa-better-body')
app.use(convert(body()))

app.use(async (ctx, next) => {
	let topN = 10
	let words = nodejieba.extract(ctx.request.fields.text, topN)
	ctx.body = {
	  	success: true,
		keyWords: words
	}
	
});

app.listen(3000); 
console.log('server listening')
