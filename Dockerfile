# 安装Node.js
FROM node:18-alpine

# 创建工作目录
WORKDIR /app

# 将node_modules添加到工作目录
COPY .npmrc package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@7.30.5 && pnpm i

# 将所有文件复制到工作目录
COPY . .

# 编译前端项目
RUN pnpm run build

# 产生静态文件
FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html/open-lineage

COPY nginx.conf /etc/nginx/conf.d/