import toColor from '../index.js';

const wrapOrNah = val => typeof val === 'string' ? `'${val}'` : val;
const swatches = document.getElementById('swatches');

[
  ['mouse', 6],
  ['penny', 6],
  ['deli', 6],
  ['cyrus', 6],
  ['mapbox.mapbox-streets-v8', 16],
  ['mapbox.mapbox-streets-v8', 16, { brightness: -50, saturation: 50 }],
  ['mapbox.mapbox-streets-v8', 16, { brightness: 50, saturation: -50 }]
].forEach(swatch => {
  const seed = swatch[0];
  const count = swatch[1];
  const options = swatch[2];

  const container = document.createElement('div');
  const swatchSnippet = document.createElement('div');
  swatchSnippet.classList = 'bg-gray-dark color-gray-light txt-mono px12 py12 round-b txt-truncate';
  const swatchContainer = document.createElement('div');
  swatchContainer.classList = 'round-t h120 txt-xs txt-bold flex-parent scroll-hidden';
  const s = new toColor(seed, options || {});

  container.classList = `col col--12 ${count < 8 ? 'col--6-ml' : ''} mb12`;

  for (let i = 0; i < count; i++) {
    const { hsl } = s.getColor();
    const swatchContainerItem = document.createElement('div');
    swatchContainerItem.classList = `px12 py12 flex-child flex-child--grow h120`;
    swatchContainerItem.textContent = swatchContainerItem.title = swatchContainerItem.style.backgroundColor = hsl.formatted;
    swatchContainer.appendChild(swatchContainerItem);
  };

  let optionsString = options ? `, ${JSON.stringify(options)}` : '';
  let textContent = `${wrapOrNah(seed)}`
  swatchSnippet.textContent = swatchSnippet.title = `new toColor(${textContent}${optionsString});`;

  container.appendChild(swatchContainer);
  container.appendChild(swatchSnippet);
  swatches.appendChild(container); 
});
