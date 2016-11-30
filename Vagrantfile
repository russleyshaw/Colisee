# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/xenial64"

    # Create a forwarded port mapping which allows access to a specific port
    # within the machine from a port on the host machine. In the example below,
    # accessing "localhost:8080" will access port 80 on the guest machine.
    # config.vm.network "forwarded_port", guest: 80, host: 8080

    # Root configuration
    config.vm.provision "shell", inline: <<-SHELL
        apt-get update
        apt-get install -y make gcc tmux vim python python-pip python2 python2-pip

        echo "#### Installing docker..."
            curl -sSL https://get.docker.com/ | sh
            usermod -aG docker ubuntu

        echo "#### Installing docker-compose..."
            pip install docker-compose

    SHELL

    # User configuration
    config.vm.provision "shell", privileged: false, inline: <<-SHELL
        ln -s /vagrant/ workspace
        echo "#### Installing NVM..."
            wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    SHELL
end
