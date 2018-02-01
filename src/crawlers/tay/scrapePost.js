/**
 * scrapes a Turns all year post
 */

const postsTRowsSelector = 'body > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.bordercolor > tbody > tr';
const firstPostSelector = `${postsTRowsSelector}:first-child table table > tbody > tr:first-child`;
const firstPostImagesSelector = `${postsTRowsSelector}:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:first-child img`;
const postAuthorSelector = `${firstPostSelector} > td:first-child > b`;
const postHeadingSelector = `${firstPostSelector} > td:last-child > table > tbody > tr > td:first-child`;
const postTitleSelector = `${postHeadingSelector} b`;
const postDateSelector = `${postHeadingSelector} span.smalltext`;
const postTextSelector = `${firstPostSelector} > td:last-child`;

const replyPostsSelector = `${postsTRowsSelector}:not(:first-child) > td > table > tbody > tr > td > table > tbody`;

module.exports = async (page) => {
  const postAuthor = await page.$eval(postAuthorSelector, b => b.innerText);
  const postTitle = await page.$eval(postTitleSelector, b => b.innerText);
  const postDate = await page.$eval(postDateSelector, span => span.innerText.split('on:')[1].split('»')[0].trim());
  const postText = await page.$eval(postTextSelector, td => td.innerText.split('»')[1].trim());
  const postImages = await page.$$eval(firstPostImagesSelector, imgs => imgs.map(img => img.src));

  const replyPosts = await page.$$eval(replyPostsSelector, replies => replies.map((reply) => {
    const author = reply.querySelector('tr:first-child > td:first-child > b').innerText;
    const date = reply.querySelector('tr:first-child > td:nth-child(2) > table > tbody > tr > td > span.smalltext').innerText.split('on:')[1].split('»')[0].trim();
    const quotesTexts = reply.querySelectorAll('tr:first-child > td:nth-child(2) > div.quote');
    const quoteHeaders = reply.querySelectorAll('tr:first-child > td:nth-child(2) > div.quoteheader');
    const imagesElems = reply.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr > td > img');

    const quotes = [];
    for (let index = 0; index < quotesTexts.length; index++) { // eslint-disable-line no-plusplus
      const headerText = quoteHeaders[index].innerText;
      const headerSplit = headerText.split(' on ');
      const quoteAuthor = headerSplit[0].split('from:')[1].trim();
      const quoteDate = headerSplit[1].trim();
      quotes.push({ author: quoteAuthor, date: quoteDate, text: quotesTexts[index].innerText });
    }

    const images = [];
    for (let index = 0; index < imagesElems.length; index++) { // eslint-disable-line no-plusplus
      const src = imagesElems[index].src;
      if (src.indexOf('Themes/default/images') < 0) {
        images.push(src);
      }
    }

    // The body text is text right in the td, but quotes and date are also nested within tables/divs
    const bodyEl = reply.querySelector('tr:first-child > td:nth-child(2)');
    let child = bodyEl.firstChild;
    const texts = [];
    while (child) {
      if (child.nodeType === 3) {
        texts.push(child.data.trim());
      }
      child = child.nextSibling;
    }
    const body = texts.join('').trim();


    return {
      author,
      body,
      date,
      quotes,
      images,
    };
  }));

  return {
    postAuthor,
    postTitle,
    postDate,
    postText,
    postImages,
    replyPosts,
  };
};
