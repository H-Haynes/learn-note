# gitlab-runner

[toc]

## 安装

国外镜像下载太慢，可使用清华大学镜像安装

1. `vi /etc/yum.repos.d/gitlab-runner.repo`
2. 复制以下内容到文件并保存

        [gitlab-runner]
        name=gitlab-runner
        baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-runner/yum/el$releasever-$basearch/
        repo_gpgcheck=0
        gpgcheck=0
        enabled=1
        gpgkey=https://packages.gitlab.com/gpg.key

3. `sudo yum makecache`
4. `sudo yum install gitlab-runner`

## 注册runner

1. 访问你的gitlab,点击顶部的扳手（管理中心）,进入左侧的runner页面
2. 页面中将有注册runner的资料(域名，token)
3. 控制台输入`sudo gitlab-runner register`
4. 将进行以下4步，填写相关资料
   1. 填写域名信息，上面的页面中有
   2. 填写注册token,上面的页面中有
   3. 对这个runner的描述，随意填写
   4. 填写runner的标签(重要，运行期会用上，后面可在页面中修改)
   5. 使用什么方式控制,一般使用 shell
5. 完成后刷新页面，就能看到runner信息了,点击编辑，设置该runner允许访问的目录

## runner 执行不及时

修改`/etc/gitlab-runner/config.toml`中check_interval的值，默认为0，会很慢，可以改一个数字，为间隔秒数，建议5

## 自动化部署

1. 项目中新建.gitlab-ci.yml文件
2. 配置部署流程

==该文件严禁使用tag缩进==
配置中需要配置stage,表示部署的阶段，==最多有3个阶段==
各阶段配置相关的操作，以下为演示文件:

    stages:  #这里设置了两个阶段，一个叫build,一个叫deploy
      - build
      - deploy

    packet: #job名
      stage: build   #此工作属于哪个阶段
      before_script: # 进行该工作前，先执行下列操作
        - yarn install
        - yarn config set ignore-engines true
      script:         # 该阶段需要执行的操作
        - yarn build 
        - mv -f dist/* /var/www/netease 
      tags:         # 指定拥有该标签的runner来执行
        - 星河
      only:         # 仅master分支改变才执行
        - master

    general:        # job名
        stage: deploy   #所属阶段
        script:     # 需要执行的操作
        - ls
