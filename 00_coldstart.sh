ddev start

ddev composer install
WP_VERSION="6.7.2"
# Check if wordpress is already installed, if not, download and install it.
# If it is installed, update to the specified version.
# This is a workaround for the issue with ddev wp core download not working properly.
ddev exec -- "if wp core is-installed; then echo 'WordPress is installed, updating to ${WP_VERSION}...'; wp core update --version=${WP_VERSION} --force; else echo 'WordPress not found, downloading version ${WP_VERSION}...'; wp core download --version=${WP_VERSION}; fi"
read -p "Press Enter to continue..."

#ddev wp core download --version=6.7.2  --force

#ddev import-db --file=./.data/dump_download/database_dump.sql
ddev exec -s db -- mysql --force --batch --raw --user=db --password=db --database=db --host=db < ./.data/dump_download/database_dump.sql >/dev/null 2>&1


# 1. Use the powerful regex to replace all old production/staging domains.
ddev wp search-replace '(https?:)?//(uptec\.up\.pt|uptec\.fera\.miewstudio\.com)' 'https://uptec.ddev.site' --all-tables --regex

# 2. As a final cleanup, ensure all instances of the new local URL use HTTPS.
ddev wp search-replace 'http://uptec.ddev.site' 'https://uptec.ddev.site' --all-tables

ddev wp user update dev --user_pass="cafetaria17" --allow-root

ddev wp plugin deactivate wordfence

# clear the rewrite cache
ddev wp rewrite flush

#clear the object cache
ddev wp cache flush

# ddev wp core update --version=6.7.2  --force
