# kart-app


## Hvordan kjøre applikasjonen
### Krav
* npm >= 9 og node >= 18
* eller docker

Hent prosjektet først fra github med git:

```sh
git clone https://github.com/peroveri/kart-app.git
```

### NPM

```sh
npm install
npm run dev

# Åpne http://localhost:5173 i nettleseren
```

### Docker
Prosjektet kan kjøres i docker med følgende:
```sh
docker build -t kart-app .
docker run --rm -p 5173:5173 kart-app

# Åpne http://localhost:5173 i nettleseren
```

### Testing
```sh
# Unit-tester
npm run test:unit

# Lining
npm run lint

# Type-check
npm run type-check
```
