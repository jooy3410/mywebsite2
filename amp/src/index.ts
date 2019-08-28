import express = require('express')
import bodyParser = require('body-parser')
import { codes, config } from './config'
import blogtemplate from './blogtemplate'
import projecttemplate from './projecttemplate'
import axios from 'axios'
import * as AmpOptimizer from '@ampproject/toolbox-optimizer'
import * as cheerio from 'cheerio'
import { format } from 'date-fns'
import * as showdown from 'showdown'

const ampOptimizer = AmpOptimizer.create()

const ampApp = express()

ampApp.use(
  bodyParser.urlencoded({
    extended: false
  })
)

ampApp.use(bodyParser.json())

ampApp.get('/hello', (req, res) => {
  res
    .json({
      message: `Hello!`,
      code: codes.success
    })
    .status(codes.success)
})

ampApp.get('/blogtemplate', (req, res) => {
  res.send(blogtemplate)
    .status(codes.success)
})

ampApp.get('/projecttemplate', (req, res) => {
  res.send(projecttemplate)
    .status(codes.success)
})

const handlePostRequest = (req, res, type) => {
  if (req.params.id) {
    const id = req.params.id
    let date
    try {
      const timestamp = id.toString().substring(0, 8)
      date = format(parseInt(timestamp, 16) * 1000, 'M/D/YYYY')
    } catch (err) {
      res.json({
        code: codes.error,
        message: `error with timestamp parsing: ${err}`
      }).status(codes.error)
      return
    }
    axios.get(config.apiurl + '/graphql', {
      params: {
        query: `{post(type:"${encodeURIComponent(type)}",id:"${
          encodeURIComponent(id)}",cache:true){title content author views}}`
      }
    }).then(res1 => {
      if (res1.status === 200) {
        if (res1.data) {
          if (res1.data.data && res1.data.data.post) {
            const postdata = res1.data.data.post
            const posttemplate = type === 'blog' ? blogtemplate : projecttemplate
            const $ = cheerio.load(posttemplate)
            const websiteurl = `${config.websiteurl}/${type}/${id}`
            $('link[rel=canonical]').attr('href', websiteurl)
            $('#title').text(postdata.title)
            $('#author').text(postdata.author)
            const markdownconverter = new showdown.Converter()
            const postcontenthtml = markdownconverter.makeHtml(decodeURIComponent(postdata.content))
            $('#content').html(postcontenthtml)
            $('img.lazy :not(.gif)').each((i, item) => {
              item.tagName = 'amp-img'
              const blursrc = (' ' + item.attribs.src).slice(1)
              const originalsrc = (' ' + item.attribs["data-src"]).slice(1)
              const width = (' ' + item.attribs['data-width']).slice(1)
              const height = (' ' + item.attribs['data-height']).slice(1)
              const alt = (' ' + item.attribs.alt).slice(1)
              item.attribs = {
                src: originalsrc,
                width: width,
                height: height,
                alt: alt,
                layout: 'responsive'
              }
              $(this).html(`<amp-img placeholder src="${blursrc}" layout="fill"></amp-img>`)
            })
            $('img.gif').each((i, item) => {
              item.tagName = 'amp-anim'
              const originalsrc = (' ' + item.attribs['data-src']).slice(1)
              const width = (' ' + item.attribs['data-width']).slice(1)
              const height = (' ' + item.attribs['data-height']).slice(1)
              const alt = (' ' + item.attribs.alt).slice(1)
              const placeholderblursrc = (' ' + item.attribs.src).slice(1)
              const placeholderoriginalsrc = (' ' + item.attribs['placeholder-original']).slice(1)
              item.attribs = {
                src: originalsrc,
                width: width,
                height: height,
                alt: alt,
                layout: 'responsive'
              }
              $(this).html(`<amp-img placeholder src="${placeholderoriginalsrc}" layout="fill"><amp-img placeholder src="${
                placeholderblursrc}" layout="fill"></amp-img></amp-img>`)
            })
            $('video').each((i, item) => {
              item.tagName = 'amp-anim'
              const originalsrc = (' ' + item.attribs.src).slice(1)
              const width = (' ' + item.attribs['data-width']).slice(1)
              const height = (' ' + item.attribs['data-height']).slice(1)
              const alt = (' ' + item.attribs.alt).slice(1)
              item.attribs = {
                src: originalsrc,
                width: width,
                height: height,
                layout: 'responsive',
                controls: ''
              }
              $(this).append(`<div fallback><p>${alt}</p></div>`)
            })
            $('#views').text(postdata.views)
            $('#date').text(date)
            $('#mainsite').attr('href', websiteurl)
            $('title').text(postdata.title)
            $('meta[name=description]').attr('content', `${postdata.title} ${type} by ${postdata.author}`)
            const html = $.html()
            ampOptimizer.transformHtml(html).then(optimizedHtml => {
              res.send(optimizedHtml).status(codes.success)
            }).catch(err => {
              res.json({
                message: err
              }).status(codes.error)
            })
          } else if (res1.data.errors) {
            res.json({
              code: codes.error,
              message: `found errors: ${JSON.stringify(res1.data.errors)}`
            }).status(codes.error)
          } else {
            res.json({
              code: codes.error,
              message: 'could not find data or errors'
            }).status(codes.error)
          }
        } else {
          res.json({
            code: codes.error,
            message: 'could not get data'
          }).status(codes.error)
        }
      } else {
        res.json({
          code: res1.status,
          message: `status code of ${res1.status}`
        }).status(res1.status)
      }
    }).catch(err => {
      res.json({
        code: codes.error,
        message: `got error ${err}`
      }).status(codes.error)
    })
  } else {
    res.json({
      code: codes.error,
      message: 'could not find id'
    }).status(codes.error)
  }
}

ampApp.get('/blog/:id', (req, res) => {
  handlePostRequest(req, res, 'blog')
})

ampApp.get('/project/:id', (req, res) => {
  handlePostRequest(req, res, 'project')
})

const PORT = process.env.PORT || config.port

ampApp.listen(PORT, () => console.log(`amp app is listening on port ${PORT} 🚀`))
