const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://localhost:27017';
const dbName = 'yourDatabase';

async function uploadFiles() {
const directoryPath = path.join(__dirname, 'node_modules/code_viewer');

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db);

    const directoryPath = path.join(__dirname, 'node_modules/code_viewer');
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const readStream = fs.createReadStream(filePath);
        const uploadStream = bucket.openUploadStream(file);
      
        readStream.pipe(uploadStream).on('finish', () => {
          console.log(`Uploaded ${file}`);
        });
      }
      
  } finally {
    await client.close();
  }
}

uploadFiles().catch(console.error);
async function retrieveFile(fileName) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      const bucket = new GridFSBucket(db);
  
      const downloadStream = bucket.openDownloadStreamByName(fileName);
      downloadStream.pipe(fs.createWriteStream(path.join(__dirname, 'output', fileName)))
        .on('finish', () => {
          console.log(`Retrieved ${fileName}`);
        });
    } finally {
      await client.close();
    }
  }
  
  // Call retrieveFile with the name of the file you want to retrieve
  retrieveFile('example.js');
  