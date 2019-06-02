---
layout: post
title: Machine setup
summary: How I get back up and running on a freshly formatted machine.
tags: [playbook,ubuntu,linux,setup]
permalink: machine-setup
---

I format my machine often; I like getting back to a clean slate and I also make a lot of mistakes which kill the machine. This is my playbook that helps me get back up and running.
I currently use [Ubuntu](https://ubuntu.com/ "it's really improved in the last few years!").

## Browser

Install [Vivaldi](https://vivaldi.com/ "Chrome with extra functionality that's actually useful")

- [lastpass](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)
- [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)

## Work

Install [Sakura](https://launchpad.net/sakura "minimal terminal that still supports the functionality I need") terminal

```bash
sudo apt install sakura && sudo update-alternatives --config x-terminal-emulator
# pick sakura emulator as the default x-terminal-emulator
```

Work around [Sakura ctrl+arrow-key weirdness](https://bugs.launchpad.net/sakura/+bug/1772943 "bug 1772943")

```bash
vim ~/.config/sakura/sakura.conf
# change the value of 'switch_tab_accelerator' to 5
```

Install node

```bash
sudo snap install node --classic --channel=11/stable
```

Install ruby

```bash
# Frustratingly, Snapcraft installs bundler 1.7 instead of 2+
sudo apt install ruby-full
```

Install [VS Code](https://code.visualstudio.com/)

```bash
sudo snap install code --classic
```

Install [zsh](https://www.zsh.org/ "more fully featured shell than bash; not as loaded as fish shell")

```bash
sudo apt install zsh
```

Install curl

```bash
sudo apt install curl
```

Set up [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh "a bunch of functionality on top of zsh")

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Install [fzf](https://github.com/junegunn/fzf "creates fuzzy-finder menus and comes with bindings for fuzzy searching through command history and subfiles")

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install
```

Set up workplace directory

```bash
cd $HOME && mkdir Workplace
```

Set up [thefuck](https://github.com/nvbn/thefuck#installation "quick correction of incorrect commands")

```bash
sudo apt update && sudo apt install python3-dev python3-pip python3-setuptools && sudo pip3 install thefuck
```

Set up [base16 shell](https://github.com/chriskempson/base16-shell "commands for quickly changing terminal themes")

```bash
git clone https://github.com/chriskempson/base16-shell.git ~/.config/base16-shell
```

Set up [dotfiles](https://github.com/xpcoffee/dotfiles "these are my dotfiles, tweak them as you need")

```bash
cd $HOME/Workplace && git clone https://github.com/xpcoffee/dotfiles && cd dotfiles && ./link_dotfiles.sh
```

Install [Vundle](https://github.com/VundleVim/Vundle.vim "vim plugin manager")

```bash
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

Install vim plugins using Vundle

```bash
vim
# :PluginInstall
```

Generate a [new SSH key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent "I'm not sure if this is better or worse than 'one to rule them all', but it's simple enough")

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Install [`jq`](https://stedolan.github.io/jq/ "JSON manipulation tool")

## Multimedia

Install [Inkscape](https://snapcraft.io/inkscape "intuitive Vector illustrator for linux")

```bash
sudo snap install inkscape --classic
```

Install [VLC media player](https://www.videolan.org/vlc/index.html)

```bash
sudo snap install vlc
```

Install [Spotify](https://www.spotify.com/)

```bash
sudo snap install spotify
```
