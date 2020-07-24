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

// /* two wide tiles for secondary emphasis */
// for (let i = 0; i < 2; i++) {
//   let d;
//   myApp.controller(`wideTile${i}`, [
//     '$scope',
//     function ($scope) {
//       if (typeof d === 'undefined') {
//         d = {
//           title: faker.commerce.productName(),
//           text: faker.lorem.sentence(),
//         };
//       }
//       $scope.title = d.title;
//       $scope.text = d.text;
//     },
//   ]);
// }
// /* two tall tiles for things that require more wordy commentary and/or tertiary emphasis */
// for (let i = 0; i < 2; i++) {
//   let d;
//   myApp.controller(`tallTile${i}`, [
//     '$scope',
//     function ($scope) {
//       if (typeof d === 'undefined') {
//         d = {
//           title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//           text: faker.lorem.paragraph(),
//         };
//       }
//       $scope.title = d.title;
//       $scope.text = d.text;
//     },
//   ]);
// }
// /* four "normal" tiles */
// for (let i = 0; i < 4; i++) {
//   let d;
//   myApp.controller(`tile${i}`, [
//     '$scope',
//     function ($scope) {
//       if (typeof d === 'undefined') {
//         d = {
//           title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
//           text: faker.lorem.sentence(),
//         };
//       }
//       $scope.title = d.title;
//       $scope.text = d.text;
//     },
//   ]);
// }
/* grab a random fortune from a REST server some dude that works for Google set up as a personal joke */
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
