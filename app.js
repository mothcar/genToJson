const fs = require('fs');

// 텍스트 파일 읽기
const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8');
};

// 텍스트를 JSON으로 변환
const convertToJson = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const result = {};

  lines.forEach(line => {
    // 더 유연한 정규표현식 사용
    const match = line.match(/^(창\s*\d+)\s*:\s*(\d+)\s*(.+)/);
    if (match) {
      let [, chapterVerse, verse, content] = match;
      chapterVerse = chapterVerse.replace(/\s+/g, ''); // 공백 제거
      const chapter = chapterVerse.slice(1); // '창' 다음의 모든 숫자를 가져옵니다
      const chapterKey = `창세기${chapter}장`;

      if (!result[chapterKey]) {
        result[chapterKey] = {};
      }

      result[chapterKey][verse] = content.trim();
    } else {
      console.log(`처리할 수 없는 줄: ${line}`);
    }
  });

  return result;
};

// 메인 함수
const main = () => {
  const filePath = 'gen.txt'; // 입력 파일 경로
  const text = readFile(filePath);
  const jsonResult = convertToJson(text);
  
  // 변환 결과 출력
  console.log(JSON.stringify(jsonResult, null, 2));
  
  // JSON 파일로 저장
  fs.writeFileSync('output.json', JSON.stringify(jsonResult, null, 2), 'utf-8');
  // console.log('변환이 완료되었습니다. output.json 파일을 확인해주세요.');
};

main();