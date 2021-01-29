import toColor from '../index.js';

const wrapOrNah = val => typeof val === 'string' ? `'${val}'` : val;
const swatches = document.getElementById('swatches');

console.log('toColor', toColor);

const color = new toColor('mapbox.mapbox-streets-v8');
console.log(color.getColor());

/*
[
  ['penny'],
  ['deli'],
  [['penny', 'deli']],
  [['cyrus', 'penelope', 'steve', 'mouse']],
  [['mouse', 'steve', 'penelope', 'cyrus']],
  [['admin', 'aeroway', 'airport_label', 'building', 'housenum_label', 'landuse', 'landuse_overlay', 'motorway_junction', 'natural_label', 'place_label', 'poi_label', 'road', 'structure', 'transit_stop_label', 'water', 'waterway']],
  [_.range(0, 26)],
  [_.range(0, 26), { brightness: -50, saturation: -50 }],
  [_.range(0, 26), { brightness: 50, saturation: 50 }]
].forEach(swatch => {
  const container = document.createElement('div');
  const swatchSnippet = document.createElement('div');
  swatchSnippet.classList = 'bg-gray-dark color-gray-light txt-mono px12 py12 round-b txt-truncate';
  const swatchContainer = document.createElement('div');
  swatchContainer.classList = 'round-t h120 txt-xs txt-bold flex-parent scroll-hidden';
  const s = toColor(swatch[0], swatch[1]);

  if (Array.isArray(swatch[0])) {
    container.classList = `col col--12 ${swatch[0].length < 8 ? 'col--6-ml' : ''} mb12`;

    s.forEach(c => {
      const { hsl } = c;
      const swatchContainerItem = document.createElement('div');
      swatchContainerItem.classList = `px12 py12 flex-child flex-child--grow h120`;
      swatchContainerItem.textContent = swatchContainerItem.title = swatchContainerItem.style.backgroundColor = hsl.formatted;
      swatchContainer.appendChild(swatchContainerItem);
    });

    let textContent = '';
    let options = swatch[1] ? `, ${JSON.stringify(swatch[1])}` : '';
    swatch[0].forEach((c, i) => textContent += `${i === 0 ? '' : ', '}${wrapOrNah(c)}`)
    swatchSnippet.textContent = swatchSnippet.title = `toColor([${textContent}]${options});`;

  } else {
    const { hsl } = s;
    container.classList = 'col col--6 col--3-ml mb12'; 
    swatchContainer.classList.add('px12', 'py12');
    swatchContainer.textContent = swatchContainer.title = swatchContainer.style.backgroundColor = hsl.formatted;
    swatchSnippet.textContent = swatchSnippet.text = `toColor(${wrapOrNah(swatch[0])});`;
  }

  container.appendChild(swatchContainer);
  container.appendChild(swatchSnippet);
  swatches.appendChild(container); 
});
*/
