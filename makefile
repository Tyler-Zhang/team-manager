console:
	sudo docker-compose exec api yarn console

psql: 
	sudo docker-compose exec postgres psql postgres://team_manager@localhost/team_manager

rebuild:
	sudo docker-compose up -d --no-deps --build $(service)
