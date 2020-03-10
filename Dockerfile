FROM centos:7

#USER root


RUN yum install python3 wget -y
RUN pip3 install flask numpy pandas simplejson sklearn && yum clean all
#Downloading visual studio code server
RUN wget -c https://github.com/cdr/code-server/releases/download/2.1698/code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz 

RUN  tar -xzvf code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz 

RUN mv code-server2.1698-vsc1.41.1-linux-x86_64/code-server /opt && mv code-server2.1698-vsc1.41.1-linux-x86_64/README.md /opt && rm -rf code-server2.1698-vsc1.41.1-linux-x86_64 && rm -f code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz

COPY vscode-server/ /opt/



EXPOSE 8080 

WORKDIR /opt

RUN chmod +x -R /opt/code-server

ENV HOME /opt

#password to access the VSC dashboard
ENV PASSWORD iventura

#Execute code server binaries after container is started
CMD /opt/code-server -p 8080
