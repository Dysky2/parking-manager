# --- ETAP 1: Budowanie Aplikacji Angulara ---
FROM node:20 AS build

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i instalujemy zależności
COPY package*.json ./
RUN npm install

# Kopiujemy resztę kodu źródłowego
COPY . .

# Budujemy aplikację w trybie produkcyjnym
RUN npm run build

# --- ETAP 2: Serwowanie Aplikacji za pomocą Nginx ---
FROM nginx:alpine

# Kopiujemy zbudowane pliki Angulara z etapu 'build' do folderu serwera Nginx
# Upewnij się, że ścieżka do folderu 'browser' jest poprawna!
# Zazwyczaj to dist/nazwa-projektu/browser
COPY --from=build /app/dist/orion/browser /usr/share/nginx/html

# Kopiujemy niestandardową konfigurację Nginx (stworzymy ją za chwilę)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
