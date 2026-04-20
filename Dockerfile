# Wybierz wersję obrazu zgodną z Twoją wersją Playwright w package.json
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]