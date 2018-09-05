FROM node:8@sha256:fd3c42d91fcf6019eec4e6ccd38168628dd4660992a1550a71c7a7e2b0dc2bdd
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
