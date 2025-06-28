ddev wp core update --version=6.7.2  --force

ddev import-db --file=./.data/database_dump.sql

#ddev wp search-replace 'https://uptec.up.pt' 'https://uptec.ddev.site/' --all-tables
#ddev wp search-replace 'https://uptec.fera.miewstudio.com/' 'https://uptec.ddev.site/' --all-tables


ddev wp search-replace '^http://(uptec\.ddev\.site)' 'https://$1' --regex --all-tables

ddev wp user update dev --user_pass="cafetaria17" --allow-root

ddev wp plugin deactivate wordfence

ddev wp flush 

# ddev wp core update --version=6.7.2  --force
