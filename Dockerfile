FROM node:8@sha256:6945c42812fa1829c1f6fd42351122daec0a566f846615fee30d1be1d56f3be4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
