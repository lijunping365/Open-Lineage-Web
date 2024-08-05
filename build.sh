#源码路径
SOURCE_PATH=/data/server/open-lineage/Open-Lineage-Web
#docker 镜像/容器名字或服务名字 这里都命名为这个
SERVER_NAME=open-lineage-web
TAG=latest
SERVER_PORT=10012
#容器id
CID=$(docker ps | grep "$SERVER_NAME" | awk '{print $1}')
#镜像id
IID=$(docker images | grep "$SERVER_NAME:$TAG" | awk '{print $3}')

cd $SOURCE_PATH

# 更新代码
git pull --rebase origin main

# 容器存在则删除
if [ -n "$CID" ]; then
  echo "存在容器$SERVER_NAME, CID-$CID"
  docker stop $SERVER_NAME
  docker rm $SERVER_NAME
fi

# 构建docker镜像
if [ -n "$IID" ]; then
  echo "存在$SERVER_NAME:$TAG镜像，IID=$IID"
  docker rmi $SERVER_NAME:$TAG
else
  echo "不存在$SERVER_NAME:$TAG镜像，开始构建镜像"
  cd $SOURCE_PATH
  docker build -t $SERVER_NAME:$TAG .
fi

# 运行docker容器
docker run --name $SERVER_NAME -d -p $SERVER_PORT:80 $SERVER_NAME:$TAG
echo "$SERVER_NAME容器创建完成"