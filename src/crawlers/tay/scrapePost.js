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

const replyPostsSelector = `${postsTRowsSelector}:not(:first-child) > td > table > tbody > tr > td > table > tbody > tr:first-child`;
// const replyAuthorsSelector = `${replyPostsSelector} > td:first-child > b`;

module.exports = async (page) => {
  const postAuthor = await page.$eval(postAuthorSelector, b => b.innerText);
  const postTitle = await page.$eval(postTitleSelector, b => b.innerText);
  const postDate = await page.$eval(postDateSelector, span => span.innerText.split('on:')[1].split('»')[0].trim());
  const postText = await page.$eval(postTextSelector, td => td.innerText.split('»')[1].trim());
  const postImages = await page.$$eval(firstPostImagesSelector, imgs => imgs.map(img => img.src));

  const replyPosts = await page.$$eval(replyPostsSelector, replies => replies.map((reply) => {
    const author = reply.querySelector('td:first-child > b').innerText;
    const body = reply.querySelector('td:nth-child(2)').innerText.split('»')[1].trim();
    const date = reply.querySelector('td:nth-child(2) > table > tbody > tr > td > span.smalltext').innerText.split('on:')[1].split('»')[0].trim();
    // const quotesTexts = reply.querySelectorAll('td:nth-child(2) > div.quote');
    // const quoteHeaders = reply.querySelectorAll('td:nth-child(2) > div.quoteheader');
    // const quotes = quotesTexts.map((text, i) => ({ text: text.innerText, header: quoteHeaders[i].innerText }));

    return {
      author,
      body,
      date,
      // quotes,
      // images,
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
