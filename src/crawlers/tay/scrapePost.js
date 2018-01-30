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

// body > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.bordercolor > tbody > tr

module.exports = async (page) => {
  const postAuthor = await page.$eval(postAuthorSelector, b => b.innerText);
  const postTitle = await page.$eval(postTitleSelector, b => b.innerText);
  const postDate = await page.$eval(postDateSelector, span => span.innerText.split('on:')[1].split('»')[0].trim());
  const postText = await page.$eval(postTextSelector, td => td.innerText.split('»')[1].trim());
  const postImages = await page.$$eval(firstPostImagesSelector, imgs => imgs.map(img => img.src));

  return {
    postAuthor,
    postTitle,
    postDate,
    postText,
    postImages,
  };
};
