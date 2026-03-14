const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// Cấu hình
const OUTPUT_DIR = path.join(__dirname, 'summarize');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'output.txt');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const files = globSync('src/**/*.{ts,tsx}', {
    ignore: 'node_modules/**',
});

console.log(`🚀 Đang xử lý ${files.length} files...`);

const results = files.map((file) => {
    const content = fs.readFileSync(file, 'utf8');
    
    // LOGIC MỚI:
    // 1. Loại bỏ xuống dòng (\r, \n) và thay bằng khoảng trắng
    // 2. Thay thế các chuỗi khoảng trắng liên tiếp (tab, space) thành 1 dấu cách duy nhất
    // 3. Trim đầu cuối để nội dung gọn gàng
    const flatContent = content
        .replace(/\r?\n|\r/g, " ") 
        .replace(/\s+/g, " ")      
        .trim();

    return `[${file}]: ${flatContent}`;
});

// Lưu vào file (mỗi file code gốc sẽ nằm trên 1 dòng trong output.txt)
fs.writeFileSync(OUTPUT_FILE, results.join('\n'), 'utf8');

console.log(`✅ Hoàn thành! Toàn bộ nội dung đã được làm phẳng tại: ${OUTPUT_FILE}`);