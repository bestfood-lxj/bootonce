cd pi
npm run checkpoint -w @pi/course -- 04
npm run practice -w @pi/course -- 04
npm run build -w @pi/course
node --test packages/pi-course/dist/test/04-*.test.js