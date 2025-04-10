# Date 26/03/2025
# @uthor: Jacques SOUDE <bostersoude@gmail.com>
# Useful production commands with makefile

compose_path = docker-compose.yml
compose_path_test = docker-compose.test.yml

### MANAGEMENT COMMAND
# Build all services
build:
	@docker-compose -f $(compose_path) build

build_test:
	@docker-compose -f $(compose_path_test) build

# Start all services
run:
	@docker-compose -f $(compose_path) up -d

run_test:
	@docker-compose -f $(compose_path_test) up -d

# Remove all services
down:
	@docker-compose -f $(compose_path) down

down_test:
	@docker-compose -f $(compose_path_test) down

# Stop all services
stop:
	@docker-compose -f $(compose_path) stop

stop_test:
	@docker-compose -f $(compose_path_test) stop

# Start all services
start:
	@docker-compose -f $(compose_path) start

start_test:
	@docker-compose -f $(compose_path_test) start

# Restart all services
restart:
	@docker-compose -f $(compose_path) stop && docker-compose -f $(compose_path) start

restart_test:
	@docker-compose -f $(compose_path_test) stop && docker-compose -f $(compose_path_test) start

# List running processes
ps:
	@docker container ps


#### SHELL IN CONTAINERS
# Connect to the frontend web server
shellweb:
	@docker container exec -ti revenuegenius_nextjs sh

shellweb_test:
	@docker container exec -ti revenuegenius_nextjs_test sh

# Display backend web server logs
logweb:
	@docker container logs --follow revenuegenius_nextjs

logweb_test:
	@docker container logs --follow revenuegenius_nextjs_test