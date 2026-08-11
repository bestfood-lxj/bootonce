cd pi
npm run checkpoint -w @pi/course -- 03
npm run practice -w @pi/course -- 03
npm run build -w @pi/course
node --test packages/pi-course/dist/test/03-*.test.js