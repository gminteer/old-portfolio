// Telling eslint to ignore unused variables because those Vue instances are doing things just by existing...
/* eslint-disable no-unused-vars */
/* global faker */
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.min.js';

const aboutVm = new Vue({
  el: '#about',
  data: {
    cardText: faker.name.jobTitle(),
    longParagraph: `${faker.lorem.paragraphs()} ${faker.lorem.paragraphs()} ${faker.lorem.paragraphs()}`,
    paragraph: faker.lorem.paragraphs(),
  },
});

const TileComponent = {
  props: {
    size: {default: 320, type: Number},
    keyword: {default: 'tech', type: String},
    href: {default: '#', type: String},
    type: {default: null, type: String},
  },
  data() {
    let width;
    let height;
    let title;
    let text;
    if (this.type === 'wide') {
      width = this.size * 2;
      height = this.size;
      title = faker.commerce.productName();
      text = faker.lorem.sentence();
    } else if (this.type === 'tall') {
      width = this.size;
      height = this.size * 2;
      title = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      text = faker.lorem.sentences();
    } else {
      width = height = this.size;
      title = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      text = faker.lorem.sentence();
    }
    return {
      title,
      text,
      src: `https://placeimg.com/${width}/${height}/${this.keyword}?q=${Math.floor(Math.random() * 256)}`,
    };
  },
  template: '#tile-component',
};
const galleryVm = new Vue({
  el: '#gallery',
  components: {
    tile: TileComponent,
  },
});

// layout tester for fortune data
// function getFortune80Col(numLines = 12) {
//   let text = '00000000001111111111222222222233333333334444444444555555555566666666667777777777\n';
//   for (let i = 0; i < numLines; i++)
//     text += '01234567890123456789012345678901234567890123456789012345678901234567890123456789\n';
//   return {
//     text,
//     source: '- This Website',
//   };
// }
// const fortuneVm = new Vue({el: '#hero', data: getFortune80Col()});

// random fortunes from some dude that works for Google that set up a REST API for the 30+ year old UNIX fortune program
async function getFortune() {
  const response = await fetch('https://api.ef.gy/fortune', {
    headers: {Accept: 'text/json'},
  });
  if (!response.ok) {
    console.error(response);
    return {text: 'something went wrong :(', source: '- This Website', file: ''};
  }
  const data = await response.json();
  if (data.file.includes('/off/')) {
    // censor fortunes in /off/ because they're "offensive" and I can't pass fortune command line arguments to filter on my end and {{ something_about_putting_your_best_foot_forward }}
    return {text: "You miss 100% of the shots you don't take.", source: '- Albert Einstein', file: ''};
  } else {
    // slice out fortune cookie attribution if one exists (hopefully I'm right and attributions consistently start with "\n\t\t-- ")
    const cookieAttribution = data.cookie.split('\n\t\t-- ');
    const fortune = {};
    if (cookieAttribution.length === 2) {
      // doing this instead of checking if cookieAttribution.length > 1 probably fails better if cookieAttribution.length > 2 which I don't think should actually happen to begin with.
      fortune.text = cookieAttribution[0];
      fortune.source = `- ${cookieAttribution[1]}`;
      fortune.file = `(${data.file}#${data['file-id']})`;
    } else {
      fortune.text = data.cookie;
      fortune.source = '';
      fortune.file = `${data.file}#${data['file-id']}`;
    }
    return fortune;
  }
}
function setElSizeInCss(el) {
  el.style.setProperty('--el-width', `${el.offsetWidth}px`);
  el.style.setProperty('--el-height', `${el.offsetHeight}px`);
  console.debug(`el: ${el}, height: ${el.offsetHeight}, width: ${el.offsetWidth}`);
}
async function createfortuneVm() {
  const fortuneVm = new Vue({el: '.fortune', data: await getFortune()});
  setElSizeInCss(fortuneVm.$el);
  window.addEventListener('resize', () => setElSizeInCss(fortuneVm.$el));
  return fortuneVm;
}
const fortuneVm = (async () => await createfortuneVm())(); // <-- that punctuation pile-up is stupid

window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0)
        document.querySelector(`nav li a[href="#${entry.target.id}"]`).classList.add('active');
      else document.querySelector(`nav li a[href="#${entry.target.id}"]`).classList.remove('active');
    });
  });
  document.querySelectorAll('a.target[id]').forEach((target) => observer.observe(target));
});
