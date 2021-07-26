export default function (self) {
    self.setCustomContextMenu = () => {
        const playerWrapper = self.domRef.wrapper;

        const showDefaultControls = self.displayOptions.layoutControls.contextMenu.controls;
        const extraLinks = self.displayOptions.layoutControls.contextMenu.links;

        //Create own context menu
        const divContextMenu = self.createElement({
            tag: 'div',
            id: self.videoPlayerId + '_fluid_context_menu',
            className: 'fluid_context_menu',
            style: {
                display: 'none',
                position: 'absolute'
            }
        });

        const contextMenuList = self.createElement({
            tag: 'ul',
            parent: divContextMenu
        });

        if (!!extraLinks) {
            for (const [key, link] of extraLinks.entries()) {
                self.createElement({
                    tag: 'li',
                    id: self.videoPlayerId + '_context_option_extra_' + key,
                    innerHTML: link.label,
                    parent: contextMenuList
                }, () => window.open(link.href, '_blank'));
            }
        }

        if (showDefaultControls) {
            self.createElement({
                tag: 'li',
                id: self.videoPlayerId + '_context_option_play',
                innerHTML: self.displayOptions.captions.play,
                parent: contextMenuList
            }, () => self.playPauseToggle());

            self.createElement({
                tag: 'li',
                id: self.videoPlayerId + '_context_option_mute',
                innerHTML: self.displayOptions.captions.mute,
                parent: contextMenuList
            }, () => self.muteToggle());

            self.createElement({
                tag: 'li',
                id: self.videoPlayerId + '_context_option_fullscreen',
                innerHTML: self.displayOptions.captions.fullscreen,
                parent: contextMenuList
            }, () => self.fullscreenToggle());
        }

        self.createElement({
            tag: 'li',
            id: self.videoPlayerId + '_context_option_homepage',
            innerHTML: 'Fluid Player ' + self.version,
            parent: contextMenuList
        }, () => window.open(self.homepage, '_blank'));

        self.domRef.player.parentNode.insertBefore(divContextMenu, self.domRef.player.nextSibling);

        //Disable the default context menu
        playerWrapper.addEventListener('contextmenu', e => {
            e.preventDefault();

            divContextMenu.style.left = self.getEventOffsetX(e, self.domRef.player) + 'px';
            divContextMenu.style.top = self.getEventOffsetY(e, self.domRef.player) + 'px';
            divContextMenu.style.display = 'block';
        }, false);

        //Hide the context menu on clicking elsewhere
        document.addEventListener('click', e => {
            if ((e.target !== self.domRef.player) || e.button !== 2) {
                divContextMenu.style.display = 'none';
            }
        }, false);
    };
}
