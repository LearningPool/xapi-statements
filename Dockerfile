FROM node:8@sha256:0accccfd7a8e9074d44a862e06d63e69836a1f41ec77329bb3eb1dae2536a449
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
