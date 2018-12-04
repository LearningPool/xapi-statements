FROM node:8@sha256:1bf3f5613c27397bdda5e0da84641ea1e925822e5f3a820f00ced2c31ff75a2a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
