cd pi
npm install
npm run checkpoint -w @pi/course -- 00
npm run practice -w @pi/course -- 00
npm run build -w @pi/course
node --test packages/pi-course/dist/test/00-*.test.js