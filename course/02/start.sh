cd pi
npm run checkpoint -w @pi/course -- 02
npm run practice -w @pi/course -- 02
npm run build -w @pi/course
node --test packages/pi-course/dist/test/02-*.test.js