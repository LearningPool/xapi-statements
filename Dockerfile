FROM node:8@sha256:85778ad8487fcb82e2d455078dae99628cc06c093c840463a84529d069fcca1b
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
