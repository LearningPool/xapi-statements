FROM node:8@sha256:dd2381fe1f68df03a058094097886cd96b24a47724ff5a588b90921f13e875b7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
