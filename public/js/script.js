// Telling eslint to ignore unused variables because those Vue instances are doing something just by existing...
/* eslint-disable no-unused-vars */
/* global faker */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

const aboutVm = new Vue({
  el: '#about',
  data: {
    cardText: faker.name.jobTitle(),
    longParagraph: `${faker.lorem.paragraphs()} ${faker.lorem.paragraphs()} ${faker.lorem.paragraphs()}`,
    paragraph: faker.lorem.paragraphs(),
  },
});

const TileComponent = {
  props: ['size', 'keyword', 'href'],
  data() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      text: faker.lorem.sentence(),
      src: `https://placeimg.com/${this.size}/${this.size}/${this.keyword}?q=${Math.floor(Math.random() * 256)}`,
    };
  },
  template: '#tile-template',
};

const WideTileComponent = {
  props: ['size', 'keyword', 'href'],
  data() {
    return {
      title: faker.commerce.productName(),
      text: faker.lorem.sentences(),
      src: `https://placeimg.com/${this.size * 2}/${this.size}/${this.keyword}?q=${Math.floor(Math.random() * 256)}`,
    };
  },
  template: '#wide-tile-template',
};

const TallTileComponent = {
  props: ['size', 'keyword', 'href'],
  data() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      text: faker.lorem.paragraph(),
      src: `https://placeimg.com/${this.size}/${this.size * 2}/${this.keyword}?q=${Math.floor(Math.random() * 256)}`,
    };
  },
  template: '#tall-tile-template',
};

const galleryVm = new Vue({
  el: '#gallery',
  components: {
    tile: TileComponent,
    'wide-tile': WideTileComponent,
    'tall-tile': TallTileComponent,
  },
});

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
  if (data.file.includes('/off/'))
    return {text: "You miss 100% of the shots you don't take.", source: 'Alberta Eisenstein'};
  else return {text: data.cookie, source: `${data.file}#${data['file-id']}`};
}
const fortuneController = getFortune().then(
  (data) =>
    new Vue({
      el: '#hero',
      data,
    })
);
