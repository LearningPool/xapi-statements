FROM node:8@sha256:3ecf259bf23f8a75555cf0b92ac5ad3c746e7e2262e937a9bed9ca1685f8e1c7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
