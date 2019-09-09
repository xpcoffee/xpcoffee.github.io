---
layout: post
title: Machine setup
summary: How I get back up and running on a freshly formatted machine.
tags: [playbook,ubuntu,linux,setup]
permalink: machine-setup
---

I format my machine often (I make a lot of mistakes which kill the machine and I sometimes just want to start from a clean slate again). This is my playbook that helps me get back up and running. I currently use [Ubuntu](https://ubuntu.com/).

## Browser

Install <span class="tooltip" data-tooltip="Chrome with a bunch of extra, useful functionality">[Vivaldi](https://vivaldi.com/)</span>

- [lastpass](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)
- [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)

## Work

Install <span class="tooltip" data-tooltip="A minimal terminal that still supports the functionality I need">[Sakura](https://launchpad.net/sakura)</span>

```bash
sudo apt install sakura && sudo update-alternatives --config x-terminal-emulator
# pick sakura emulator as the default x-terminal-emulator
```

Work around [Sakura ctrl+arrow-key weirdness](https://bugs.launchpad.net/sakura/+bug/1772943 "Bug 1772943")

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

Install <span class="tooltip" data-tooltip="Shell with more features than bash; not as feature-loaded as the fish shell">[zsh](https://www.zsh.org/)</span>

```bash
sudo apt install zsh
```

Install curl

```bash
sudo apt install curl
```

Set up <span class="tooltip" data-tooltip="A bunch of functionality on top of zsh">[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)</span>

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Install <span class="tooltip" data-tooltip="Command-line fuzzy-finder menus; comes with bindings for fuzzy searching through command history and subfiles">[fzf](https://github.com/junegunn/fzf)</span>

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install
```

Set up workplace directory

```bash
cd $HOME && mkdir Workplace
```

Set up <span class="tooltip" data-tooltip="Commands for quickly changing terminal themes">[base16 shell](https://github.com/chriskempson/base16-shell)</span>

```bash
git clone https://github.com/chriskempson/base16-shell.git ~/.config/base16-shell
```

Set up <span class="tooltip" data-tooltip="These are my dotfiles, fork and tweak them as you need">[dotfiles](https://github.com/xpcoffee/dotfiles)</span>

```bash
cd $HOME/Workplace && git clone https://github.com/xpcoffee/dotfiles && cd dotfiles && ./link_dotfiles.sh
```

Install <span class="tooltip" data-tooltip="Vim plugin manager">[Vundle](https://github.com/VundleVim/Vundle.vim)</span>

```bash
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

Install vim plugins using Vundle

```bash
vim
# :PluginInstall
```

Generate a <span class="tooltip" data-tooltip="I'm not sure if this is better or worse than 'one to rule them all', but it's simple enough">[new SSH key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)</span>

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Install <span class="tooltip" data-tooltip="Command line JSON manipulation tool">[jq](https://stedolan.github.io/jq/)</span>

## Multimedia

Install <span class="tooltip" data-tooltip="Vector illustrator for linux">[Inkscape](https://snapcraft.io/inkscape)</span>

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
