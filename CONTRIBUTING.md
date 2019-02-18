## Contributing

Thanks for helping enum server! please see the list
of open issues or open a new one for additional features/bugs.

## Development setup

1.  install [Docker](https://www.docker.com/community-edition)
2.  inside docker cmd

    1.  `git clone https://github.com/nitzano/enum-server`
    2.  `cd enum-server`
    3.  `docker-compose up` (build and runs dev server)
        1.  DOCKER_MACHINE_IP:3000 - web (react)
        2.  DOCKER_MACHINE_IP:5000 - api (express)
