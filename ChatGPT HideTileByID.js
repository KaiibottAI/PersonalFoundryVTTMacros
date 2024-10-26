// let tileId = "OOH3eMBrUk1SFYRC"; // Replace this with the actual // ID of your tile
let tileId = "e8eoOZMnvElrQdwx";

let tile = canvas.tiles.get(tileId);

if (tile) {
    tile.hidden = !tile.hidden;
    tile.document.update({hidden: tile.hidden});
    ui.notifications.info(`Tile visibility toggled: ${tile.hidden ? 'Hidden' : 'Visible'}`);
} else {
    ui.notifications.error("Tile not found.");
}