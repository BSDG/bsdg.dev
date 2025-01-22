//#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');


const basePath = path.resolve(__dirname, '../docs');
const folders = fs.readdirSync(basePath).filter(file => file.startsWith('.') || fs.statSync(path.join(basePath, file)).isDirectory())
const outputFile = path.resolve(__dirname, '../docs/.vitepress/metadata.json');

function generateMetadata() {
  const metadata = [];

  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith('.md')) {
          const filePath = path.join(folderPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(content);
          metadata.push({
            name: data.title || file.replace('.md', ''),
            description: data.description || '',
            path: `/${folder}/${file.replace('.md', '')}`,
            ...data
          });
        }
      });
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
  console.log(`Metadata generated and saved to ${outputFile}`);
};


generateMetadata();
