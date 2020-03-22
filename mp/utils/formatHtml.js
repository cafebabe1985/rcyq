/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
  
  if(!html){
    return html
  }
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}

function scanVideo(html){
  
  if(!html){
    return {
      richTexts:[],
      srcList:[]
    }
  }
  //1.去换行
   html = html.replace(/[\r\n]/g, "")
  //2.取video
  const reg = /<video[^>]*controls="([^"]*)"[^>]*>(.*?)<\/video>/gi
  let videos = html.match(reg)
  
   //3.分割html
 let richTexts = html.replace(reg, '#cafebabe#').split("#cafebabe#")
  //4.取src字符串
  let srcList=[]
  let srcReg = /src="(.*?)"/gi
 for(let i in videos){
   let mstr = videos[i].match(srcReg)[0]
    srcList.push(
     mstr.substring(mstr.indexOf('"')+1, mstr.length - 1)
     )
 }
   //3.判断有几组video
  return {
    richTexts,
    srcList
  }
}
function formatVideo(e){

  let all = e.detail.html

  let pattern = /<img src=""(.*?)class="the_video" (.*?)>/g
  let patternDataCustom = /\bdata-custom="src\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/
  let videoDataArr = all.match(pattern)
  let rps = []
  let vtagP = `<video controls="controls" width="300" height="150"><source src="`
  let vtagS = `" type="video/mp4" /></video>`
  for (let i in videoDataArr) {
    let src = videoDataArr[i].match(patternDataCustom)[1]
    let target = vtagP + src + vtagS
    all = all.replace(pattern, target)
  }

  return all

}

module.exports = {
  formatRichText,
  scanVideo,
  formatVideo
}