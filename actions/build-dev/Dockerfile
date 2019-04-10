FROM debian:9.5-slim

LABEL "com.github.actions.name"="Build Dev"
LABEL "com.github.actions.description"="Builds a dev deploy"
LABEL "com.github.actions.icon"="box"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="http://github.com/Devcon4/Sparrow"
LABEL "maintainer"="Devyn Cyphers <devcon4@github.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]