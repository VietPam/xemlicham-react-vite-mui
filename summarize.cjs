const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const OUTPUT_DIR = path.join(__dirname, 'summarize');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'output.txt');
const MAX_CHARS_PER_CHUNK = 30000; // Ngưỡng 30k ký tự

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const files = globSync('src/**/*.{ts,tsx}', {
    ignore: 'node_modules/**',
});

console.log(`🚀 Đang xử lý ${files.length} files...`);

let finalOutput = "";
let currentChunkSize = 0;
let chunkCount = 1;

files.forEach((file) => {
    const rawContent = fs.readFileSync(file, 'utf8');
    
    // Làm phẳng nội dung file
    const flatContent = rawContent
        .replace(/\r?\n|\r/g, " ") 
        .replace(/\s+/g, " ")      
        .trim();

    const lineToAppend = `[${file}]: ${flatContent}\n`;
    
    // Kiểm tra nếu thêm dòng này vào sẽ vượt quá 30,000 ký tự
    if (currentChunkSize + lineToAppend.length > MAX_CHARS_PER_CHUNK) {
        // Thêm dấu phân cách rõ ràng và xuống dòng
        finalOutput += `\n--- END OF CHUNK ${chunkCount} ---\n\n`;
        
        console.log(`📦 Đã ngắt đoạn tại Chunk ${chunkCount} (~${currentChunkSize} chars)`);
        
        // Reset bộ đếm cho chunk mới
        currentChunkSize = 0;
        chunkCount++;
    }

    finalOutput += lineToAppend;
    currentChunkSize += lineToAppend.length;
});

fs.writeFileSync(OUTPUT_FILE, finalOutput, 'utf8');

console.log(`\n✅ Hoàn thành!`);
console.log(`Total Chunks: ${chunkCount}`);
console.log(`Kết quả tại: ${OUTPUT_FILE}`);