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
  props: ['size', 'keyword', 'href', 'type'],
  data() {
    const size = this.size ? this.size : 640;
    let width;
    let height;
    let title;
    let text;
    if (this.type === 'wide') {
      width = size * 2;
      height = size;
      title = faker.commerce.productName();
      text = faker.lorem.sentence();
    } else if (this.type === 'tall') {
      width = size;
      height = size * 2;
      title = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      text = faker.lorem.sentences();
    } else {
      width = height = size;
      title = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      text = faker.lorem.sentence();
    }
    return {
      title,
      text,
      src: `https://placeimg.com/${width}/${height}/${this.keyword}?q=${Math.floor(Math.random() * 256)}`,
    };
  },
  template: '#tile-template',
};
const galleryVm = new Vue({
  el: '#gallery',
  components: {
    tile: TileComponent,
  },
});

// layout tester for fortune data
// function getFortune80Col() {
//   return {
//     text:
//       '00000000001111111111222222222233333333334444444444555555555566666666667777777777\n01234567890123456789012345678901234567890123456789012345678901234567890123456789\n01234567890123456789012345678901234567890123456789012345678901234567890123456789\n\n01234567890123456789012345678901234567890123456789012345678901234567890123456789\n01234567890123456789012345678901234567890123456789012345678901234567890123456789\n',
//     source: 'This Website',
//   };
// }
// const fortuneController = new Vue({el: '#hero', data: getFortune80Col()});

// random fortunes from some dude that works for Google that set up a REST API for the 30+ year old UNIX fortune program
async function getFortune() {
  const response = await fetch('https://api.ef.gy/fortune', {
    headers: {Accept: 'text/json'},
  });
  if (!response.ok) {
    console.error(response);
    return {text: 'something went wrong :(', source: 'This Website'};
  }
  const data = await response.json();
  if (data.file.includes('/off/')) {
    return {text: "You miss 100% of the shots you don't take.", source: '- Albert Einstein'};
  } else {
    // slice out fortune cookie attribution if one exists (hopefully I'm right and attributions consistently start with "\n\t\t-- ")
    const cookieAttribution = data.cookie.split('\n\t\t-- ');
    const fortune = {};
    if (cookieAttribution.length > 1) {
      fortune.text = cookieAttribution[0];
      fortune.source = `- ${cookieAttribution[1]} (via ${data.file}#${data['file-id']})`;
    } else {
      fortune.text = data.cookie;
      fortune.source = `${data.file}#${data['file-id']}`;
    }
    return fortune;
  }
}
const fortuneController = getFortune().then(
  (data) =>
    new Vue({
      el: '#hero',
      data,
    })
);

window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (entry.intersectionRatio > 0) document.querySelector(`nav li a[href="#${id}"]`).classList.add('active');
      else document.querySelector(`nav li a[href="#${id}"]`).classList.remove('active');
    });
  });
  document.querySelectorAll('a.target[id]').forEach((target) => observer.observe(target));
});
