require('dotenv').config({ path: '.env.local' });
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.models) {
                console.log("사용 가능한 모델 목록:");
                parsed.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
            } else {
                console.log("모델을 불러오지 못했습니다.", parsed);
            }
        } catch (e) { console.log(e); }
    });
}).on('error', (err) => {
    console.log("Error:", err.message);
});
