## Nginx 配置SSL

### 配置 server blocks

    server {
        listen 80;
        server_name jdsbridgecom.com www.jdsbridgecom.com;
        
        root /opt/bitnami/nginx/html/jdsbridgecom;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

### 步驟1：獲取SSL證書
如果你還沒有SSL證書，可以使用Let's Encrypt的certbot來獲取。安裝並運行certbot，它會自動為你的域名生成證書和私鑰。


    sudo apt update
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d jdsbrigdecom.com -d www.jdsbrigdecom.com

Certbot會修改你的Nginx配置文件，添加SSL配置並重新加載Nginx。

如果你已經有了SSL證書和私鑰，請跳過此步驟，直接進行下一步。

### 步驟 2：配置Nginx以使用SSL
打開你的Nginx配置文件，通常位於/etc/nginx/sites-available/your_domain。修改或添加以下內容以啟用SSL：


    server {
        listen 443 ssl;
        server_name jdsbridgecom.com www.jdsbridgecom.com;

        ssl_certificate /opt/bitnami/nginx/conf/jdsbridgecom/jdsbridgecom.com.crt;
        ssl_certificate_key /opt/bitnami/nginx/conf/jdsbridgecom/jdsbridgecom.com.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        ssl_ciphers         HIGH:!aNULL:!MD5;

        root /opt/bitnami/nginx/html/jdsbridgecom;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

## 步驟 3：重定向HTTP到HTTPS
為了確保所有流量都使用HTTPS，你可以設置一個額外的服務器塊來將HTTP流量重定向到HTTPS：

    server {
        listen 80;
        server_name example.com www.example.com;
        return 301 https://$host$request_uri;
    }

## 步驟 4：檢查Nginx配置並重啟服務
在應用更改之前，檢查Nginx的配置是否正確：

    sudo nginx -t

如果一切正常，重啟Nginx以應用更改：

    sudo /opt/bitnami/ctlscript.sh restart nginx

現在，你的Nginx服務器應該已經配置為使用SSL證書並通過HTTPS提供內容，同時將所有HTTP流量重定向到HTTPS。