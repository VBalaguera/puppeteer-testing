const puppeteer = require('puppeteer')
const fs = require('fs')

async function run() {
  // launchs browser programatically
  const browser = await puppeteer.launch()

  // access a page
  const page = await browser.newPage()

  // goes to specific page
  await page.goto('https://developers.google.com/web/')

  // Type into search box.
  await page.type('.devsite-search-field', 'Headless Chrome')

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '.devsite-suggest-all-results'
  await page.waitForSelector(allResultsSelector)
  await page.click(allResultsSelector)

  // Wait for the results page to load and display the results.
  const resultsSelector = '.gsc-results .gs-title'
  await page.waitForSelector(resultsSelector)

  // Extract the results from the page.
  const links = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      const title = anchor.textContent.split('|')[0].trim()
      return `${title} - ${anchor.href}`
    })
  }, resultsSelector)

  // Print all the files.
  const joinedLinks = links.join('\n')
  console.log(joinedLinks)

  // usign my own page for testing

  // // accessing DOM elements:

  // // creating screenshot:
  // await page.screenshot({ path: 'screenshot-example.jpeg', fullPage: true })

  // // creating pdf:
  // await page.pdf({ path: 'page.pdf', format: 'A4' })

  // // getting entire html:
  // const html = await page.content()
  // console.log(html)

  // // getting page title:
  // const title = await page.evaluate(() => document.title)
  // console.log(title)

  // // getting all page's text:
  // const text = await page.evaluate(() => document.body.innerText)
  // console.log(text)

  // // getting all page's links:
  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('a'), (e) => e.href)
  // )
  // console.log(links)

  // // video titles, subtitle, description, and links
  // //
  // const projects = await page.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll(
  //       '#projects .projectsgrid-container .card-body '
  //     ),
  //     (e) => ({
  //       title: e.querySelector('.card-title h2').innerText,
  //       date: e.querySelector('.card-subtitle p').innerText,
  //       description: e.querySelector('.card-text p').innerText,
  //       link: e.querySelector('a').href,
  //     })
  //   )
  // )
  // console.log(projects)

  // // using eval()
  // // const text = await page.$$eval(
  // //   '#projects .projectsgrid-container ',
  // //   (elements) =>
  // //     elements.map((e) => ({
  // //       title: e.querySelector('.card-title h2').innerText,
  // //       date: e.querySelector('.card-subtitle p').innerText,
  // //       description: e.querySelector('.card-text p').innerText,
  // //       link: e.querySelector('a').href,
  // //     }))
  // // )

  // // console.log(text)

  // // save data to JSON file:
  // fs.writeFile('projects.json', JSON.stringify(projects), (err) => {
  //   if (err) throw err
  //   console.log('projects.json written successfully')
  // })

  // close browser
  await browser.close()
}

run()
