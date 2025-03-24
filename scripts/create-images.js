const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

const imagesDir = path.join(__dirname, '../public/images/portfolio');

// Создаем папку, если не существует
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Создание заглушек для изображений DomGo.rs...');

// Создаем SVG файлы на основе скриншотов
const createDomGoPlaceholders = () => {
  const images = [
    { 
      name: 'domgo-1.svg', 
      title: 'Главная страница',
      bgColor: '#1c3e8a',
      textColor: '#ffffff' 
    },
    { 
      name: 'domgo-2.svg', 
      title: 'Страница поиска',
      bgColor: '#1c3e8a',
      textColor: '#ffffff'  
    }
  ];

  images.forEach(img => {
    const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${img.bgColor}" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="${img.textColor}" text-anchor="middle">DomGo.rs</text>
      <text x="50%" y="58%" font-family="Arial, sans-serif" font-size="24" fill="${img.textColor}" text-anchor="middle">${img.title}</text>
    </svg>`;

    fs.writeFileSync(path.join(imagesDir, img.name), svgContent);
    console.log(`Создан файл ${img.name}`);
  });
};

createDomGoPlaceholders();

// Создаем css сетку grid.svg
const gridSvgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/grid.svg'), gridSvgContent);
console.log('Создан файл grid.svg');

console.log('Готово!');
