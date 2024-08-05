# 安装Node.js
FROM node:20-alpine

# https://pnpm.io/docker
# https://depot.dev/docs/languages/node-pnpm-dockerfile
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_NPM_REGISTRY="https://registry.npmmirror.com"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 创建工作目录
WORKDIR /app

# 将node_modules添加到工作目录
COPY .npmrc package.json ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# 将所有文件复制到工作目录
COPY . .

# 编译前端项目
RUN pnpm run build

# 产生静态文件
FROM nginx:stable-alpine

# 应用构建成功后的文件被复制到镜像内
COPY --from=0 /app/dist /usr/share/nginx/html/open-lineage

# 拷贝.conf文件到镜像下，替换掉原有的nginx.conf
COPY nginx.conf /etc/nginx/conf.d/

#启动容器时的进程
ENTRYPOINT nginx -g "daemon off;"